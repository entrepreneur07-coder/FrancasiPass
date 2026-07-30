import json
import uuid
from datetime import datetime

def escape_sql(text):
    if text is None:
        return 'NULL'
    return "'" + str(text).replace("'", "''") + "'"

def generate_more_tests():
    tests = []
    questions = []
    
    # TEF Intermediate Tests
    test_configs = [
        # READING
        {
            "title": "TEF Compréhension Écrite - Vie quotidienne au Canada",
            "module": "reading",
            "difficulty": "intermediate",
            "duration": 60,
            "reading_items": [
                {
                    "passage": "### Le bénévolat au Canada : une tradition bien ancrée\n\nAu Canada, le bénévolat est considéré comme un pilier de la société. Chaque année, des millions de Canadiens consacrent de leur temps pour aider des organisations caritatives, des écoles ou des centres communautaires. Pour les nouveaux arrivants, le bénévolat est souvent recommandé non seulement pour contribuer à la communauté, mais aussi pour acquérir une première expérience canadienne, développer son réseau professionnel et améliorer ses compétences linguistiques.",
                    "questions": [
                        {"text": "Quel est l'un des avantages du bénévolat pour les nouveaux arrivants ?", "options": ["Recevoir un salaire élevé", "Acquérir une expérience canadienne", "Obtenir la citoyenneté immédiatement", "Éviter de payer des impôts"], "correct": "Acquérir une expérience canadienne"},
                        {"text": "Selon le texte, le bénévolat est :", "options": ["Une obligation légale", "Une perte de temps", "Un pilier de la société canadienne", "Réservé aux retraités"], "correct": "Un pilier de la société canadienne"}
                    ]
                },
                {
                    "passage": "### Le système de transport en commun à Montréal\n\nMontréal dispose d'un réseau de transport en commun efficace géré par la STM. Il comprend quatre lignes de métro identifiées par des couleurs et des centaines de lignes de bus. Les usagers peuvent utiliser la carte OPUS pour charger leurs titres de transport. Pendant l'hiver, le métro est particulièrement apprécié car il permet de se déplacer à l'abri du froid intense grâce au réseau souterrain qui relie de nombreux édifices du centre-ville.",
                    "questions": [
                        {"text": "Comment s'appelle la carte de transport à Montréal ?", "options": ["La carte STM", "La carte METRO", "La carte OPUS", "La carte VOYAGE"], "correct": "La carte OPUS"},
                        {"text": "Pourquoi le métro est-il avantageux en hiver ?", "options": ["Il est gratuit", "Il est plus rapide qu'en été", "Il permet d'éviter le froid", "Il y a moins de monde"], "correct": "Il permet d'éviter le froid"}
                    ]
                }
            ]
        },
        {
            "title": "TEF Compréhension Écrite - Emploi et Formation",
            "module": "reading",
            "difficulty": "intermediate",
            "duration": 60,
            "reading_items": [
                {
                    "passage": "### La reconnaissance des diplômes étrangers\n\nL'un des défis majeurs pour les immigrants qualifiés au Canada est la reconnaissance de leurs diplômes obtenus à l'étranger. Plusieurs organismes provinciaux sont chargés d'évaluer les études effectuées hors du pays pour établir une équivalence avec le système éducatif canadien. Cette étape est souvent cruciale pour accéder à certaines professions réglementées, comme l'ingénierie, la santé ou l'enseignement, qui exigent d'être membre d'un ordre professionnel.",
                    "questions": [
                        {"text": "Quel est le but de l'évaluation des diplômes étrangers ?", "options": ["Annuler les diplômes", "Établir une équivalence avec le système canadien", "Traduire les documents", "Augmenter les frais d'inscription"], "correct": "Établir une équivalence avec le système canadien"},
                        {"text": "Quelles professions exigent souvent d'être membre d'un ordre professionnel ?", "options": ["Toutes les professions sans exception", "Uniquement les métiers manuels", "Les professions réglementées", "Le bénévolat"], "correct": "Les professions réglementées"}
                    ]
                }
            ]
        },
        # LISTENING (Transcripts included in question text as per recent fixes)
        {
            "title": "TEF Compréhension Orale - Transports et Déplacements",
            "module": "listening",
            "difficulty": "intermediate",
            "duration": 40,
            "listening_items": [
                {
                    "transcript": "Mesdames et messieurs, votre attention s'il vous plaît. Le train VIA Rail numéro 64 en provenance de Toronto et à destination de Montréal aura un retard d'environ 30 minutes en raison de travaux sur la voie. Nous nous excusons pour les inconvénients que cela pourrait causer.",
                    "questions": [
                        {"text": "D'où vient le train ?", "options": ["Montréal", "Ottawa", "Toronto", "Québec"], "correct": "Toronto"},
                        {"text": "Quelle est la durée du retard prévu ?", "options": ["15 minutes", "30 minutes", "1 heure", "Le train est annulé"], "correct": "30 minutes"}
                    ]
                }
            ]
        },
        {
            "title": "TEF Compréhension Orale - Santé et Bien-être",
            "module": "listening",
            "difficulty": "intermediate",
            "duration": 40,
            "listening_items": [
                {
                    "transcript": "Bonjour, vous avez bien joint la clinique de santé du quartier. Nous sommes ouverts du lundi au vendredi de 8h à 20h. Pour prendre un rendez-vous avec votre médecin de famille, appuyez sur le 1. Pour les urgences mineures, veuillez vous présenter à notre clinique sans rendez-vous dès 7h30 le matin.",
                    "questions": [
                        {"text": "À quelle heure ouvre la clinique sans rendez-vous ?", "options": ["8h00", "7h30", "9h00", "20h00"], "correct": "7h30"},
                        {"text": "Sur quelle touche faut-il appuyer pour voir son médecin de famille ?", "options": ["1", "2", "3", "4"], "correct": "1"}
                    ]
                }
            ]
        },
        # WRITING
        {
            "title": "TEF Expression Écrite - Nouveaux Horizons",
            "module": "writing",
            "difficulty": "intermediate",
            "duration": 60,
            "writing_prompts": [
                {"title": "Section A : Fait divers", "text": "Vous avez lu dans un journal local qu'un chat a sauvé son maître d'un incendie. Rédigez un court article pour relater cet événement (80 mots minimum)."},
                {"title": "Section B : Lettre d'argumentation", "text": "Le parc de votre quartier va être transformé en parking. Vous écrivez au journal de la ville pour exprimer votre mécontentement et expliquer pourquoi il est important de préserver les espaces verts (200 mots minimum)."}
            ]
        },
        {
            "title": "TEF Expression Écrite - Engagement Social",
            "module": "writing",
            "difficulty": "intermediate",
            "duration": 60,
            "writing_prompts": [
                {"title": "Section A : Fait divers", "text": "Un groupe de jeunes a organisé un nettoyage géant de la plage locale. Rédigez un court article pour le journal de l'école (80 mots minimum)."},
                {"title": "Section B : Lettre d'argumentation", "text": "Votre entreprise veut supprimer le télétravail. Écrivez une lettre à votre directeur pour argumenter en faveur du maintien du travail à distance, en mettant en avant la productivité et le bien-être des employés (200 mots minimum)."}
            ]
        },
        # SPEAKING
        {
            "title": "TEF Expression Orale - Loisirs et Culture",
            "module": "speaking",
            "difficulty": "intermediate",
            "duration": 15,
            "speaking_prompts": [
                {"title": "Section A : S'informer sur un service", "text": "Vous voulez vous inscrire à un club de photographie. Appelez le responsable pour obtenir des informations sur les activités, le matériel requis et les tarifs."},
                {"title": "Section B : Convaincre un proche", "text": "Un ami refuse d'aller au musée d'art moderne car il trouve cela ennuyeux. Essayez de le convaincre de vous accompagner en lui présentant une exposition particulière."}
            ]
        },
        {
            "title": "TEF Expression Orale - Environnement et Futur",
            "module": "speaking",
            "difficulty": "intermediate",
            "duration": 15,
            "speaking_prompts": [
                {"title": "Section A : S'informer sur un service", "text": "Vous êtes intéressé par l'achat d'un vélo électrique. Appelez un magasin spécialisé pour poser des questions sur l'autonomie, la garantie et les aides financières disponibles."},
                {"title": "Section B : Convaincre un proche", "text": "Votre frère utilise encore beaucoup de sacs en plastique. Essayez de le convaincre d'adopter des habitudes plus écologiques au quotidien."}
            ]
        }
    ]

    sql_statements = []
    created_at = datetime.now().isoformat()

    for config in test_configs:
        test_id = str(uuid.uuid4())
        # Insert test
        stmt = f"INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes, is_premium, created_at, updated_at) VALUES ({escape_sql(test_id)}, {escape_sql(config['title'])}, {escape_sql('Examen de pratique TEF intermédiaire.')}, 'tef', {escape_sql(config['module'])}, 'intermediate', {config['duration']}, True, {escape_sql(created_at)}, {escape_sql(created_at)});"
        sql_statements.append(stmt)
        
        q_idx = 0
        if config['module'] == 'reading':
            for item in config['reading_items']:
                for q_data in item['questions']:
                    q_id = str(uuid.uuid4())
                    q_text = f"{item['passage']}\n\nQuestion : {q_data['text']}"
                    sql_statements.append(f"INSERT INTO public.test_questions (id, test_id, question_text, options, correct_answer, points, order_index, created_at) VALUES ({escape_sql(q_id)}, {escape_sql(test_id)}, {escape_sql(q_text)}, {escape_sql(json.dumps(q_data['options'], ensure_ascii=False))}, {escape_sql(q_data['correct'])}, 1, {q_idx}, {escape_sql(created_at)});")
                    q_idx += 1
        
        elif config['module'] == 'listening':
            for item in config['listening_items']:
                for q_data in item['questions']:
                    q_id = str(uuid.uuid4())
                    q_text = f"### Script\n\n{item['transcript']}\n\nQuestion : {q_data['text']}"
                    # Use a placeholder for audio_url
                    audio_url = f"https://cdn.francaispass.com/audio/tef/intermediate/extra_{q_idx}.mp3"
                    sql_statements.append(f"INSERT INTO public.test_questions (id, test_id, question_text, audio_url, options, correct_answer, points, order_index, created_at) VALUES ({escape_sql(q_id)}, {escape_sql(test_id)}, {escape_sql(q_text)}, {escape_sql(audio_url)}, {escape_sql(json.dumps(q_data['options'], ensure_ascii=False))}, {escape_sql(q_data['correct'])}, 1, {q_idx}, {escape_sql(created_at)});")
                    q_idx += 1
                    
        elif config['module'] == 'writing':
            for i, prompt in enumerate(config['writing_prompts']):
                q_id = str(uuid.uuid4())
                points = 10 if i == 0 else 20
                sql_statements.append(f"INSERT INTO public.test_questions (id, test_id, question_text, points, order_index, created_at) VALUES ({escape_sql(q_id)}, {escape_sql(test_id)}, {escape_sql('### ' + prompt['title'] + '\\n\\n' + prompt['text'])}, {points}, {i}, {escape_sql(created_at)});")

        elif config['module'] == 'speaking':
            for i, prompt in enumerate(config['speaking_prompts']):
                q_id = str(uuid.uuid4())
                points = 10 if i == 0 else 20
                sql_statements.append(f"INSERT INTO public.test_questions (id, test_id, question_text, points, order_index, created_at) VALUES ({escape_sql(q_id)}, {escape_sql(test_id)}, {escape_sql('### ' + prompt['title'] + '\\n\\n' + prompt['text'])}, {points}, {i}, {escape_sql(created_at)});")

    return sql_statements

def main():
    sql_statements = generate_more_tests()
    with open("/home/team/shared/francaispass/seed/extra_intermediate_tests.sql", "w", encoding='utf8') as f:
        f.write("\n".join(sql_statements))
        f.write("\n")
    print(f"Generated {len(sql_statements)} SQL statements for 8 new tests.")

if __name__ == "__main__":
    main()
