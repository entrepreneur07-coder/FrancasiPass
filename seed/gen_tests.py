import json
import uuid
import random
from datetime import datetime

def generate_tests():
    tests = []
    questions = []
    
    exam_types = ['tef', 'tcf']
    
    # B1-C1 level reading passages with comprehension questions
    reading_items = {
        "advanced": [
            {
                "passage": "Le gouvernement canadien a récemment dévoilé son plan d'action national pour la transition écologique, un document de 150 pages qui fixe des objectifs ambitieux pour réduire les émissions de gaz à effet de serre de 45% d'ici 2030 par rapport aux niveaux de 2005. Ce plan, qui s'inscrit dans le cadre de l'Accord de Paris, prévoit des investissements majeurs dans les énergies renouvelables, l'électrification des transports et l'efficacité énergétique des bâtiments. Parmi les mesures phares, on trouve l'installation de bornes de recharge pour véhicules électriques sur l'ensemble du territoire, des subventions pour la rénovation énergétique des logements anciens, et un soutien accru à la recherche et développement dans le secteur des technologies vertes. Le gouvernement estime que ces mesures pourraient créer jusqu'à 200 000 emplois dans les prochaines années. Cependant, ce plan fait face à des critiques. Certains groupes environnementaux estiment que les objectifs ne sont pas assez ambitieux, tandis que des représentants du secteur pétrolier s'inquiètent des conséquences économiques pour les régions dépendantes des hydrocarbures.",
                "questions": [
                    {"text": "Quel est l'objectif principal du plan d'action national pour la transition écologique ?", "options": ["Réduire les émissions de GES de 45% d'ici 2030", "Éliminer complètement les hydrocarbures d'ici 2030", "Créer 500 000 emplois verts", "Atteindre la neutralité carbone en 2025"], "correct": "Réduire les émissions de GES de 45% d'ici 2030"},
                    {"text": "Quelles sont les mesures phares mentionnées dans le plan ?", "options": ["L'installation de bornes de recharge, des subventions pour la rénovation, et le soutien à la R&D", "La construction de nouvelles centrales nucléaires et l'exportation de pétrole", "L'interdiction totale des véhicules thermiques et la taxation du carbone", "La fermeture des industries polluantes et la délocalisation"], "correct": "L'installation de bornes de recharge, des subventions pour la rénovation, et le soutien à la R&D"},
                    {"text": "Combien d'emplois ces mesures pourraient-elles créer selon le gouvernement ?", "options": ["50 000", "100 000", "200 000", "500 000"], "correct": "200 000"},
                    {"text": "Quelles sont les principales critiques adressées à ce plan ?", "options": ["Il est trop ambitieux pour certains et pas assez pour d'autres", "Il est unanimement soutenu par tous les partis", "Il manque totalement de financement", "Il est jugé inconstitutionnel"], "correct": "Il est trop ambitieux pour certains et pas assez pour d'autres"}
                ]
            },
            {
                "passage": "L'immigration joue un rôle fondamental dans le développement économique et démographique du Canada. Selon les données publiées par Statistique Canada, le pays a accueilli plus de 430 000 nouveaux résidents permanents en 2023, un chiffre record qui témoigne de la politique d'immigration ambitieuse du gouvernement fédéral. Les provinces qui ont connu la plus forte croissance démographique sont l'Ontario, la Colombie-Britannique et l'Alberta. Les nouveaux arrivants s'installent majoritairement dans les grands centres urbains comme Toronto, Vancouver et Montréal, attirés par les opportunités d'emploi et les services d'établissement. Le système de gestion des demandes d'immigration, basé sur le système de points Entrée express, a été conçu pour attirer des travailleurs qualifiés capables de contribuer rapidement à l'économie canadienne. Les critères de sélection prennent en compte l'âge, le niveau d'éducation, l'expérience professionnelle, les compétences linguistiques en français et en anglais, ainsi que la capacité d'adaptation. « L'immigration n'est pas seulement une nécessité économique, c'est aussi une source d'enrichissement culturel, » a souligné le ministre.",
                "questions": [
                    {"text": "Combien de nouveaux résidents permanents le Canada a-t-il accueilli en 2023 ?", "options": ["Plus de 200 000", "Plus de 300 000", "Plus de 430 000", "Plus de 500 000"], "correct": "Plus de 430 000"},
                    {"text": "Quelles provinces ont connu la plus forte croissance démographique ?", "options": ["Le Québec et les provinces maritimes", "L'Ontario, la Colombie-Britannique et l'Alberta", "Le Manitoba, la Saskatchewan et les Territoires", "La Nouvelle-Écosse et Terre-Neuve"], "correct": "L'Ontario, la Colombie-Britannique et l'Alberta"},
                    {"text": "Comment le système Entrée express sélectionne-t-il les candidats ?", "options": ["Par tirage au sort", "Sur la base d'un système de points incluant âge, éducation, expérience et langues", "Par ordre d'arrivée des demandes", "Uniquement sur la base des compétences linguistiques"], "correct": "Sur la base d'un système de points incluant âge, éducation, expérience et langues"},
                    {"text": "Quels sont les défis persistants mentionnés ?", "options": ["L'intégration professionnelle, le logement abordable et la reconnaissance des diplômes", "Le climat, les infrastructures et les transports", "La sécurité, l'éducation et la santé", "L'impôt, la retraite et les assurances"], "correct": "L'intégration professionnelle, le logement abordable et la reconnaissance des diplômes"}
                ]
            },
            {
                "passage": "La Banque du Canada a annoncé une hausse de son taux directeur, le portant à 4,75%, une décision qui vise à contrer l'inflation persistante qui oscille autour de 3,5%. Cette augmentation, la quatrième en douze mois, aura des répercussions considérables sur les ménages canadiens, particulièrement ceux détenant un prêt hypothécaire à taux variable. Les économistes s'attendent à ce que le marché immobilier, déjà affecté par une baisse d'activité de 15% par rapport à l'année précédente, subisse un ralentissement supplémentaire. Par ailleurs, les entreprises qui dépendent du crédit pour financer leur expansion pourraient devoir revoir leurs plans d'investissement à la baisse. Cependant, la vigueur du marché du travail, avec un taux de chômage historiquement bas de 5,1%, pourrait atténuer l'impact de cette politique monétaire restrictive.",
                "questions": [
                    {"text": "Quel est le nouveau taux directeur annoncé par la Banque du Canada ?", "options": ["3,5%", "4,75%", "5,1%", "6%"], "correct": "4,75%"},
                    {"text": "Quels ménages seront particulièrement touchés par cette hausse ?", "options": ["Ceux qui ont un prêt hypothécaire à taux variable", "Les familles nombreuses", "Les étudiants", "Les retraités"], "correct": "Ceux qui ont un prêt hypothécaire à taux variable"},
                    {"text": "Quel est le taux de chômage actuel mentionné dans le texte ?", "options": ["3,5%", "4,75%", "5,1%", "6,5%"], "correct": "5,1%"},
                    {"text": "Quel est l'impact sur le marché immobilier ?", "options": ["Une augmentation des prix de 15%", "Un ralentissement supplémentaire", "Une stabilisation des prix", "Une reprise rapide"], "correct": "Un ralentissement supplémentaire"}
                ]
            }
        ]
    }
    
    listening_items = {
        "advanced": [
            {
                "transcript": "Bonjour et bienvenue à notre émission « Économie et Société ». Aujourd'hui, nous recevons le professeur Legrand, expert en politiques migratoires à l'Université de Montréal. Nous allons aborder la question de l'intégration des immigrants sur le marché du travail québécois, un sujet qui suscite de nombreux débats au sein de la classe politique. Professeur, selon vous, quelles sont les principales difficultés rencontrées par les nouveaux arrivants ?",
                "questions": [
                    {"text": "Quel est le sujet de l'émission radio ?", "options": ["L'économie canadienne", "L'intégration des immigrants sur le marché du travail", "Les politiques éducatives au Québec", "Le système de santé montréalais"], "correct": "L'intégration des immigrants sur le marché du travail"},
                    {"text": "Qui est l'invité de l'émission ?", "options": ["Un économiste", "Un professeur expert en politiques migratoires", "Un ministre du gouvernement", "Un chef d'entreprise"], "correct": "Un professeur expert en politiques migratoires"}
                ]
            },
            {
                "transcript": "Nous interrompons notre programme pour une information de dernière minute. La compagnie des wagons-lits et du tourisme (CWT) a annoncé ce matin une grève illimitée à compter de jeudi prochain, minuit. Le mouvement concerne l'ensemble du personnel roulant, soit près de 800 employés. Les négociations salariales, qui duraient depuis trois mois, ont échoué hier soir. La direction s'est dite « déçue » de cette issue et espère une reprise rapide du dialogue social. En attendant, les voyageurs sont invités à consulter le site internet de la société pour connaître les perturbations prévues sur leur ligne.",
                "questions": [
                    {"text": "Quel type de mouvement social est annoncé ?", "options": ["Une manifestation", "Une grève illimitée", "Un débrayage d'une journée", "Un lock-out"], "correct": "Une grève illimitée"},
                    {"text": "Combien d'employés sont concernés par ce mouvement ?", "options": ["300", "500", "800", "1000"], "correct": "800"}
                ]
            },
            {
                "transcript": "Le ministère de l'Éducation nationale a dévoilé aujourd'hui son nouveau programme de réforme du baccalauréat. Parmi les changements majeurs, on note la suppression des filières générales existantes au profit d'un tronc commun renforcé et de spécialités à choisir dès la première. Les épreuves finales ne compteront plus que pour 60% de la note totale, le reste étant attribué au contrôle continu. Cette réforme, qui entrera en vigueur à la rentrée prochaine, suscite des réactions contrastées. Si certains syndicats enseignants saluent une modernisation nécessaire, d'autres dénoncent une réforme précipitée qui risque d'accroître les inégalités territoriales.",
                "questions": [
                    {"text": "Quel est le changement majeur concernant les filières ?", "options": ["La suppression des filières existantes au profit de spécialités", "Le retour aux filières classiques", "L'ajout d'une nouvelle filière technologique", "La fusion de toutes les filières en une seule"], "correct": "La suppression des filières existantes au profit de spécialités"},
                    {"text": "Quel pourcentage de la note finale sera attribué au contrôle continu ?", "options": ["30%", "40%", "50%", "60%"], "correct": "40%"}
                ]
            }
        ]
    }
    
    # Writing and speaking prompts remain the same
    # Generate tests - only advanced level for B1-C1
    for exam_type in exam_types:
        for difficulty in ["advanced"]:
            # READING
            test_id = str(uuid.uuid4())
            tests.append({
                "id": test_id,
                "title": f"{exam_type.upper()} Compréhension Écrite - B1-C1",
                "description": f"Examen de pratique niveau B1-C1 pour {exam_type.upper()} avec documents authentiques.",
                "exam_type": exam_type,
                "module": "reading",
                "difficulty": "advanced",
                "duration_minutes": 60,
                "is_premium": True,
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            })
            
            items = reading_items.get(difficulty, reading_items['advanced'])
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
                        "explanation": f"'{q_data['correct']}' est la réponse correcte d'après le texte fourni.",
                        "points": 1,
                        "order_index": q_idx,
                        "created_at": datetime.now().isoformat()
                    })
                    q_idx += 1

            # LISTENING
            test_id = str(uuid.uuid4())
            tests.append({
                "id": test_id,
                "title": f"{exam_type.upper()} Compréhension Orale - B1-C1",
                "description": f"Pratique intensive de la compréhension orale {exam_type.upper()} niveau B1-C1.",
                "exam_type": exam_type,
                "module": "listening",
                "difficulty": "advanced",
                "duration_minutes": 40,
                "is_premium": True,
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            })
            
            items = listening_items.get(difficulty, listening_items['advanced'])
            q_idx = 0
            for item in items:
                for q_data in item['questions']:
                    q_id = str(uuid.uuid4())
                    questions.append({
                        "id": q_id,
                        "test_id": test_id,
                        "question_text": f"{item['transcript']}\n\nQuestion : {q_data['text']}",
                        "audio_url": None,
                        "image_url": None,
                        "options": json.dumps(q_data['options']),
                        "correct_answer": q_data['correct'],
                        "explanation": f"'{q_data['correct']}' est la réponse correcte d'après l'enregistrement audio.",
                        "points": 1,
                        "order_index": q_idx,
                        "created_at": datetime.now().isoformat()
                    })
                    q_idx += 1

    # Writing tests (B1-C1 level prompts)
    for exam_type in exam_types:
        test_id = str(uuid.uuid4())
        tests.append({
            "id": test_id,
            "title": f"{exam_type.upper()} Expression Écrite - B1-C1",
            "description": f"Sections A et B de l'épreuve d'expression écrite {exam_type.upper()} niveau avancé.",
            "exam_type": exam_type,
            "module": "writing",
            "difficulty": "advanced",
            "duration_minutes": 60,
            "is_premium": True,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        })
        
        writing_prompts = [
            {"title": "Section A : Courrier formel", "text": "En tant que président d'une association de quartier, vous écrivez au maire de votre ville pour lui soumettre une proposition d'aménagement d'un espace vert sur un terrain vacant. Présentez les avantages de votre projet pour la communauté et les étapes de sa réalisation. (200-250 mots)"},
            {"title": "Section B : Article argumentatif", "text": "Rédigez un article pour le journal de votre université dans lequel vous analysez les impacts de l'intelligence artificielle sur le marché du travail. Vous présenterez les opportunités et les risques, et proposerez des pistes pour une transition harmonieuse. (250-300 mots)"}
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
                "explanation": "Utilisez un vocabulaire soutenu, des structures complexes et une argumentation structurée.",
                "points": 10,
                "order_index": i,
                "created_at": datetime.now().isoformat()
            })

        # SPEAKING
        test_id = str(uuid.uuid4())
        tests.append({
            "id": test_id,
            "title": f"{exam_type.upper()} Expression Orale - B1-C1",
            "description": f"Épreuves de conversation avancées pour {exam_type.upper()}.",
            "exam_type": exam_type,
            "module": "speaking",
            "difficulty": "advanced",
            "duration_minutes": 15,
            "is_premium": True,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        })
        
        speaking_prompts = [
            {"title": "Section A : Présentation et discussion", "text": "Vous participez à un entretien pour un poste de chef de projet dans une entreprise francophone. Présentez votre parcours professionnel, vos compétences et expliquez pourquoi vous êtes le candidat idéal. L'examinateur vous posera ensuite des questions sur vos expériences."},
            {"title": "Section B : Débat argumenté", "text": "Votre ville souhaite instaurer une zone à faibles émissions interdisant les véhicules les plus polluants dans le centre-ville. Vous êtes invité à une réunion publique. Présentez votre position (pour ou contre) en argumentant de manière structurée et en répondant aux objections potentielles."}
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
                "explanation": "Structurez votre discours, utilisez des connecteurs logiques et variez le vocabulaire.",
                "points": 10,
                "order_index": i,
                "created_at": datetime.now().isoformat()
            })

    return tests, questions

def generate_sql(table, data):
    if not data:
        return ""
    
    columns = list(data[0].keys())
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
    
    output_path = "/home/team/shared/francaispass/seed/mock_tests.sql"
    with open(output_path, "w") as f:
        f.write(tests_sql)
        f.write("\n\n")
        f.write(questions_sql)
        
    print(f"Generated {len(tests)} tests and {len(questions)} questions at {output_path}")

if __name__ == "__main__":
    main()