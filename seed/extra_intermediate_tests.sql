-- ============================================
-- 8 Intermediate TEF Canada Tests (all 4 modules)
-- Run in Supabase SQL Editor
-- ============================================

-- READING Test 1: Vie quotidienne au Canada
INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes) VALUES ('c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'TEF Compréhension Écrite - Vie quotidienne au Canada', 'Examen de pratique TEF intermédiaire — textes authentiques sur la vie canadienne.', 'tef', 'reading', 'intermediate', 60);

INSERT INTO public.test_questions (id, test_id, question_text, options, correct_answer, points, order_index) VALUES 
('1136ebf9-30ff-478e-9712-e98dbd6334ef', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'Au Canada, le bénévolat est considéré comme un pilier de la société. Chaque année, des millions de Canadiens consacrent de leur temps pour aider des organisations caritatives, des écoles ou des centres communautaires. Pour les nouveaux arrivants, le bénévolat est souvent recommandé non seulement pour contribuer à la communauté, mais aussi pour acquérir une première expérience canadienne, développer son réseau professionnel et améliorer ses compétences linguistiques.

Question : Quel est l''un des avantages du bénévolat pour les nouveaux arrivants ?', '["Recevoir un salaire élevé", "Acquérir une expérience canadienne", "Obtenir la citoyenneté immédiatement", "Éviter de payer des impôts"]', 'Acquérir une expérience canadienne', 1, 0),
('cfe06093-b19b-40a7-b383-a35a805c78fc', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'Au Canada, le bénévolat est considéré comme un pilier de la société. Chaque année, des millions de Canadiens consacrent de leur temps pour aider des organisations caritatives, des écoles ou des centres communautaires. Pour les nouveaux arrivants, le bénévolat est souvent recommandé non seulement pour contribuer à la communauté, mais aussi pour acquérir une première expérience canadienne, développer son réseau professionnel et améliorer ses compétences linguistiques.

Question : Selon le texte, le bénévolat est :', '["Une obligation légale", "Une perte de temps", "Un pilier de la société canadienne", "Réservé aux retraités"]', 'Un pilier de la société canadienne', 1, 1),
('c0e70dba-f5bc-457c-b2ec-18ec9d04eb32', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'Montréal dispose d''un réseau de transport en commun efficace géré par la STM. Il comprend quatre lignes de métro identifiées par des couleurs et des centaines de lignes de bus. Les usagers peuvent utiliser la carte OPUS pour charger leurs titres de transport. Pendant l''hiver, le métro est particulièrement apprécié car il permet de se déplacer à l''abri du froid intense grâce au réseau souterrain qui relie de nombreux édifices du centre-ville.

Question : Comment s''appelle la carte de transport à Montréal ?', '["La carte STM", "La carte METRO", "La carte OPUS", "La carte VOYAGE"]', 'La carte OPUS', 1, 2),
('0fe6811c-a271-4c2d-84de-27b5b7561dd9', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'Montréal dispose d''un réseau de transport en commun efficace géré par la STM. Il comprend quatre lignes de métro identifiées par des couleurs et des centaines de lignes de bus. Les usagers peuvent utiliser la carte OPUS pour charger leurs titres de transport. Pendant l''hiver, le métro est particulièrement apprécié car il permet de se déplacer à l''abri du froid intense grâce au réseau souterrain qui relie de nombreux édifices du centre-ville.

Question : Pourquoi le métro est-il avantageux en hiver ?', '["Il est gratuit", "Il est plus rapide qu''en été", "Il permet d''éviter le froid", "Il y a moins de monde"]', 'Il permet d''éviter le froid', 1, 3),
('a1b2c3d4-1111-4000-8000-100000000001', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'Le système de santé canadien, connu sous le nom d''assurance-maladie, est financé par les impôts et offre un accès gratuit aux services médicaux essentiels. Chaque province gère son propre régime d''assurance-santé. Les nouveaux arrivants doivent généralement attendre jusqu''à trois mois avant d''être admissibles, selon la province. Il est fortement recommandé de souscrire une assurance privée pour couvrir cette période d''attente.

Question : Combien de temps les nouveaux arrivants doivent-ils généralement attendre pour être admissibles à l''assurance-maladie ?', '["Une semaine", "Un mois", "Jusqu''à trois mois", "Un an"]', 'Jusqu''à trois mois', 1, 4),
('a1b2c3d4-2222-4000-8000-200000000002', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'Le système de santé canadien, connu sous le nom d''assurance-maladie, est financé par les impôts et offre un accès gratuit aux services médicaux essentiels. Chaque province gère son propre régime d''assurance-santé. Les nouveaux arrivants doivent généralement attendre jusqu''à trois mois avant d''être admissibles, selon la province. Il est fortement recommandé de souscrire une assurance privée pour couvrir cette période d''attente.

Question : Que recommande-t-on aux nouveaux arrivants pendant la période d''attente ?', '["D''attendre sans rien faire", "De retourner dans leur pays", "De souscrire une assurance privée", "De changer de province"]', 'De souscrire une assurance privée', 1, 5),
('a1b2c3d4-3333-4000-8000-300000000003', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'L''hiver canadien est réputé pour ses températures extrêmes qui peuvent descendre sous les -30°C dans certaines régions. Pour affronter cette saison, les Canadiens adoptent le principe des « trois couches » : une couche de base qui évacue l''humidité, une couche isolante qui retient la chaleur, et une couche extérieure coupe-vent et imperméable. Les tuques, gants et bottes isolées ne sont pas seulement des accessoires de mode — ils sont essentiels pour éviter les engelures.

Question : Selon le texte, les tuques et les gants sont :', '["Des accessoires de mode uniquement", "Essentiels pour éviter les engelures", "Optionnels en hiver", "Recommandés seulement pour les enfants"]', 'Essentiels pour éviter les engelures', 1, 6),
('a1b2c3d4-4444-4000-8000-400000000004', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'L''hiver canadien est réputé pour ses températures extrêmes qui peuvent descendre sous les -30°C dans certaines régions. Pour affronter cette saison, les Canadiens adoptent le principe des « trois couches » : une couche de base qui évacue l''humidité, une couche isolante qui retient la chaleur, et une couche extérieure coupe-vent et imperméable. Les tuques, gants et bottes isolées ne sont pas seulement des accessoires de mode — ils sont essentiels pour éviter les engelures.

Question : Quel est le rôle de la couche extérieure dans le système des trois couches ?', '["Évacuer l''humidité", "Retenir la chaleur", "Protéger du vent et de l''eau", "Être à la mode"]', 'Protéger du vent et de l''eau', 1, 7),
('a1b2c3d4-5555-4000-8000-500000000005', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'Au Canada, le pourboire fait partie intégrante de la culture de service. Dans les restaurants, il est d''usage de laisser entre 15% et 20% du montant avant taxes. Les coiffeurs, chauffeurs de taxi et livreurs s''attendent également à recevoir un pourboire. Cette pratique s''explique en partie par le fait que le salaire minimum des emplois à pourboire est souvent inférieur au salaire minimum régulier.

Question : Quel pourcentage de pourboire est habituel dans les restaurants canadiens ?', '["5% à 10%", "10% à 12%", "15% à 20%", "25% à 30%"]', '15% à 20%', 1, 8),
('a1b2c3d4-6666-4000-8000-600000000006', 'c8ac4595-2def-42f1-8ba8-86f9ed4de91f', 'Au Canada, le pourboire fait partie intégrante de la culture de service. Dans les restaurants, il est d''usage de laisser entre 15% et 20% du montant avant taxes. Les coiffeurs, chauffeurs de taxi et livreurs s''attendent également à recevoir un pourboire. Cette pratique s''explique en partie par le fait que le salaire minimum des emplois à pourboire est souvent inférieur au salaire minimum régulier.

Question : Pourquoi le pourboire est-il important selon le texte ?', '["Parce que c''est obligatoire par la loi", "Parce que le salaire minimum à pourboire est souvent inférieur", "Parce que les Canadiens sont riches", "Parce que les restaurants ne paient pas leurs employés"]', 'Parce que le salaire minimum à pourboire est souvent inférieur', 1, 9);

-- READING Test 2: Emploi et Formation
INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes) VALUES ('b5b66464-d654-4e94-ac67-0e1f342469bc', 'TEF Compréhension Écrite - Emploi et Formation', 'Examen de pratique TEF intermédiaire — textes sur le marché du travail canadien.', 'tef', 'reading', 'intermediate', 60);

INSERT INTO public.test_questions (id, test_id, question_text, options, correct_answer, points, order_index) VALUES 
('36021076-a3b7-4801-a6b9-577e4dee9446', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'L''un des défis majeurs pour les immigrants qualifiés au Canada est la reconnaissance de leurs diplômes obtenus à l''étranger. Plusieurs organismes provinciaux sont chargés d''évaluer les études effectuées hors du pays pour établir une équivalence avec le système éducatif canadien. Cette étape est souvent cruciale pour accéder à certaines professions réglementées, comme l''ingénierie, la santé ou l''enseignement, qui exigent d''être membre d''un ordre professionnel.

Question : Quel est le but de l''évaluation des diplômes étrangers ?', '["Annuler les diplômes", "Établir une équivalence avec le système canadien", "Traduire les documents", "Augmenter les frais d''inscription"]', 'Établir une équivalence avec le système canadien', 1, 0),
('57bbc2ee-e4d1-42bd-8c76-a75220653c51', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'L''un des défis majeurs pour les immigrants qualifiés au Canada est la reconnaissance de leurs diplômes obtenus à l''étranger. Plusieurs organismes provinciaux sont chargés d''évaluer les études effectuées hors du pays pour établir une équivalence avec le système éducatif canadien. Cette étape est souvent cruciale pour accéder à certaines professions réglementées, comme l''ingénierie, la santé ou l''enseignement, qui exigent d''être membre d''un ordre professionnel.

Question : Quelles professions exigent souvent d''être membre d''un ordre professionnel ?', '["Toutes les professions sans exception", "Uniquement les métiers manuels", "Les professions réglementées comme l''ingénierie et la santé", "Le bénévolat"]', 'Les professions réglementées comme l''ingénierie et la santé', 1, 1),
('b2c3d4e5-1111-4000-8000-100000000001', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'Le marché du travail canadien valorise grandement le réseautage professionnel. On estime que près de 65% des emplois ne sont jamais affichés publiquement et sont pourvus par le bouche-à-oreille ou des recommandations. Les événements de réseautage, les salons de l''emploi et les plateformes comme LinkedIn sont devenus des outils indispensables pour les chercheurs d''emploi. Pour les nouveaux arrivants, rejoindre des associations professionnelles et participer à des événements communautaires peut considérablement accélérer leur intégration au marché du travail.

Question : Quel pourcentage d''emplois n''est jamais affiché publiquement selon le texte ?', '["25%", "45%", "65%", "85%"]', '65%', 1, 2),
('b2c3d4e5-2222-4000-8000-200000000002', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'Le marché du travail canadien valorise grandement le réseautage professionnel. On estime que près de 65% des emplois ne sont jamais affichés publiquement et sont pourvus par le bouche-à-oreille ou des recommandations. Les événements de réseautage, les salons de l''emploi et les plateformes comme LinkedIn sont devenus des outils indispensables pour les chercheurs d''emploi. Pour les nouveaux arrivants, rejoindre des associations professionnelles et participer à des événements communautaires peut considérablement accélérer leur intégration au marché du travail.

Question : Que recommande le texte aux nouveaux arrivants ?', '["De rester chez eux", "De rejoindre des associations professionnelles", "D''éviter les événements", "De ne pas utiliser LinkedIn"]', 'De rejoindre des associations professionnelles', 1, 3),
('b2c3d4e5-3333-4000-8000-300000000003', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'Au Canada, le curriculum vitae (CV) diffère sensiblement du modèle européen. Les employeurs canadiens s''attendent à un CV concis de deux pages maximum, mettant l''accent sur les réalisations mesurables plutôt que sur une simple liste de responsabilités. Il est également recommandé de ne pas inclure de photo, d''âge ou de situation familiale, car ces informations pourraient être source de discrimination involontaire. Une lettre de présentation personnalisée est presque toujours exigée pour accompagner la candidature.

Question : Quelle est la longueur recommandée d''un CV canadien ?', '["Une page maximum", "Deux pages maximum", "Trois pages", "Autant de pages que nécessaire"]', 'Deux pages maximum', 1, 4),
('b2c3d4e5-4444-4000-8000-400000000004', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'Au Canada, le curriculum vitae (CV) diffère sensiblement du modèle européen. Les employeurs canadiens s''attendent à un CV concis de deux pages maximum, mettant l''accent sur les réalisations mesurables plutôt que sur une simple liste de responsabilités. Il est également recommandé de ne pas inclure de photo, d''âge ou de situation familiale, car ces informations pourraient être source de discrimination involontaire. Une lettre de présentation personnalisée est presque toujours exigée pour accompagner la candidature.

Question : Pourquoi déconseille-t-on d''inclure une photo dans son CV au Canada ?', '["Parce que c''est illégal", "Pour éviter toute discrimination", "Par manque de place", "Par tradition"]', 'Pour éviter toute discrimination', 1, 5),
('b2c3d4e5-5555-4000-8000-500000000005', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'Les programmes d''alternance travail-études, appelés « coop » au Canada, permettent aux étudiants d''alterner entre des sessions académiques et des stages rémunérés en entreprise. Ces programmes sont très prisés car ils offrent une expérience professionnelle concrète tout en poursuivant ses études. Les étudiants en programme coop ont souvent un avantage significatif sur le marché du travail après l''obtention de leur diplôme, car ils possèdent déjà un réseau professionnel et des références.

Question : Qu''est-ce qu''un programme « coop » ?', '["Un programme d''échange linguistique", "Une alternance travail-études", "Un cours de coopération internationale", "Un stage non rémunéré"]', 'Une alternance travail-études', 1, 6),
('b2c3d4e5-6666-4000-8000-600000000006', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'Les programmes d''alternance travail-études, appelés « coop » au Canada, permettent aux étudiants d''alterner entre des sessions académiques et des stages rémunérés en entreprise. Ces programmes sont très prisés car ils offrent une expérience professionnelle concrète tout en poursuivant ses études. Les étudiants en programme coop ont souvent un avantage significatif sur le marché du travail après l''obtention de leur diplôme, car ils possèdent déjà un réseau professionnel et des références.

Question : Quel avantage les étudiants coop ont-ils après le diplôme ?', '["Ils n''ont pas besoin de travailler", "Ils possèdent déjà un réseau et des références", "Ils sont automatiquement embauchés", "Ils reçoivent un salaire plus élevé garanti"]', 'Ils possèdent déjà un réseau et des références', 1, 7),
('b2c3d4e5-7777-4000-8000-700000000007', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'L''entrevue d''embauche au Canada suit souvent un format standardisé appelé « entrevue comportementale ». Les recruteurs posent des questions basées sur des situations passées, comme « Parlez-moi d''une fois où vous avez résolu un conflit au travail ». La méthode STAR (Situation, Tâche, Action, Résultat) est recommandée pour structurer ses réponses. Il est également attendu que le candidat pose des questions pertinentes sur l''entreprise à la fin de l''entrevue.

Question : Quel format d''entrevue est courant au Canada ?', '["L''entrevue téléphonique", "L''entrevue de groupe", "L''entrevue comportementale", "L''entrevue surprise"]', 'L''entrevue comportementale', 1, 8),
('b2c3d4e5-8888-4000-8000-800000000008', 'b5b66464-d654-4e94-ac67-0e1f342469bc', 'L''entrevue d''embauche au Canada suit souvent un format standardisé appelé « entrevue comportementale ». Les recruteurs posent des questions basées sur des situations passées, comme « Parlez-moi d''une fois où vous avez résolu un conflit au travail ». La méthode STAR (Situation, Tâche, Action, Résultat) est recommandée pour structurer ses réponses. Il est également attendu que le candidat pose des questions pertinentes sur l''entreprise à la fin de l''entrevue.

Question : Que signifie l''acronyme STAR ?', '["Situation, Tâche, Action, Résultat", "Salaire, Travail, Ambition, Retraite", "Sérieux, Talent, Attitude, Respect", "Stage, Test, Apprentissage, Recrutement"]', 'Situation, Tâche, Action, Résultat', 1, 9);

-- LISTENING Test 1: Transports et Déplacements
INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes) VALUES ('a680f24e-7138-45b3-8698-a4007dd050d0', 'TEF Compréhension Orale - Transports et Déplacements', 'Examen de pratique TEF intermédiaire — annonces et conversations authentiques.', 'tef', 'listening', 'intermediate', 40);

INSERT INTO public.test_questions (id, test_id, question_text, options, correct_answer, points, order_index) VALUES 
('dd10e9fa-56fb-4f29-9aa6-ac30bbbe355a', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'Mesdames et messieurs, votre attention s''il vous plaît. Le train VIA Rail numéro 64 en provenance de Toronto et à destination de Montréal aura un retard d''environ 30 minutes en raison de travaux sur la voie. Nous nous excusons pour les inconvénients que cela pourrait causer.

Question : D''où vient le train ?', '["Montréal", "Ottawa", "Toronto", "Québec"]', 'Toronto', 1, 0),
('9c860c8f-1a84-4e47-8a1c-2a0a4ba96e98', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'Mesdames et messieurs, votre attention s''il vous plaît. Le train VIA Rail numéro 64 en provenance de Toronto et à destination de Montréal aura un retard d''environ 30 minutes en raison de travaux sur la voie. Nous nous excusons pour les inconvénients que cela pourrait causer.

Question : Quelle est la durée du retard prévu ?', '["15 minutes", "30 minutes", "1 heure", "Le train est annulé"]', '30 minutes', 1, 1),
('c3d4e5f6-1111-4000-8000-100000000001', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'Bonjour, ici la Société de transport. Nous vous informons que la ligne de bus numéro 55 sera déviée ce week-end entre 8h et 18h en raison de travaux rue Sainte-Catherine. Les arrêts entre les rues Peel et Guy ne seront pas desservis. Veuillez consulter notre site web pour connaître les arrêts temporaires. Merci de votre compréhension.

Question : Quelle ligne de bus est concernée par la déviation ?', '["La ligne 45", "La ligne 55", "La ligne 65", "La ligne 75"]', 'La ligne 55', 1, 2),
('c3d4e5f6-2222-4000-8000-200000000002', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'Bonjour, ici la Société de transport. Nous vous informons que la ligne de bus numéro 55 sera déviée ce week-end entre 8h et 18h en raison de travaux rue Sainte-Catherine. Les arrêts entre les rues Peel et Guy ne seront pas desservis. Veuillez consulter notre site web pour connaître les arrêts temporaires. Merci de votre compréhension.

Question : Pendant combien de temps la ligne sera-t-elle déviée ?', '["Toute la semaine", "Ce week-end", "Un mois", "Une journée seulement"]', 'Ce week-end', 1, 3),
('c3d4e5f6-3333-4000-8000-300000000003', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'Bienvenue à bord du vol Air Canada 845 à destination de Vancouver. L''embarquement commencera dans 15 minutes, porte 23. Nous invitons d''abord les passagers de la zone 1, soit les membres Super Elite et les personnes à mobilité réduite. Ensuite, les zones 2 et 3 seront appelées. Veuillez avoir votre carte d''embarquement et une pièce d''identité prêtes.

Question : Quelle est la destination du vol ?', '["Toronto", "Montréal", "Vancouver", "Calgary"]', 'Vancouver', 1, 4),
('c3d4e5f6-4444-4000-8000-400000000004', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'Bienvenue à bord du vol Air Canada 845 à destination de Vancouver. L''embarquement commencera dans 15 minutes, porte 23. Nous invitons d''abord les passagers de la zone 1, soit les membres Super Elite et les personnes à mobilité réduite. Ensuite, les zones 2 et 3 seront appelées. Veuillez avoir votre carte d''embarquement et une pièce d''identité prêtes.

Question : Qui est invité à embarquer en premier ?', '["Tous les passagers", "Les passagers de la zone 2", "Les membres Super Elite et personnes à mobilité réduite", "Les passagers avec des enfants"]', 'Les membres Super Elite et personnes à mobilité réduite', 1, 5),
('c3d4e5f6-5555-4000-8000-500000000005', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'Allô, c''est Marc. Je suis coincé dans le trafic sur l''autoroute 40, il y a un accident près de la sortie 65. Je vais être en retard d''au moins 20 minutes pour la réunion. Est-ce que tu peux prévenir Caroline ? Je t''envoie un message dès que je suis sorti du bouchon. Merci !

Question : Pourquoi Marc est-il en retard ?', '["Il a oublié la réunion", "Il y a un accident sur l''autoroute", "Son réveil n''a pas sonné", "Il a raté le bus"]', 'Il y a un accident sur l''autoroute', 1, 6),
('c3d4e5f6-6666-4000-8000-600000000006', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'Allô, c''est Marc. Je suis coincé dans le trafic sur l''autoroute 40, il y a un accident près de la sortie 65. Je vais être en retard d''au moins 20 minutes pour la réunion. Est-ce que tu peux prévenir Caroline ? Je t''envoie un message dès que je suis sorti du bouchon. Merci !

Question : Que demande Marc à son interlocuteur ?', '["De venir le chercher", "De prévenir Caroline", "D''annuler la réunion", "De rappeler plus tard"]', 'De prévenir Caroline', 1, 7),
('c3d4e5f6-7777-4000-8000-700000000007', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'La STM rappelle à ses usagers que pendant la période hivernale, les autobus peuvent accumuler des retards de 10 à 20 minutes en raison des conditions météorologiques difficiles. Nous vous recommandons de planifier vos déplacements en conséquence et de consulter l''application STM pour suivre les horaires en temps réel. Pour votre sécurité, restez à l''intérieur de l''abribus jusqu''à l''arrivée du véhicule.

Question : Quel retard les autobus peuvent-ils accumuler en hiver ?', '["5 à 10 minutes", "10 à 20 minutes", "30 à 40 minutes", "Aucun retard"]', '10 à 20 minutes', 1, 8),
('c3d4e5f6-8888-4000-8000-800000000008', 'a680f24e-7138-45b3-8698-a4007dd050d0', 'La STM rappelle à ses usagers que pendant la période hivernale, les autobus peuvent accumuler des retards de 10 à 20 minutes en raison des conditions météorologiques difficiles. Nous vous recommandons de planifier vos déplacements en conséquence et de consulter l''application STM pour suivre les horaires en temps réel. Pour votre sécurité, restez à l''intérieur de l''abribus jusqu''à l''arrivée du véhicule.

Question : Comment peut-on suivre les horaires en temps réel ?', '["En appelant la STM", "En consultant l''application STM", "En demandant au chauffeur", "En regardant les panneaux publicitaires"]', 'En consultant l''application STM', 1, 9);

-- LISTENING Test 2: Santé et Bien-être
INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes) VALUES ('d5dbed0d-3f59-420d-b3ad-c20763522762', 'TEF Compréhension Orale - Santé et Bien-être', 'Examen de pratique TEF intermédiaire — conversations médicales et conseils santé.', 'tef', 'listening', 'intermediate', 40);

INSERT INTO public.test_questions (id, test_id, question_text, options, correct_answer, points, order_index) VALUES 
('2f8f8282-15a6-4a4d-bf81-63df0e0195d1', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Bonjour, vous avez bien joint la clinique de santé du quartier. Nous sommes ouverts du lundi au vendredi de 8h à 20h. Pour prendre un rendez-vous avec votre médecin de famille, appuyez sur le 1. Pour les urgences mineures, veuillez vous présenter à notre clinique sans rendez-vous dès 7h30 le matin.

Question : À quelle heure ouvre la clinique sans rendez-vous ?', '["8h00", "7h30", "9h00", "20h00"]', '7h30', 1, 0),
('0c58d312-cfd2-4618-8039-3c19b4e8baa6', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Bonjour, vous avez bien joint la clinique de santé du quartier. Nous sommes ouverts du lundi au vendredi de 8h à 20h. Pour prendre un rendez-vous avec votre médecin de famille, appuyez sur le 1. Pour les urgences mineures, veuillez vous présenter à notre clinique sans rendez-vous dès 7h30 le matin.

Question : Sur quelle touche faut-il appuyer pour voir son médecin de famille ?', '["1", "2", "3", "4"]', '1', 1, 1),
('d4e5f6a7-1111-4000-8000-100000000001', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Bonjour madame, c''est la pharmacie Brunet. Votre prescription est prête. Vous pouvez passer la récupérer aujourd''hui avant 21h. Veuillez apporter votre carte d''assurance-maladie. Le pharmacien aimerait vous rencontrer brièvement pour vous expliquer la posologie du nouveau médicament.

Question : Où doit-on aller récupérer la prescription ?', '["À la clinique", "À la pharmacie Brunet", "À l''hôpital", "Chez le médecin"]', 'À la pharmacie Brunet', 1, 2),
('d4e5f6a7-2222-4000-8000-200000000002', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Bonjour madame, c''est la pharmacie Brunet. Votre prescription est prête. Vous pouvez passer la récupérer aujourd''hui avant 21h. Veuillez apporter votre carte d''assurance-maladie. Le pharmacien aimerait vous rencontrer brièvement pour vous expliquer la posologie du nouveau médicament.

Question : Pourquoi le pharmacien veut-il rencontrer la patiente ?', '["Pour la facturer", "Pour expliquer la posologie", "Pour prendre sa tension", "Pour lui vendre autre chose"]', 'Pour expliquer la posologie', 1, 3),
('d4e5f6a7-3333-4000-8000-300000000003', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Ici Radio-Canada, le bulletin de santé. Une nouvelle étude menée par l''Université de Montréal révèle que 30 minutes de marche quotidienne réduit de 25% le risque de maladies cardiovasculaires chez les personnes de plus de 50 ans. Les chercheurs recommandent également de combiner cette activité avec une alimentation riche en légumes et en fibres.

Question : Combien de temps de marche est recommandé par jour ?', '["15 minutes", "30 minutes", "45 minutes", "1 heure"]', '30 minutes', 1, 4),
('d4e5f6a7-4444-4000-8000-400000000004', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Ici Radio-Canada, le bulletin de santé. Une nouvelle étude menée par l''Université de Montréal révèle que 30 minutes de marche quotidienne réduit de 25% le risque de maladies cardiovasculaires chez les personnes de plus de 50 ans. Les chercheurs recommandent également de combiner cette activité avec une alimentation riche en légumes et en fibres.

Question : De quel pourcentage le risque de maladies cardiovasculaires est-il réduit ?', '["10%", "15%", "25%", "50%"]', '25%', 1, 5),
('d4e5f6a7-5555-4000-8000-500000000005', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Bonjour, je voudrais prendre rendez-vous avec le docteur Tremblay. — Certainement. Avez-vous une préférence de jour ? — Plutôt en fin de semaine si possible. — Voyons... jeudi prochain à 14h30, ça vous conviendrait ? — Parfait, je prends ! — Très bien, c''est noté. N''oubliez pas d''arriver 10 minutes à l''avance.

Question : Pour quel jour le rendez-vous est-il pris ?', '["Lundi", "Mercredi", "Jeudi", "Vendredi"]', 'Jeudi', 1, 6),
('d4e5f6a7-6666-4000-8000-600000000006', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Bonjour, je voudrais prendre rendez-vous avec le docteur Tremblay. — Certainement. Avez-vous une préférence de jour ? — Plutôt en fin de semaine si possible. — Voyons... jeudi prochain à 14h30, ça vous conviendrait ? — Parfait, je prends ! — Très bien, c''est noté. N''oubliez pas d''arriver 10 minutes à l''avance.

Question : Combien de temps à l''avance faut-il arriver ?', '["5 minutes", "10 minutes", "15 minutes", "30 minutes"]', '10 minutes', 1, 7),
('d4e5f6a7-7777-4000-8000-700000000007', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Attention, alerte météo. Environnement Canada émet un avertissement de chaleur extrême pour la région de Montréal. Les températures pourraient atteindre 35 degrés avec un indice humidex de 42. Il est recommandé de boire beaucoup d''eau, de rester dans des endroits climatisés et de vérifier l''état de vos voisins âgés.

Question : Quel est l''indice humidex prévu ?', '["30", "35", "42", "50"]', '42', 1, 8),
('d4e5f6a7-8888-4000-8000-800000000008', 'd5dbed0d-3f59-420d-b3ad-c20763522762', 'Attention, alerte météo. Environnement Canada émet un avertissement de chaleur extrême pour la région de Montréal. Les températures pourraient atteindre 35 degrés avec un indice humidex de 42. Il est recommandé de boire beaucoup d''eau, de rester dans des endroits climatisés et de vérifier l''état de vos voisins âgés.

Question : Que recommande-t-on de faire pour les voisins âgés ?', '["Les ignorer", "Vérifier leur état", "Les évacuer obligatoirement", "Les appeler seulement le weekend"]', 'Vérifier leur état', 1, 9);

-- WRITING Test 1: Nouveaux Horizons
INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes) VALUES ('589b5554-8c7a-4204-a675-80016e65f1e3', 'TEF Expression Écrite - Nouveaux Horizons', 'Examen de pratique TEF intermédiaire — Sections A et B.', 'tef', 'writing', 'intermediate', 60);

INSERT INTO public.test_questions (id, test_id, question_text, points, order_index) VALUES 
('4a186df1-9b31-41b0-bb2d-040e2fbac533', '589b5554-8c7a-4204-a675-80016e65f1e3', 'Section A : Fait divers (80 mots minimum)

Vous avez lu dans un journal local qu''un chat a sauvé son maître d''un incendie. Rédigez un court article pour relater cet événement.', 10, 0),
('ef996e57-277a-447e-9d8b-d2e95c10027a', '589b5554-8c7a-4204-a675-80016e65f1e3', 'Section B : Lettre d''argumentation (200 mots minimum)

Le parc de votre quartier va être transformé en parking. Vous écrivez au journal de la ville pour exprimer votre mécontentement et expliquer pourquoi il est important de préserver les espaces verts.', 20, 1);

-- WRITING Test 2: Engagement Social
INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes) VALUES ('bb5a47fa-ff5b-4b92-9ce1-266bbf3f2215', 'TEF Expression Écrite - Engagement Social', 'Examen de pratique TEF intermédiaire — Sections A et B.', 'tef', 'writing', 'intermediate', 60);

INSERT INTO public.test_questions (id, test_id, question_text, points, order_index) VALUES 
('5b094b1f-d354-4bea-9f4f-b1a733ecc01f', 'bb5a47fa-ff5b-4b92-9ce1-266bbf3f2215', 'Section A : Fait divers (80 mots minimum)

Un groupe de jeunes a organisé un nettoyage géant de la plage locale. Rédigez un court article pour le journal de l''école.', 10, 0),
('1cc37bfb-c221-4f54-8ad9-ffbaeb6327eb', 'bb5a47fa-ff5b-4b92-9ce1-266bbf3f2215', 'Section B : Lettre d''argumentation (200 mots minimum)

Votre entreprise veut supprimer le télétravail. Écrivez une lettre à votre directeur pour argumenter en faveur du maintien du travail à distance, en mettant en avant la productivité et le bien-être des employés.', 20, 1);

-- SPEAKING Test 1: Loisirs et Culture
INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes) VALUES ('9f3769df-3be7-44b7-b63d-302b86fc4f98', 'TEF Expression Orale - Loisirs et Culture', 'Examen de pratique TEF intermédiaire — Sections A et B.', 'tef', 'speaking', 'intermediate', 15);

INSERT INTO public.test_questions (id, test_id, question_text, points, order_index) VALUES 
('67ad396d-0d98-4bb4-9fc3-f01303865dd3', '9f3769df-3be7-44b7-b63d-302b86fc4f98', 'Section A : S''informer sur un service

Vous voulez vous inscrire à un club de photographie. Appelez le responsable pour obtenir des informations sur les activités, le matériel requis et les tarifs.', 10, 0),
('ad4edada-27aa-4175-91fa-83c5a9d88d88', '9f3769df-3be7-44b7-b63d-302b86fc4f98', 'Section B : Convaincre un proche

Un ami refuse d''aller au musée d''art moderne car il trouve cela ennuyeux. Essayez de le convaincre de vous accompagner en lui présentant une exposition particulière.', 20, 1);

-- SPEAKING Test 2: Environnement et Futur
INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes) VALUES ('fe9f874d-ab9f-4678-a666-9899c9d200a9', 'TEF Expression Orale - Environnement et Futur', 'Examen de pratique TEF intermédiaire — Sections A et B.', 'tef', 'speaking', 'intermediate', 15);

INSERT INTO public.test_questions (id, test_id, question_text, points, order_index) VALUES 
('390a1a8b-f662-43b6-a3e7-36682764e478', 'fe9f874d-ab9f-4678-a666-9899c9d200a9', 'Section A : S''informer sur un service

Vous êtes intéressé par l''achat d''un vélo électrique. Appelez un magasin spécialisé pour poser des questions sur l''autonomie, la garantie et les aides financières disponibles.', 10, 0),
('39e633cf-1c9f-4f35-931c-365b003a0e49', 'fe9f874d-ab9f-4678-a666-9899c9d200a9', 'Section B : Convaincre un proche

Votre frère utilise encore beaucoup de sacs en plastique. Essayez de le convaincre d''adopter des habitudes plus écologiques au quotidien.', 20, 1);
