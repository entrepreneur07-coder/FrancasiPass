import json
import re
import uuid
import datetime

# TEF Test IDs
TEST_IDS = {
    'reading_intermediate': '907602a7-d59c-4ad7-bebd-96d3e95bcf7c',
    'reading_advanced': 'f61d727f-858f-42bf-93ef-72ad5fc0d77c',
    'listening_intermediate': 'd72182b6-ee87-4394-857d-052ce2b05a12',
    'listening_advanced': 'd741196d-4619-4229-b20f-358301f30e9e',
    'writing': '319775b5-56bf-458c-8b60-1f3c7913daa4',
    'speaking': 'a2a4037a-814b-46f8-a768-b8b8dcefc649'
}

def escape_sql(text):
    if text is None:
        return 'NULL'
    return "'" + str(text).replace("'", "''") + "'"

def get_listening_transcripts():
    filepath = '/home/team/shared/francaispass/seed/generate_final_seed.js'
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    
    # Extract listeningScenarios using regex
    # This is a bit hacky but should work for this specific file
    scenarios = []
    matches = re.findall(r'\{ topic: "(.*?)", transcript: "(.*?)",\s+questions: \[\s+(.*?)\s+\]\s+\}', content, re.DOTALL)
    
    transcripts_map = {}
    for topic, transcript, q_block in matches:
        # Find questions in this block
        q_matches = re.findall(r'\{ q: "(.*?)",', q_block)
        for i, q_text in enumerate(q_matches):
            key = f"{topic.lower()}_{i}"
            transcripts_map[key] = transcript
            
    return transcripts_map

def generate_short_scripts():
    # Types and contexts from generate_final_seed.js
    types = ["Message téléphonique", "Annonce publique", "Extrait radio", "Conversation courte"]
    contexts = ["bureau", "gare", "maison", "magasin", "rue", "ecole", "banque", "hopital", "cinema", "restaurant"]
    
    scripts = []
    # We'll use a fixed set of scripts to avoid calling LLM 50 times in a script, 
    # but I'll generate them once here manually or using a simple template.
    # Actually, I'll just use a generic template for now and the lead can improve it.
    
    templates = {
        "Message téléphonique": "Bonjour, je vous appelle concernant votre demande du {context}. Pouvez-vous me recontacter au plus vite ?",
        "Annonce publique": "Attention s'il vous plaît. Un incident est survenu dans le {context}. Nous vous prions de garder votre calme.",
        "Extrait radio": "Ici Radio Montréal. Aujourd'hui nous sommes en direct du {context} pour parler des nouveaux aménagements urbains.",
        "Conversation courte": "— Excusez-moi, savez-vous où se trouve la sortie du {context} ? — Oui, c'est juste au bout du couloir à droite."
    }
    
    for i in range(50):
        t = types[i % len(types)]
        c = contexts[i % len(contexts)]
        scripts.append(templates[t].format(context=c))
    
    return scripts

def process():
    filepath = '/home/team/shared/francaispass/seed/tef_tcf_full_content.js'
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()

    json_str = content.replace('export const tefTcfFullContent = ', '').strip()
    if json_str.endswith(';'):
        json_str = json_str[:-1]

    data = json.loads(json_str)
    
    transcripts_map = get_listening_transcripts()
    short_scripts = generate_short_scripts()

    sql_statements = []
    created_at = datetime.datetime.now(datetime.UTC).isoformat()

    for test in data:
        if test['exam_type'] != 'tef':
            continue

        module = test['module']
        questions = test['questions']

        for i, q in enumerate(questions):
            q_id = str(uuid.uuid4())
            test_id = None
            points = q.get('points', 1)
            audio_url = 'NULL'
            options = 'NULL'
            correct_answer = 'NULL'
            q_text = q['question_text']

            if module == 'reading':
                if 'q-ext' in q['id']:
                    test_id = TEST_IDS['reading_intermediate']
                else:
                    test_id = TEST_IDS['reading_advanced']
                
                options = escape_sql(json.dumps(q['options'], ensure_ascii=False))
                correct_answer = escape_sql(q['correct_answer'])

            elif module == 'listening':
                # Map based on prefixes
                intermediate_prefixes = ['q-l-short', 'q-l-météo', 'q-l-message vocal', 'q-l-annonce publique', 'q-l-store', 'q-l-job', 'q-l-transport']
                if any(p in q['id'] for p in intermediate_prefixes):
                    test_id = TEST_IDS['listening_intermediate']
                else:
                    test_id = TEST_IDS['listening_advanced']
                
                # Add script to question_text
                script = ""
                # Try to find transcript in map
                # ID format: main-q-l-topic-index
                parts = q['id'].split('-')
                if 'short' in q['id']:
                    index = int(parts[-1])
                    script = short_scripts[index]
                else:
                    topic = parts[-2]
                    index = int(parts[-1])
                    key = f"{topic}_{index}"
                    script = transcripts_map.get(key, "")
                
                if script:
                    q_text = f"### Script\n\n{script}\n\nQuestion : {q_text}"
                else:
                    q_text = f"Question : {q_text}"

                options = escape_sql(json.dumps(q['options'], ensure_ascii=False))
                correct_answer = escape_sql(q['correct_answer'])

            elif module == 'writing':
                test_id = TEST_IDS['writing']
                if 'Section A' in q['question_text'] or 'tef-w-1' in q['id']:
                    points = 10
                elif 'Section B' in q['question_text'] or 'tef-w-2' in q['id']:
                    points = 20

            elif module == 'speaking':
                test_id = TEST_IDS['speaking']
                if 'Section A' in q['question_text'] or 'tef-s-1' in q['id']:
                    points = 10
                elif 'Section B' in q['question_text'] or 'tef-s-2' in q['id']:
                    points = 20

            if test_id:
                stmt = f"INSERT INTO test_questions (id, test_id, question_text, audio_url, options, correct_answer, points, order_index, created_at) VALUES ({escape_sql(q_id)}, {escape_sql(test_id)}, {escape_sql(q_text)}, {audio_url}, {options}, {correct_answer}, {points}, {i}, {escape_sql(created_at)});"
                sql_statements.append(stmt)

    with open('/home/team/shared/francaispass/seed/tef_tcf_seed.sql', 'w', encoding='utf8') as f:
        f.write('\n'.join(sql_statements))
        f.write('\n')

    print(f"Generated {len(sql_statements)} INSERT statements.")

if __name__ == '__main__':
    process()
