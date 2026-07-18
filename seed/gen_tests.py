import json
import uuid
import random
from datetime import datetime

def generate_tests():
    tests = []
    questions = []
    
    exam_types = ['tef', 'tcf']
    difficulties = ['beginner', 'intermediate', 'advanced']
    
    # Realistic content samples
    reading_items = {
        "beginner": [
            {
                "passage": "A VENDRE : Vélo de ville en excellent état. Prix : 150 euros. Contactez Marc au 06.12.34.56.78 après 18h.",
                "questions": [
                    {"text": "Que vend Marc ?", "options": ["Un vélo", "Une voiture", "Une maison", "Un téléphone"], "correct": "Un vélo"},
                    {"text": "A quel moment peut-on appeler Marc ?", "options": ["Le matin", "L'après-midi", "Le soir", "Toute la journée"], "correct": "Le soir"}
                ]
            },
            {
                "passage": "OUVERTURE EXCEPTIONNELLE : Votre boulangerie sera ouverte ce dimanche 14 juillet de 7h à 13h. Bonne fête nationale !",
                "questions": [
                    {"text": "Que se passe-t-il le 14 juillet ?", "options": ["La boulangerie est fermée", "La boulangerie ouvre plus tard", "La boulangerie ouvre exceptionnellement", "Il y a une fête à la boulangerie"], "correct": "La boulangerie ouvre exceptionnellement"},
                    {"text": "A quelle heure ferme la boulangerie ce jour-là ?", "options": ["7h", "13h", "14h", "18h"], "correct": "13h"}
                ]
            }
        ],
        "intermediate": [
            {
                "passage": "La ville de Gatineau a annoncé le lancement d'un nouveau programme de recyclage des matières organiques. Dès le mois prochain, chaque foyer recevra un bac brun. Cette initiative vise à réduire de 40% les déchets envoyés au dépotoir.",
                "questions": [
                    {"text": "Quel est l'objectif principal de ce nouveau programme ?", "options": ["Distribuer des bacs gratuits", "Réduire les déchets ménagers", "Augmenter les taxes municipales", "Nettoyer les rues de Gatineau"], "correct": "Réduire les déchets ménagers"},
                    {"text": "Quand le programme commencera-t-il ?", "options": ["Immédiatement", "L'année prochaine", "Le mois prochain", "Dans six mois"], "correct": "Le mois prochain"}
                ]
            },
            {
                "passage": "Offre d'emploi : Entreprise technologique à Montréal recherche un développeur web junior. Compétences requises : maîtrise de React, Node.js et français courant. Télétravail hybride possible.",
                "questions": [
                    {"text": "Quel profil de candidat est recherché ?", "options": ["Un expert en marketing", "Un développeur débutant", "Un directeur technique", "Un traducteur"], "correct": "Un développeur débutant"},
                    {"text": "Quelle est la condition concernant le lieu de travail ?", "options": ["100% au bureau", "100% à distance", "Mélange de bureau et distance", "Travail à l'étranger"], "correct": "Mélange de bureau et distance"}
                ]
            }
        ],
        "advanced": [
            {
                "passage": "Malgré une croissance économique robuste, le pays est confronté à une inflation galopante qui érode le pouvoir d'achat des ménages. La Banque Centrale envisage une hausse des taux d'intérêt pour stabiliser les prix, au risque de ralentir la consommation intérieure. Les économistes sont partagés sur l'efficacité à long terme de cette politique monétaire austère.",
                "questions": [
                    {"text": "Quelle est la conséquence principale de l'inflation mentionnée ?", "options": ["Une croissance économique nulle", "La diminution du pouvoir d'achat", "La baisse des taux d'intérêt", "L'augmentation des salaires"], "correct": "La diminution du pouvoir d'achat"},
                    {"text": "Quelle mesure est envisagée par la Banque Centrale ?", "options": ["Injecter des liquidités", "Baisser les impôts", "Augmenter les taux d'intérêt", "Favoriser la consommation"], "correct": "Augmenter les taux d'intérêt"}
                ]
            }
        ]
    }

    listening_items = {
        "beginner": [
            {
                "transcript": "Attention, le train à destination de Paris-Nord partira quai numéro 3. Assurez-vous d'avoir composté votre billet.",
                "questions": [
                    {"text": "Où va ce train ?", "options": ["Lyon", "Paris", "Marseille", "Lille"], "correct": "Paris"},
                    {"text": "Sur quel quai se trouve le train ?", "options": ["Quai 1", "Quai 2", "Quai 3", "Quai 4"], "correct": "Quai 3"}
                ]
            }
        ],
        "intermediate": [
            {
                "transcript": "Bonjour à tous. Aujourd'hui, nous recevons Mme Dupont, experte en environnement, pour discuter de l'impact du changement climatique sur nos forêts boréales. Mme Dupont, bienvenue.",
                "questions": [
                    {"text": "Quel est le métier de l'invitée ?", "options": ["Journaliste", "Bûcheronne", "Experte en environnement", "Professeure de géographie"], "correct": "Experte en environnement"},
                    {"text": "De quoi vont-ils parler ?", "options": ["De la météo de demain", "Du changement climatique", "De la vie des animaux", "Du prix du bois"], "correct": "Du changement climatique"}
                ]
            }
        ],
        "advanced": [
            {
                "transcript": "L'évolution des mœurs numériques a engendré une mutation profonde de notre rapport à l'information. La viralité prime désormais souvent sur la véracité, posant un défi sans précédent à l'intégrité journalistique et à la cohésion sociale.",
                "questions": [
                    {"text": "Quel est le problème soulevé par l'orateur ?", "options": ["Le manque d'accès à internet", "La vitesse de l'information vs sa qualité", "Le coût des abonnements presse", "La disparition des réseaux sociaux"], "correct": "La vitesse de l'information vs sa qualité"}
                ]
            }
        ]
    }

    # Generate tests
    for exam_type in exam_types:
        for difficulty in difficulties:
            # READING
            test_id = str(uuid.uuid4())
            tests.append({
                "id": test_id,
                "title": f"{exam_type.upper()} Compréhension Écrite - {difficulty.capitalize()}",
                "description": f"Examen de pratique complet pour {exam_type.upper()} niveau {difficulty}.",
                "exam_type": exam_type,
                "module": "reading",
                "difficulty": difficulty,
                "duration_minutes": 30 if difficulty == 'beginner' else 60,
                "is_premium": difficulty != 'beginner',
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            })
            
            items = reading_items.get(difficulty, reading_items['intermediate'])
            q_idx = 0
            for item in items:
                for q_data in item['questions']:
                    q_id = str(uuid.uuid4())
                    questions.append({
                        "id": q_id,
                        "test_id": test_id,
                        "question_text": f"{item['passage']}\n\nQuestion : {q_data['text']}",
                        "audio_url": None,
                        "image_url": None,
                        "options": json.dumps(q_data['options']),
                        "correct_answer": q_data['correct'],
                        "explanation": f"La réponse correcte est '{q_data['correct']}' d'après le texte fourni.",
                        "points": 1,
                        "order_index": q_idx,
                        "created_at": datetime.now().isoformat()
                    })
                    q_idx += 1

            # LISTENING
            test_id = str(uuid.uuid4())
            tests.append({
                "id": test_id,
                "title": f"{exam_type.upper()} Compréhension Orale - {difficulty.capitalize()}",
                "description": f"Pratique intensive de la compréhension orale {exam_type.upper()}.",
                "exam_type": exam_type,
                "module": "listening",
                "difficulty": difficulty,
                "duration_minutes": 25 if difficulty == 'beginner' else 40,
                "is_premium": difficulty != 'beginner',
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            })
            
            items = listening_items.get(difficulty, listening_items['intermediate'])
            q_idx = 0
            for item in items:
                for q_data in item['questions']:
                    q_id = str(uuid.uuid4())
                    questions.append({
                        "id": q_id,
                        "test_id": test_id,
                        "question_text": q_data['text'],
                        "audio_url": f"https://cdn.francaispass.com/audio/{exam_type}/{difficulty}/q{q_idx+1}.mp3",
                        "image_url": None,
                        "options": json.dumps(q_data['options']),
                        "correct_answer": q_data['correct'],
                        "explanation": f"L'audio mentionne explicitement '{q_data['correct']}'.",
                        "points": 1,
                        "order_index": q_idx,
                        "created_at": datetime.now().isoformat()
                    })
                    q_idx += 1

    # Add Writing and Speaking prompts (Section A & B)
    for exam_type in exam_types:
        # WRITING
        test_id = str(uuid.uuid4())
        tests.append({
            "id": test_id,
            "title": f"{exam_type.upper()} Expression Écrite - Officiel",
            "description": f"Sections A et B de l'épreuve d'expression écrite {exam_type.upper()}.",
            "exam_type": exam_type,
            "module": "writing",
            "difficulty": "intermediate",
            "duration_minutes": 60,
            "is_premium": True,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        })
        
        writing_prompts = [
            {"title": "Section A : Fait divers", "text": "Vous avez été témoin d'un accident de la circulation. Écrivez un article pour le journal local relatant les faits (80 mots minimum)."},
            {"title": "Section B : Lettre d'argumentation", "text": "Votre municipalité a décidé de fermer la bibliothèque municipale pour construire un centre commercial. Écrivez une lettre au maire pour exprimer votre désaccord et argumenter en faveur de la culture (200 mots minimum)."}
        ]
        
        for i, prompt in enumerate(writing_prompts):
            q_id = str(uuid.uuid4())
            questions.append({
                "id": q_id,
                "test_id": test_id,
                "question_text": f"### {prompt['title']}\n\n{prompt['text']}",
                "audio_url": None,
                "image_url": None,
                "options": None,
                "correct_answer": None,
                "explanation": "Respectez le nombre de mots et la structure demandée.",
                "points": 10,
                "order_index": i,
                "created_at": datetime.now().isoformat()
            })

        # SPEAKING
        test_id = str(uuid.uuid4())
        tests.append({
            "id": test_id,
            "title": f"{exam_type.upper()} Expression Orale - Simulation",
            "description": f"Épreuves de conversation réelles pour {exam_type.upper()}.",
            "exam_type": exam_type,
            "module": "speaking",
            "difficulty": "intermediate",
            "duration_minutes": 15,
            "is_premium": True,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        })
        
        speaking_prompts = [
            {"title": "Section A : Demande de renseignements", "text": "Vous avez vu une annonce pour un cours de cuisine. Appelez l'organisateur pour obtenir des informations sur les prix, les horaires et le contenu du cours."},
            {"title": "Section B : Convaincre un ami", "text": "Un de vos amis hésite à partir vivre au Canada. Essayez de le convaincre en lui présentant les avantages du pays."}
        ]
        
        for i, prompt in enumerate(speaking_prompts):
            q_id = str(uuid.uuid4())
            questions.append({
                "id": q_id,
                "test_id": test_id,
                "question_text": f"### {prompt['title']}\n\n{prompt['text']}",
                "audio_url": None,
                "image_url": None,
                "options": None,
                "correct_answer": None,
                "explanation": "Soyez fluide, utilisez des connecteurs logiques et un vocabulaire varié.",
                "points": 10,
                "order_index": i,
                "created_at": datetime.now().isoformat()
            })

    return tests, questions

def generate_sql(table, data):
    if not data:
        return ""
    
    columns = data[0].keys()
    sql = f"INSERT INTO {table} ({', '.join(columns)})\nVALUES\n"
    
    values = []
    for row in data:
        row_values = []
        for col in columns:
            val = row[col]
            if val is None:
                row_values.append("NULL")
            elif isinstance(val, str):
                safe_val = val.replace("'", "''")
                row_values.append(f"'{safe_val}'")
            else:
                row_values.append(str(val))
        values.append(f"({', '.join(row_values)})")
    
    sql += ",\n".join(values) + ";"
    return sql

def main():
    tests, questions = generate_tests()
    
    tests_sql = generate_sql("public.mock_tests", tests)
    questions_sql = generate_sql("public.test_questions", questions)
    
    with open("/home/team/shared/francaispass/seed/mock_tests.sql", "w") as f:
        f.write(tests_sql)
        f.write("\n\n")
        f.write(questions_sql)
        
    print(f"Generated {len(tests)} tests and {len(questions)} questions.")

if __name__ == "__main__":
    main()
