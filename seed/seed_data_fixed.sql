-- Corrected seed data for FrancaisPass
-- Run this file in the Supabase SQL Editor

INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes, created_at)
VALUES
('10f74cf0-38f2-4adf-a530-3454953dc4f7', 'TEF Compréhension Écrite - Beginner', 'Examen de pratique complet pour TEF niveau beginner.', 'tef', 'reading', 'beginner', 30),
('15a99582-ff8d-4295-917a-13ebde0a4051', 'TEF Compréhension Orale - Beginner', 'Pratique intensive de la compréhension orale TEF.', 'tef', 'listening', 'beginner', 25),
('907602a7-d59c-4ad7-bebd-96d3e95bcf7c', 'TEF Compréhension Écrite - Intermediate', 'Examen de pratique complet pour TEF niveau intermediate.', 'tef', 'reading', 'intermediate', 60),
('d72182b6-ee87-4394-857d-052ce2b05a12', 'TEF Compréhension Orale - Intermediate', 'Pratique intensive de la compréhension orale TEF.', 'tef', 'listening', 'intermediate', 40),
('f61d727f-858f-42bf-93ef-72ad5fc0d77c', 'TEF Compréhension Écrite - Advanced', 'Examen de pratique complet pour TEF niveau advanced.', 'tef', 'reading', 'advanced', 60),
('d741196d-4619-4229-b20f-358301f30e9e', 'TEF Compréhension Orale - Advanced', 'Pratique intensive de la compréhension orale TEF.', 'tef', 'listening', 'advanced', 40),
('ef59cdd4-aaeb-4942-b68d-ccf845a0618c', 'TCF Compréhension Écrite - Beginner', 'Examen de pratique complet pour TCF niveau beginner.', 'tcf', 'reading', 'beginner', 30),
('66349bb6-a506-4940-8b40-4c5761de99b7', 'TCF Compréhension Orale - Beginner', 'Pratique intensive de la compréhension orale TCF.', 'tcf', 'listening', 'beginner', 25),
('cfe86f4d-2f7c-425c-a136-9cf3750d55ea', 'TCF Compréhension Écrite - Intermediate', 'Examen de pratique complet pour TCF niveau intermediate.', 'tcf', 'reading', 'intermediate', 60),
('c87ae3ad-81b0-41e7-9a34-9e3836897c70', 'TCF Compréhension Orale - Intermediate', 'Pratique intensive de la compréhension orale TCF.', 'tcf', 'listening', 'intermediate', 40),
('d9014ff3-7f18-4c5b-a86e-6962e2d68f7e', 'TCF Compréhension Écrite - Advanced', 'Examen de pratique complet pour TCF niveau advanced.', 'tcf', 'reading', 'advanced', 60),
('80729f56-623c-45a9-8e77-e90d56b44069', 'TCF Compréhension Orale - Advanced', 'Pratique intensive de la compréhension orale TCF.', 'tcf', 'listening', 'advanced', 40),
('319775b5-56bf-458c-8b60-1f3c7913daa4', 'TEF Expression Écrite - Officiel', 'Sections A et B de l''épreuve d''expression écrite TEF.', 'tef', 'writing', 'intermediate', 60),
('a2a4037a-814b-46f8-a768-b8b8dcefc649', 'TEF Expression Orale - Simulation', 'Épreuves de conversation réelles pour TEF.', 'tef', 'speaking', 'intermediate', 15),
('3370fdff-bff9-4a6e-b434-65646a01a437', 'TCF Expression Écrite - Officiel', 'Sections A et B de l''épreuve d''expression écrite TCF.', 'tcf', 'writing', 'intermediate', 60),
('654a6a85-64cd-490b-b285-f95e5db6368b', 'TCF Expression Orale - Simulation', 'Épreuves de conversation réelles pour TCF.', 'tcf', 'speaking', 'intermediate', 15);

INSERT INTO public.test_questions (id, test_id, question_text, audio_url, options, correct_answer, points, order_index, created_at)
VALUES
('9db8eb08-523d-4545-9f9b-09c101545120', '10f74cf0-38f2-4adf-a530-3454953dc4f7', 'A VENDRE : Vélo de ville en excellent état. Prix : 150 euros. Contactez Marc au 06.12.34.56.78 après 18h.

Question : Que vend Marc ?', NULL, NULL, '["Un v\u00e9lo", "Une voiture", "Une maison", "Un t\u00e9l\u00e9phone"]', 'Un vélo', 'La réponse correcte est ''Un vélo'' d''après le texte fourni.', 1, 0, '2026-06-22T22:39:34.245863'),
('f77f7346-1677-4ee0-95d6-5b00c91cb926', '10f74cf0-38f2-4adf-a530-3454953dc4f7', 'A VENDRE : Vélo de ville en excellent état. Prix : 150 euros. Contactez Marc au 06.12.34.56.78 après 18h.

Question : A quel moment peut-on appeler Marc ?', NULL, NULL, '["Le matin", "L''apr\u00e8s-midi", "Le soir", "Toute la journ\u00e9e"]', 'Le soir', 'La réponse correcte est ''Le soir'' d''après le texte fourni.', 1, 1, '2026-06-22T22:39:34.245881'),
('52292c99-2fda-4349-b8e1-f67d0b281f57', '10f74cf0-38f2-4adf-a530-3454953dc4f7', 'OUVERTURE EXCEPTIONNELLE : Votre boulangerie sera ouverte ce dimanche 14 juillet de 7h à 13h. Bonne fête nationale !

Question : Que se passe-t-il le 14 juillet ?', NULL, NULL, '["La boulangerie est ferm\u00e9e", "La boulangerie ouvre plus tard", "La boulangerie ouvre exceptionnellement", "Il y a une f\u00eate \u00e0 la boulangerie"]', 'La boulangerie ouvre exceptionnellement', 'La réponse correcte est ''La boulangerie ouvre exceptionnellement'' d''après le texte fourni.', 1, 2, '2026-06-22T22:39:34.245894'),
('ff0d4584-5202-4555-b4f3-7f8bf50e3e11', '10f74cf0-38f2-4adf-a530-3454953dc4f7', 'OUVERTURE EXCEPTIONNELLE : Votre boulangerie sera ouverte ce dimanche 14 juillet de 7h à 13h. Bonne fête nationale !

Question : A quelle heure ferme la boulangerie ce jour-là ?', NULL, NULL, '["7h", "13h", "14h", "18h"]', '13h', 'La réponse correcte est ''13h'' d''après le texte fourni.', 1, 3, '2026-06-22T22:39:34.245903'),
('55aa664f-71bd-4b76-9eca-4413806febce', '15a99582-ff8d-4295-917a-13ebde0a4051', 'Où va ce train ?', 'https://cdn.francaispass.com/audio/tef/beginner/q1.mp3', NULL, '["Lyon", "Paris", "Marseille", "Lille"]', 'Paris', 'L''audio mentionne explicitement ''Paris''.', 1, 0, '2026-06-22T22:39:34.245919'),
('fa7a8679-c597-4af7-9aa5-ab8839065279', '15a99582-ff8d-4295-917a-13ebde0a4051', 'Sur quel quai se trouve le train ?', 'https://cdn.francaispass.com/audio/tef/beginner/q2.mp3', NULL, '["Quai 1", "Quai 2", "Quai 3", "Quai 4"]', 'Quai 3', 'L''audio mentionne explicitement ''Quai 3''.', 1, 1, '2026-06-22T22:39:34.245928'),
('c1e1e7f7-fc56-4b86-a3c5-d4408c9e63e7', '907602a7-d59c-4ad7-bebd-96d3e95bcf7c', 'La ville de Gatineau a annoncé le lancement d''un nouveau programme de recyclage des matières organiques. Dès le mois prochain, chaque foyer recevra un bac brun. Cette initiative vise à réduire de 40% les déchets envoyés au dépotoir.

Question : Quel est l''objectif principal de ce nouveau programme ?', NULL, NULL, '["Distribuer des bacs gratuits", "R\u00e9duire les d\u00e9chets m\u00e9nagers", "Augmenter les taxes municipales", "Nettoyer les rues de Gatineau"]', 'Réduire les déchets ménagers', 'La réponse correcte est ''Réduire les déchets ménagers'' d''après le texte fourni.', 1, 0, '2026-06-22T22:39:34.245944'),
('15f62ee9-cd57-410c-8c08-be35fea2e468', '907602a7-d59c-4ad7-bebd-96d3e95bcf7c', 'La ville de Gatineau a annoncé le lancement d''un nouveau programme de recyclage des matières organiques. Dès le mois prochain, chaque foyer recevra un bac brun. Cette initiative vise à réduire de 40% les déchets envoyés au dépotoir.

Question : Quand le programme commencera-t-il ?', NULL, NULL, '["Imm\u00e9diatement", "L''ann\u00e9e prochaine", "Le mois prochain", "Dans six mois"]', 'Le mois prochain', 'La réponse correcte est ''Le mois prochain'' d''après le texte fourni.', 1, 1, '2026-06-22T22:39:34.245951'),
('2c1bd083-1077-4202-9504-8fc1acfc28ff', '907602a7-d59c-4ad7-bebd-96d3e95bcf7c', 'Offre d''emploi : Entreprise technologique à Montréal recherche un développeur web junior. Compétences requises : maîtrise de React, Node.js et français courant. Télétravail hybride possible.

Question : Quel profil de candidat est recherché ?', NULL, NULL, '["Un expert en marketing", "Un d\u00e9veloppeur d\u00e9butant", "Un directeur technique", "Un traducteur"]', 'Un développeur débutant', 'La réponse correcte est ''Un développeur débutant'' d''après le texte fourni.', 1, 2, '2026-06-22T22:39:34.245958'),
('4f550f2a-e6eb-4e20-bcfe-cc008e3288bc', '907602a7-d59c-4ad7-bebd-96d3e95bcf7c', 'Offre d''emploi : Entreprise technologique à Montréal recherche un développeur web junior. Compétences requises : maîtrise de React, Node.js et français courant. Télétravail hybride possible.

Question : Quelle est la condition concernant le lieu de travail ?', NULL, NULL, '["100% au bureau", "100% \u00e0 distance", "M\u00e9lange de bureau et distance", "Travail \u00e0 l''\u00e9tranger"]', 'Mélange de bureau et distance', 'La réponse correcte est ''Mélange de bureau et distance'' d''après le texte fourni.', 1, 3, '2026-06-22T22:39:34.245965'),
('b69c6e02-ffe2-4eb1-8e63-505cc381fba3', 'd72182b6-ee87-4394-857d-052ce2b05a12', 'Quel est le métier de l''invitée ?', 'https://cdn.francaispass.com/audio/tef/intermediate/q1.mp3', NULL, '["Journaliste", "B\u00fbcheronne", "Experte en environnement", "Professeure de g\u00e9ographie"]', 'Experte en environnement', 'L''audio mentionne explicitement ''Experte en environnement''.', 1, 0, '2026-06-22T22:39:34.245985'),
('7e68d8ed-3381-4ec0-b777-dc58827068d3', 'd72182b6-ee87-4394-857d-052ce2b05a12', 'De quoi vont-ils parler ?', 'https://cdn.francaispass.com/audio/tef/intermediate/q2.mp3', NULL, '["De la m\u00e9t\u00e9o de demain", "Du changement climatique", "De la vie des animaux", "Du prix du bois"]', 'Du changement climatique', 'L''audio mentionne explicitement ''Du changement climatique''.', 1, 1, '2026-06-22T22:39:34.245993'),
('f469eec9-2861-4971-844e-be4330e5418a', 'f61d727f-858f-42bf-93ef-72ad5fc0d77c', 'Malgré une croissance économique robuste, le pays est confronté à une inflation galopante qui érode le pouvoir d''achat des ménages. La Banque Centrale envisage une hausse des taux d''intérêt pour stabiliser les prix, au risque de ralentir la consommation intérieure. Les économistes sont partagés sur l''efficacité à long terme de cette politique monétaire austère.

Question : Quelle est la conséquence principale de l''inflation mentionnée ?', NULL, NULL, '["Une croissance \u00e9conomique nulle", "La diminution du pouvoir d''achat", "La baisse des taux d''int\u00e9r\u00eat", "L''augmentation des salaires"]', 'La diminution du pouvoir d''achat', 'La réponse correcte est ''La diminution du pouvoir d''achat'' d''après le texte fourni.', 1, 0, '2026-06-22T22:39:34.246009'),
('897c6ff7-2c6f-46e8-a4da-1acce5b8f65e', 'f61d727f-858f-42bf-93ef-72ad5fc0d77c', 'Malgré une croissance économique robuste, le pays est confronté à une inflation galopante qui érode le pouvoir d''achat des ménages. La Banque Centrale envisage une hausse des taux d''intérêt pour stabiliser les prix, au risque de ralentir la consommation intérieure. Les économistes sont partagés sur l''efficacité à long terme de cette politique monétaire austère.

Question : Quelle mesure est envisagée par la Banque Centrale ?', NULL, NULL, '["Injecter des liquidit\u00e9s", "Baisser les imp\u00f4ts", "Augmenter les taux d''int\u00e9r\u00eat", "Favoriser la consommation"]', 'Augmenter les taux d''intérêt', 'La réponse correcte est ''Augmenter les taux d''intérêt'' d''après le texte fourni.', 1, 1, '2026-06-22T22:39:34.246016'),
('ff8c4a2d-aa20-4e28-b630-238eefce739b', 'd741196d-4619-4229-b20f-358301f30e9e', 'Quel est le problème soulevé par l''orateur ?', 'https://cdn.francaispass.com/audio/tef/advanced/q1.mp3', NULL, '["Le manque d''acc\u00e8s \u00e0 internet", "La vitesse de l''information vs sa qualit\u00e9", "Le co\u00fbt des abonnements presse", "La disparition des r\u00e9seaux sociaux"]', 'La vitesse de l''information vs sa qualité', 'L''audio mentionne explicitement ''La vitesse de l''information vs sa qualité''.', 1, 0, '2026-06-22T22:39:34.246029'),
('9f55dca1-d4bd-48f5-8356-f289f1cdbcf4', 'ef59cdd4-aaeb-4942-b68d-ccf845a0618c', 'A VENDRE : Vélo de ville en excellent état. Prix : 150 euros. Contactez Marc au 06.12.34.56.78 après 18h.

Question : Que vend Marc ?', NULL, NULL, '["Un v\u00e9lo", "Une voiture", "Une maison", "Un t\u00e9l\u00e9phone"]', 'Un vélo', 'La réponse correcte est ''Un vélo'' d''après le texte fourni.', 1, 0, '2026-06-22T22:39:34.246044'),
('6cf0e322-b15e-495f-b7fe-4f5f672978d6', 'ef59cdd4-aaeb-4942-b68d-ccf845a0618c', 'A VENDRE : Vélo de ville en excellent état. Prix : 150 euros. Contactez Marc au 06.12.34.56.78 après 18h.

Question : A quel moment peut-on appeler Marc ?', NULL, NULL, '["Le matin", "L''apr\u00e8s-midi", "Le soir", "Toute la journ\u00e9e"]', 'Le soir', 'La réponse correcte est ''Le soir'' d''après le texte fourni.', 1, 1, '2026-06-22T22:39:34.246050'),
('76f544b2-6447-4eca-9a2d-e0ed8b14fbef', 'ef59cdd4-aaeb-4942-b68d-ccf845a0618c', 'OUVERTURE EXCEPTIONNELLE : Votre boulangerie sera ouverte ce dimanche 14 juillet de 7h à 13h. Bonne fête nationale !

Question : Que se passe-t-il le 14 juillet ?', NULL, NULL, '["La boulangerie est ferm\u00e9e", "La boulangerie ouvre plus tard", "La boulangerie ouvre exceptionnellement", "Il y a une f\u00eate \u00e0 la boulangerie"]', 'La boulangerie ouvre exceptionnellement', 'La réponse correcte est ''La boulangerie ouvre exceptionnellement'' d''après le texte fourni.', 1, 2, '2026-06-22T22:39:34.246058'),
('0a4e3037-b627-4e64-b896-cd27e3f6157c', 'ef59cdd4-aaeb-4942-b68d-ccf845a0618c', 'OUVERTURE EXCEPTIONNELLE : Votre boulangerie sera ouverte ce dimanche 14 juillet de 7h à 13h. Bonne fête nationale !

Question : A quelle heure ferme la boulangerie ce jour-là ?', NULL, NULL, '["7h", "13h", "14h", "18h"]', '13h', 'La réponse correcte est ''13h'' d''après le texte fourni.', 1, 3, '2026-06-22T22:39:34.246064'),
('a9c05ab6-09e4-4c07-9060-f7bc15b80cc3', '66349bb6-a506-4940-8b40-4c5761de99b7', 'Où va ce train ?', 'https://cdn.francaispass.com/audio/tcf/beginner/q1.mp3', NULL, '["Lyon", "Paris", "Marseille", "Lille"]', 'Paris', 'L''audio mentionne explicitement ''Paris''.', 1, 0, '2026-06-22T22:39:34.246077'),
('692b6e94-655d-4a2e-9019-7994b308703d', '66349bb6-a506-4940-8b40-4c5761de99b7', 'Sur quel quai se trouve le train ?', 'https://cdn.francaispass.com/audio/tcf/beginner/q2.mp3', NULL, '["Quai 1", "Quai 2", "Quai 3", "Quai 4"]', 'Quai 3', 'L''audio mentionne explicitement ''Quai 3''.', 1, 1, '2026-06-22T22:39:34.246083'),
('2daaac36-ec21-4e77-9210-f8052b4dc320', 'cfe86f4d-2f7c-425c-a136-9cf3750d55ea', 'La ville de Gatineau a annoncé le lancement d''un nouveau programme de recyclage des matières organiques. Dès le mois prochain, chaque foyer recevra un bac brun. Cette initiative vise à réduire de 40% les déchets envoyés au dépotoir.

Question : Quel est l''objectif principal de ce nouveau programme ?', NULL, NULL, '["Distribuer des bacs gratuits", "R\u00e9duire les d\u00e9chets m\u00e9nagers", "Augmenter les taxes municipales", "Nettoyer les rues de Gatineau"]', 'Réduire les déchets ménagers', 'La réponse correcte est ''Réduire les déchets ménagers'' d''après le texte fourni.', 1, 0, '2026-06-22T22:39:34.246096'),
('b0000311-df7a-4082-a256-5a34c27f6223', 'cfe86f4d-2f7c-425c-a136-9cf3750d55ea', 'La ville de Gatineau a annoncé le lancement d''un nouveau programme de recyclage des matières organiques. Dès le mois prochain, chaque foyer recevra un bac brun. Cette initiative vise à réduire de 40% les déchets envoyés au dépotoir.

Question : Quand le programme commencera-t-il ?', NULL, NULL, '["Imm\u00e9diatement", "L''ann\u00e9e prochaine", "Le mois prochain", "Dans six mois"]', 'Le mois prochain', 'La réponse correcte est ''Le mois prochain'' d''après le texte fourni.', 1, 1, '2026-06-22T22:39:34.246105'),
('8f9449e4-4742-4107-856a-8199b8fc0047', 'cfe86f4d-2f7c-425c-a136-9cf3750d55ea', 'Offre d''emploi : Entreprise technologique à Montréal recherche un développeur web junior. Compétences requises : maîtrise de React, Node.js et français courant. Télétravail hybride possible.

Question : Quel profil de candidat est recherché ?', NULL, NULL, '["Un expert en marketing", "Un d\u00e9veloppeur d\u00e9butant", "Un directeur technique", "Un traducteur"]', 'Un développeur débutant', 'La réponse correcte est ''Un développeur débutant'' d''après le texte fourni.', 1, 2, '2026-06-22T22:39:34.246112'),
('fa9de09e-7157-483d-b3e3-164b6ed07578', 'cfe86f4d-2f7c-425c-a136-9cf3750d55ea', 'Offre d''emploi : Entreprise technologique à Montréal recherche un développeur web junior. Compétences requises : maîtrise de React, Node.js et français courant. Télétravail hybride possible.

Question : Quelle est la condition concernant le lieu de travail ?', NULL, NULL, '["100% au bureau", "100% \u00e0 distance", "M\u00e9lange de bureau et distance", "Travail \u00e0 l''\u00e9tranger"]', 'Mélange de bureau et distance', 'La réponse correcte est ''Mélange de bureau et distance'' d''après le texte fourni.', 1, 3, '2026-06-22T22:39:34.246119'),
('59508071-aacd-4277-bc35-4b1ee319763d', 'c87ae3ad-81b0-41e7-9a34-9e3836897c70', 'Quel est le métier de l''invitée ?', 'https://cdn.francaispass.com/audio/tcf/intermediate/q1.mp3', NULL, '["Journaliste", "B\u00fbcheronne", "Experte en environnement", "Professeure de g\u00e9ographie"]', 'Experte en environnement', 'L''audio mentionne explicitement ''Experte en environnement''.', 1, 0, '2026-06-22T22:39:34.246131'),
('305501b8-3386-4436-80e8-f5533fc83030', 'c87ae3ad-81b0-41e7-9a34-9e3836897c70', 'De quoi vont-ils parler ?', 'https://cdn.francaispass.com/audio/tcf/intermediate/q2.mp3', NULL, '["De la m\u00e9t\u00e9o de demain", "Du changement climatique", "De la vie des animaux", "Du prix du bois"]', 'Du changement climatique', 'L''audio mentionne explicitement ''Du changement climatique''.', 1, 1, '2026-06-22T22:39:34.246138'),
('69ef409c-ecb7-4848-97ec-95c8ad946540', 'd9014ff3-7f18-4c5b-a86e-6962e2d68f7e', 'Malgré une croissance économique robuste, le pays est confronté à une inflation galopante qui érode le pouvoir d''achat des ménages. La Banque Centrale envisage une hausse des taux d''intérêt pour stabiliser les prix, au risque de ralentir la consommation intérieure. Les économistes sont partagés sur l''efficacité à long terme de cette politique monétaire austère.

Question : Quelle est la conséquence principale de l''inflation mentionnée ?', NULL, NULL, '["Une croissance \u00e9conomique nulle", "La diminution du pouvoir d''achat", "La baisse des taux d''int\u00e9r\u00eat", "L''augmentation des salaires"]', 'La diminution du pouvoir d''achat', 'La réponse correcte est ''La diminution du pouvoir d''achat'' d''après le texte fourni.', 1, 0, '2026-06-22T22:39:34.246152'),
('59176063-39a8-4ebc-8261-bf7e4f63ad27', 'd9014ff3-7f18-4c5b-a86e-6962e2d68f7e', 'Malgré une croissance économique robuste, le pays est confronté à une inflation galopante qui érode le pouvoir d''achat des ménages. La Banque Centrale envisage une hausse des taux d''intérêt pour stabiliser les prix, au risque de ralentir la consommation intérieure. Les économistes sont partagés sur l''efficacité à long terme de cette politique monétaire austère.

Question : Quelle mesure est envisagée par la Banque Centrale ?', NULL, NULL, '["Injecter des liquidit\u00e9s", "Baisser les imp\u00f4ts", "Augmenter les taux d''int\u00e9r\u00eat", "Favoriser la consommation"]', 'Augmenter les taux d''intérêt', 'La réponse correcte est ''Augmenter les taux d''intérêt'' d''après le texte fourni.', 1, 1, '2026-06-22T22:39:34.246158'),
('66374609-5512-45fa-8669-98d34d2075e2', '80729f56-623c-45a9-8e77-e90d56b44069', 'Quel est le problème soulevé par l''orateur ?', 'https://cdn.francaispass.com/audio/tcf/advanced/q1.mp3', NULL, '["Le manque d''acc\u00e8s \u00e0 internet", "La vitesse de l''information vs sa qualit\u00e9", "Le co\u00fbt des abonnements presse", "La disparition des r\u00e9seaux sociaux"]', 'La vitesse de l''information vs sa qualité', 'L''audio mentionne explicitement ''La vitesse de l''information vs sa qualité''.', 1, 0, '2026-06-22T22:39:34.246171'),
('67a40395-a68f-4329-b5b5-612b7507027b', '319775b5-56bf-458c-8b60-1f3c7913daa4', '### Section A : Fait divers

Vous avez été témoin d''un accident de la circulation. Écrivez un article pour le journal local relatant les faits (80 mots minimum).', NULL, NULL, NULL, NULL, 'Respectez le nombre de mots et la structure demandée.', 10, 0, '2026-06-22T22:39:34.246186'),
('e9007bce-79d0-456f-9e2e-8b0bc39cda6d', '319775b5-56bf-458c-8b60-1f3c7913daa4', '### Section B : Lettre d''argumentation

Votre municipalité a décidé de fermer la bibliothèque municipale pour construire un centre commercial. Écrivez une lettre au maire pour exprimer votre désaccord et argumenter en faveur de la culture (200 mots minimum).', NULL, NULL, NULL, NULL, 'Respectez le nombre de mots et la structure demandée.', 10, 1, '2026-06-22T22:39:34.246191'),
('0031cd05-41ed-4c8e-8657-19e9c74bc7cd', 'a2a4037a-814b-46f8-a768-b8b8dcefc649', '### Section A : Demande de renseignements

Vous avez vu une annonce pour un cours de cuisine. Appelez l''organisateur pour obtenir des informations sur les prix, les horaires et le contenu du cours.', NULL, NULL, NULL, NULL, 'Soyez fluide, utilisez des connecteurs logiques et un vocabulaire varié.', 10, 0, '2026-06-22T22:39:34.246205'),
('3b57040d-bb6b-4971-853a-35202c001411', 'a2a4037a-814b-46f8-a768-b8b8dcefc649', '### Section B : Convaincre un ami

Un de vos amis hésite à partir vivre au Canada. Essayez de le convaincre en lui présentant les avantages du pays.', NULL, NULL, NULL, NULL, 'Soyez fluide, utilisez des connecteurs logiques et un vocabulaire varié.', 10, 1, '2026-06-22T22:39:34.246212'),
('8ac890e7-785f-4779-a521-903328f73e6c', '3370fdff-bff9-4a6e-b434-65646a01a437', '### Section A : Fait divers

Vous avez été témoin d''un accident de la circulation. Écrivez un article pour le journal local relatant les faits (80 mots minimum).', NULL, NULL, NULL, NULL, 'Respectez le nombre de mots et la structure demandée.', 10, 0, '2026-06-22T22:39:34.246223'),
('056d8ec5-66cf-493f-9b4d-aa2832fedc11', '3370fdff-bff9-4a6e-b434-65646a01a437', '### Section B : Lettre d''argumentation

Votre municipalité a décidé de fermer la bibliothèque municipale pour construire un centre commercial. Écrivez une lettre au maire pour exprimer votre désaccord et argumenter en faveur de la culture (200 mots minimum).', NULL, NULL, NULL, NULL, 'Respectez le nombre de mots et la structure demandée.', 10, 1, '2026-06-22T22:39:34.246230'),
('c0cf135d-7abf-438b-a3fc-2140640cf7c6', '654a6a85-64cd-490b-b285-f95e5db6368b', '### Section A : Demande de renseignements

Vous avez vu une annonce pour un cours de cuisine. Appelez l''organisateur pour obtenir des informations sur les prix, les horaires et le contenu du cours.', NULL, NULL, NULL, NULL, 'Soyez fluide, utilisez des connecteurs logiques et un vocabulaire varié.', 10, 0, '2026-06-22T22:39:34.246242'),
('2d1119cc-69ab-4651-9fa6-e54e2151a065', '654a6a85-64cd-490b-b285-f95e5db6368b', '### Section B : Convaincre un ami

Un de vos amis hésite à partir vivre au Canada. Essayez de le convaincre en lui présentant les avantages du pays.', NULL, NULL, NULL, NULL, 'Soyez fluide, utilisez des connecteurs logiques et un vocabulaire varié.', 10, 1, '2026-06-22T22:39:34.246246');

-- Vocabulary seed data
INSERT INTO public.vocabulary (id, french_word, english_definition, example_sentence, difficulty, category)
VALUES
('eee415fd-475b-4b11-9444-27c69812e834', 'citoyenneté', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'a1', 'immigration'),
('82cb2ad0-04f4-4db1-85ad-114b91ce6f64', 'résidence', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'a1', 'immigration'),
('388774c9-44d2-4378-9143-2a44dce21359', 'visa', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'a1', 'immigration'),
('5fb5f061-5992-403c-85ca-d5a2eea9da79', 'frontière', 'border', 'Le contrôle à la frontière a été très rapide.', 'a1', 'immigration'),
('dd05e07e-c7df-46ae-9698-956c6403154f', 'intégration', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'a1', 'immigration'),
('b2d8281d-38bc-4f80-a75d-c9697e9624d5', 'naturalisation', 'naturalization', 'Le dossier de naturalisation est complexe.', 'a1', 'immigration'),
('71f4bbbf-b403-4c7c-a65d-d91732212db3', 'parrainage', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'a1', 'immigration'),
('cbe22884-67f0-4b87-b61d-05c0ccab2bbe', 'réfugié', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'a1', 'immigration'),
('66e0ea24-c3d7-41b6-8ca9-46229a88fff1', 'permis', 'permit', 'Avez-vous un permis de travail valide ?', 'a1', 'immigration'),
('0631adf0-2781-45f7-aa9e-e0473cff6f08', 'admissibilité', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'a1', 'immigration'),
('e6856601-e406-43a2-ba62-bcfea61d0850', 'embauche', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'a1', 'work'),
('857b51ab-f71a-45a4-bdf5-331ebd231981', 'chômage', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'a1', 'work'),
('0979df7d-6f21-4dd5-91bb-17c740ff49f1', 'salaire', 'salary', 'Le salaire minimum varie selon la province.', 'a1', 'work'),
('762e4aaa-e9d2-427e-8c7a-f6ceddcf1979', 'compétence', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'a1', 'work'),
('c9b9a54a-1bab-4c9b-88f1-4017b281efc1', 'entretien', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'a1', 'work'),
('6aabf575-3e57-4091-92f5-8ba31e541e09', 'cv', 'resume', 'Envoyez votre CV par courriel.', 'a1', 'work'),
('5cd5d83e-f002-4c28-897d-1e7af6107e1c', 'stage', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'a1', 'work'),
('996427e5-3982-489e-ac9e-37a57e846c79', 'retraite', 'retirement', 'Il prendra sa retraite à 65 ans.', 'a1', 'work'),
('ac10461c-6252-4b9a-a3e6-133683ea3fdc', 'syndicat', 'union', 'Le syndicat négocie les conditions de travail.', 'a1', 'work'),
('cc7ccfdc-dd82-4783-aafc-5c7928a7e2e6', 'carrière', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'a1', 'work'),
('2b88a130-6384-4a09-bd63-4c808c576dfb', 'diplôme', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'a1', 'education'),
('a2400e4a-3c6d-493b-9c5d-8cb02a150f51', 'bourse', 'scholarship', 'Il a reçu une bourse pour ses études.', 'a1', 'education'),
('8a18ef80-ce44-447c-a443-e57292a88253', 'inscription', 'registration', 'La date limite d''inscription est demain.', 'a1', 'education'),
('561edb73-f65d-4a61-8015-edc27c70c5dd', 'cours', 'course', 'Je suis un cours de français intensif.', 'a1', 'education'),
('bb8f0c31-b679-4375-a169-096762639b96', 'examen', 'exam', 'L''examen final aura lieu dans le gymnase.', 'a1', 'education'),
('7d9d68b9-5448-47f2-9ff3-d9ed752308c2', 'apprentissage', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'a1', 'education'),
('52dd9dd5-1349-4e1d-bdb2-9be087403d9d', 'bibliothèque', 'library', 'J''étudie souvent à la bibliothèque.', 'a1', 'education'),
('a6b2746b-d4d6-4f3d-8d25-1ec32c2d95bc', 'scolarité', 'schooling', 'Les frais de scolarité sont élevés.', 'a1', 'education'),
('e036f8d0-5e05-42c8-ba07-e0ddc0100c54', 'enseignement', 'teaching', 'L''enseignement est une profession valorisante.', 'a1', 'education'),
('aab3d28c-332d-4d1b-b81d-bae212d3eb3f', 'recherche', 'research', 'Il travaille dans un laboratoire de recherche.', 'a1', 'education'),
('5099007d-e834-4eb6-9840-ae21ac7b1950', 'loyer', 'rent', 'Le loyer est dû le premier du mois.', 'a1', 'housing'),
('56486a91-7717-4c0b-8d60-09a20afcac1c', 'bail', 'lease', 'Nous avons signé un bail de douze mois.', 'a1', 'housing'),
('82764933-5871-4799-b8a9-465921783a57', 'appartement', 'apartment', 'Je cherche un appartement de deux chambres.', 'a1', 'housing'),
('5c98cdb8-80d6-49ec-ada2-e766d116e1cc', 'propriétaire', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'a1', 'housing'),
('7bde1148-b4f0-4f7a-91e2-f3d44218cfa0', 'locataire', 'tenant', 'Les locataires doivent respecter le calme.', 'a1', 'housing'),
('f94fe4b1-e599-4f2a-a546-c5255ec92a42', 'déménagement', 'moving', 'Le déménagement est prévu pour samedi.', 'a1', 'housing'),
('498282a9-75be-4661-a3d4-3887456d169f', 'quartier', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'a1', 'housing'),
('5c4a3df5-94b1-42e6-99ed-e460b2be9e85', 'meublé', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'a1', 'housing'),
('9a7700b6-9cc2-4a85-8920-3d7b6ef68327', 'charges', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'a1', 'housing'),
('637e6f8a-9abb-4e94-8253-6bb79c6dfb5a', 'hypothèque', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'a1', 'housing'),
('2feecef5-59f3-45d2-b4b4-36519daa12a5', 'médecin', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'a1', 'health'),
('734264b8-d6d6-44e3-8a0f-fc760d3c827b', 'hôpital', 'hospital', 'L''hôpital est situé au centre-ville.', 'a1', 'health'),
('f3cf29d6-c7af-4d80-9972-db388ec28583', 'ordonnance', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'a1', 'health'),
('4da5c16f-2a83-48b3-9954-e6c659fcad0e', 'assurance', 'insurance', 'L''assurance maladie est obligatoire.', 'a1', 'health'),
('d4f39159-ce92-455e-923f-1ad0f136d39a', 'santé', 'health', 'La santé est le bien le plus précieux.', 'a1', 'health'),
('2fa9f3a1-0413-4ec9-92e4-d70e3424e3ae', 'urgence', 'emergency', 'En cas d''urgence, appelez le 911.', 'a1', 'health'),
('b5fc737f-2119-472e-b083-ba001e423e93', 'traitement', 'treatment', 'Ce traitement est très efficace.', 'a1', 'health'),
('0e9f2196-193a-4d9f-8036-a92b21a37b23', 'douleur', 'pain', 'Où ressentez-vous la douleur ?', 'a1', 'health'),
('24be950c-fcb4-4c51-9e29-984e72fde5d3', 'vaccin', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'a1', 'health'),
('c0cefc97-5828-44f6-b432-95b8d76667fa', 'symptôme', 'symptom', 'Quels sont vos symptômes ?', 'a1', 'health'),
('8dd4af1d-5010-4a3c-bc48-c1b925747b32', 'épicerie', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'a1', 'daily_life'),
('07c3826a-0518-4140-af34-c9bece61cbbd', 'transport', 'transportation', 'Les transports en commun sont efficaces ici.', 'a1', 'daily_life'),
('a303a171-2e43-4b28-9aa2-57d247bd0e3a', 'météo', 'weather', 'Consultez la météo avant de sortir.', 'a1', 'daily_life'),
('2594b3ff-e9c7-4262-9ca4-1cda8c4e33c0', 'loisir', 'leisure', 'Le sport est mon loisir préféré.', 'a1', 'daily_life'),
('d2dc014a-f1c1-46f2-b655-43664e7e7e1a', 'voisin', 'neighbor', 'Nos voisins sont très sympathiques.', 'a1', 'daily_life'),
('477f0df4-9563-4424-a753-10517cd5182b', 'banque', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'a1', 'daily_life'),
('dca9c5ba-d1e6-4eb2-80a2-aaf7101763f5', 'courrier', 'mail', 'Avez-vous reçu mon courrier ?', 'a1', 'daily_life'),
('ed7e0038-3dce-4e01-8cfa-348374f36fcb', 'vêtement', 'clothing', 'Portez des vêtements chauds en hiver.', 'a1', 'daily_life'),
('6b7ad1bf-f93a-480a-a481-cddb85349ea1', 'nourriture', 'food', 'La nourriture canadienne est variée.', 'a1', 'daily_life'),
('db5be3d9-9e83-4b9e-b7a8-8063b660b7b8', 'famille', 'family', 'Ma famille me manque beaucoup.', 'a1', 'daily_life'),
('a03e5a7e-5094-406f-a198-5099c52ac415', 'citoyenneté (2)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'a1', 'immigration'),
('59d45b36-890b-43ad-8ce2-6ef595bee479', 'résidence (2)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'a1', 'immigration'),
('fb7135f6-e989-49ad-846d-05564a468af9', 'visa (2)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'a1', 'immigration'),
('3114ad6b-96b2-4e43-8876-74c09ea16ff0', 'frontière (2)', 'border', 'Le contrôle à la frontière a été très rapide.', 'a1', 'immigration'),
('0a188038-be53-4357-b138-1fb5b850014c', 'intégration (2)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'a1', 'immigration'),
('db7034c7-6223-4a44-85b5-a817beba804c', 'naturalisation (2)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'a1', 'immigration'),
('9279d3e2-367a-4361-a25f-5584bfe214d0', 'parrainage (2)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'a1', 'immigration'),
('570e42ab-df18-4416-af8d-94953b5c6eca', 'réfugié (2)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'a1', 'immigration'),
('e6bdf244-a9ab-49e7-b3e6-3c614c0c61b9', 'permis (2)', 'permit', 'Avez-vous un permis de travail valide ?', 'a1', 'immigration'),
('891eb223-abe7-4f2d-9ec3-fbcdbb329021', 'admissibilité (2)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'a1', 'immigration'),
('bf5aa89b-ccff-414b-b9c2-915e9da0ca6c', 'embauche (2)', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'a1', 'work'),
('71e898a5-3d22-4e34-b961-63096e388318', 'chômage (2)', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'a1', 'work'),
('deb6c9de-feb9-452c-8926-8fdeae2b6c8c', 'salaire (2)', 'salary', 'Le salaire minimum varie selon la province.', 'a1', 'work'),
('3d947590-863b-44c4-8c34-ea941df120ff', 'compétence (2)', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'a1', 'work'),
('10b49b0d-2d01-4e88-8b94-7798c51cae61', 'entretien (2)', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'a1', 'work'),
('64029395-ed29-4408-afdc-f51bc4ce2772', 'cv (2)', 'resume', 'Envoyez votre CV par courriel.', 'a1', 'work'),
('9955c84b-6b20-43aa-82e9-fee0aa6b0e41', 'stage (2)', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'a1', 'work'),
('726e9823-4740-4c6b-974c-9b066f70c726', 'retraite (2)', 'retirement', 'Il prendra sa retraite à 65 ans.', 'a1', 'work'),
('35b7aa53-2917-4d2e-8a65-59ad40595d6c', 'syndicat (2)', 'union', 'Le syndicat négocie les conditions de travail.', 'a1', 'work'),
('205b5015-7dee-48af-bbbc-7bcfeed6b582', 'carrière (2)', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'a1', 'work'),
('e9f9b005-7fab-4be9-b8c9-e93d7a2e9945', 'diplôme (2)', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'a1', 'education'),
('a9936a55-1c17-4833-8267-daddc2b390c6', 'bourse (2)', 'scholarship', 'Il a reçu une bourse pour ses études.', 'a1', 'education'),
('42f85f3d-685c-410c-a426-95fe14d35179', 'inscription (2)', 'registration', 'La date limite d''inscription est demain.', 'a1', 'education'),
('80bed87e-7354-4615-95d0-f6323341c211', 'cours (2)', 'course', 'Je suis un cours de français intensif.', 'a1', 'education'),
('b2f34281-1258-4998-b426-c5b377145a02', 'examen (2)', 'exam', 'L''examen final aura lieu dans le gymnase.', 'a1', 'education'),
('a008dcca-cf11-4e91-b8e6-05a262dc82e8', 'apprentissage (2)', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'a1', 'education'),
('942f7919-abed-49ed-b88e-c74b9e162255', 'bibliothèque (2)', 'library', 'J''étudie souvent à la bibliothèque.', 'a1', 'education'),
('15471c5a-6bc9-45e0-b117-65705653625f', 'scolarité (2)', 'schooling', 'Les frais de scolarité sont élevés.', 'a1', 'education'),
('dca85d34-f459-4e2e-80a5-c596e91fb9a8', 'enseignement (2)', 'teaching', 'L''enseignement est une profession valorisante.', 'a1', 'education'),
('df751163-db9f-4798-aaf4-cc20d85eee7c', 'recherche (2)', 'research', 'Il travaille dans un laboratoire de recherche.', 'a1', 'education'),
('c4c83083-6150-4d2d-8e19-7e833fcfa4dc', 'loyer (2)', 'rent', 'Le loyer est dû le premier du mois.', 'a1', 'housing'),
('a24e0ed2-7cd9-4522-8b52-735ffe9afe53', 'bail (2)', 'lease', 'Nous avons signé un bail de douze mois.', 'a1', 'housing'),
('a548d538-6748-4c11-b2b0-51ef923d4485', 'appartement (2)', 'apartment', 'Je cherche un appartement de deux chambres.', 'a1', 'housing'),
('8febd295-0c5b-4254-8840-d476dd75d50d', 'propriétaire (2)', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'a1', 'housing'),
('17e066e4-9d4a-46c8-9159-072ea493d4e7', 'locataire (2)', 'tenant', 'Les locataires doivent respecter le calme.', 'a1', 'housing'),
('06d79a88-57eb-429c-a6bc-021dca469602', 'déménagement (2)', 'moving', 'Le déménagement est prévu pour samedi.', 'a1', 'housing'),
('cbe97e83-d0f0-499a-9e06-b143065f8f28', 'quartier (2)', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'a1', 'housing'),
('88b0ae36-af74-484a-8e65-37a497abf369', 'meublé (2)', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'a1', 'housing'),
('28920d85-29da-40c5-a281-760d28e7a671', 'charges (2)', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'a1', 'housing'),
('0e1d8392-b1c2-4f50-98b1-27b1634f96b4', 'hypothèque (2)', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'a1', 'housing'),
('26917dc9-8675-4a9d-b9de-0e812b0ed3bb', 'médecin (2)', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'a1', 'health'),
('a07cabf1-f50c-4c1a-abb7-012f0c3e680d', 'hôpital (2)', 'hospital', 'L''hôpital est situé au centre-ville.', 'a1', 'health'),
('0518ed1c-30b5-4d62-93ee-68854aec9bce', 'ordonnance (2)', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'a1', 'health'),
('90d3bc6b-60b6-4fc3-b9b4-f6c483e19bb9', 'assurance (2)', 'insurance', 'L''assurance maladie est obligatoire.', 'a1', 'health'),
('eaee8403-3dd5-48ba-8cd6-feea2f5bf9db', 'santé (2)', 'health', 'La santé est le bien le plus précieux.', 'a1', 'health'),
('41dd83f2-f6ab-47d5-a115-ed952909e7fc', 'urgence (2)', 'emergency', 'En cas d''urgence, appelez le 911.', 'a1', 'health'),
('a4d19843-2aa5-47f5-b0be-144431836266', 'traitement (2)', 'treatment', 'Ce traitement est très efficace.', 'a1', 'health'),
('11e2c170-5ea8-4b13-b7ce-24f5a2a2bc1d', 'douleur (2)', 'pain', 'Où ressentez-vous la douleur ?', 'a1', 'health'),
('80bbb16c-0abf-454e-8485-1856b97f0ae3', 'vaccin (2)', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'a1', 'health'),
('7f276fdc-3a60-471e-9f35-1a575d34ee0b', 'symptôme (2)', 'symptom', 'Quels sont vos symptômes ?', 'a1', 'health'),
('0a55c3df-7a8b-40ea-8c0f-83726a152def', 'épicerie (2)', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'a2', 'daily_life'),
('0089ce2a-68a0-40a7-bd57-f1c33fabfc59', 'transport (2)', 'transportation', 'Les transports en commun sont efficaces ici.', 'a2', 'daily_life'),
('f31f66e6-260c-4624-a9df-5b8ada9240ab', 'météo (2)', 'weather', 'Consultez la météo avant de sortir.', 'a2', 'daily_life'),
('090ac30d-7d09-469d-843d-ac33644bf811', 'loisir (2)', 'leisure', 'Le sport est mon loisir préféré.', 'a2', 'daily_life'),
('7dc1cb15-c92d-489d-b1b9-e98c62939f17', 'voisin (2)', 'neighbor', 'Nos voisins sont très sympathiques.', 'a2', 'daily_life'),
('1306c041-0725-4521-9399-a3c115271da5', 'banque (2)', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'a2', 'daily_life'),
('9d02d0c3-a2e3-4884-8c4c-fbeda72a3d8b', 'courrier (2)', 'mail', 'Avez-vous reçu mon courrier ?', 'a2', 'daily_life'),
('a0c64978-ed20-45a8-bc74-9af19b3689d2', 'vêtement (2)', 'clothing', 'Portez des vêtements chauds en hiver.', 'a2', 'daily_life'),
('a99dbae5-72d7-49de-9030-1ffdc6de59c4', 'nourriture (2)', 'food', 'La nourriture canadienne est variée.', 'a2', 'daily_life'),
('a03db43d-24ea-4a66-9318-6a4596a39544', 'famille (2)', 'family', 'Ma famille me manque beaucoup.', 'a2', 'daily_life'),
('e924bd07-1c0d-4ad7-beba-83f762501805', 'citoyenneté (3)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'a2', 'immigration'),
('7d4e1860-fe6c-4abc-8169-8f61e10a3c2d', 'résidence (3)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'a2', 'immigration'),
('095395a2-71bd-44f7-ae52-527e5c34a58d', 'visa (3)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'a2', 'immigration'),
('5f858d25-99b0-45a6-b1ff-359c307b6683', 'frontière (3)', 'border', 'Le contrôle à la frontière a été très rapide.', 'a2', 'immigration'),
('9342c9d7-2d05-4bc3-b562-688b785bf054', 'intégration (3)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'a2', 'immigration'),
('68af218f-3abb-404a-8d2c-671bc2af9e20', 'naturalisation (3)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'a2', 'immigration'),
('86672024-3c5e-45f2-883a-2037b5d4735f', 'parrainage (3)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'a2', 'immigration'),
('80429935-b3e5-46ce-a29d-61313bf90582', 'réfugié (3)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'a2', 'immigration'),
('a215c012-c021-440a-80e5-dafd9befd0bf', 'permis (3)', 'permit', 'Avez-vous un permis de travail valide ?', 'a2', 'immigration'),
('6d7d5fab-baa6-482c-baf5-7c7132c4239f', 'admissibilité (3)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'a2', 'immigration'),
('586f4458-4798-4a38-8fa1-00579cb03abb', 'embauche (3)', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'a2', 'work'),
('08616ded-b9b1-422d-9931-0f0e3057be9c', 'chômage (3)', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'a2', 'work'),
('b9340965-dab8-482e-ac83-5cf20b9f0b76', 'salaire (3)', 'salary', 'Le salaire minimum varie selon la province.', 'a2', 'work'),
('9abbd628-c367-4e31-89eb-a406ae64e387', 'compétence (3)', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'a2', 'work'),
('4805fa12-a7e2-4d9a-bd90-1e5b3a5f61c1', 'entretien (3)', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'a2', 'work'),
('cce91e67-d629-4f14-bf18-e5193aec4b08', 'cv (3)', 'resume', 'Envoyez votre CV par courriel.', 'a2', 'work'),
('a260ca01-6b0d-4fa6-a2c9-6233b133c701', 'stage (3)', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'a2', 'work'),
('d24551fa-6992-425c-b9ad-f4ad6412a572', 'retraite (3)', 'retirement', 'Il prendra sa retraite à 65 ans.', 'a2', 'work'),
('40c2af78-2fee-4ff4-b8d0-49dbb25a49e8', 'syndicat (3)', 'union', 'Le syndicat négocie les conditions de travail.', 'a2', 'work'),
('b735bfc2-cbb7-46aa-8e83-633557ec235f', 'carrière (3)', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'a2', 'work'),
('af12b83c-0190-412f-8190-ef19a8d4ec65', 'diplôme (3)', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'a2', 'education'),
('d0e62b5b-9e2d-49e9-882b-9cf926254d58', 'bourse (3)', 'scholarship', 'Il a reçu une bourse pour ses études.', 'a2', 'education'),
('3d20d811-76be-4847-960b-314d0e9c11dc', 'inscription (3)', 'registration', 'La date limite d''inscription est demain.', 'a2', 'education'),
('18f6a0b1-d7cc-43eb-bab4-6a21260c6f04', 'cours (3)', 'course', 'Je suis un cours de français intensif.', 'a2', 'education'),
('e2639055-ea5c-475f-a9eb-5c8c7018d9e0', 'examen (3)', 'exam', 'L''examen final aura lieu dans le gymnase.', 'a2', 'education'),
('5700c8bf-e2b9-45c3-8784-291ddd3891ea', 'apprentissage (3)', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'a2', 'education'),
('261351bd-93dd-431e-807d-382646678209', 'bibliothèque (3)', 'library', 'J''étudie souvent à la bibliothèque.', 'a2', 'education'),
('fdc0dbb8-8741-4c9f-914a-3e47ddd0e210', 'scolarité (3)', 'schooling', 'Les frais de scolarité sont élevés.', 'a2', 'education'),
('9be13e4c-4dc3-41b9-92ac-81186005a1de', 'enseignement (3)', 'teaching', 'L''enseignement est une profession valorisante.', 'a2', 'education'),
('2691225c-c551-4d3f-9f7c-2aff87f2859a', 'recherche (3)', 'research', 'Il travaille dans un laboratoire de recherche.', 'a2', 'education'),
('afff3427-cae5-46fd-ba33-bf773b84753f', 'loyer (3)', 'rent', 'Le loyer est dû le premier du mois.', 'a2', 'housing'),
('3637b4f6-fac7-4dd4-871f-7b2a2b944031', 'bail (3)', 'lease', 'Nous avons signé un bail de douze mois.', 'a2', 'housing'),
('53003978-64f4-446a-9e2b-5126a23b3816', 'appartement (3)', 'apartment', 'Je cherche un appartement de deux chambres.', 'a2', 'housing'),
('346047ef-1a29-46e6-a08b-134a5de9ae00', 'propriétaire (3)', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'a2', 'housing'),
('1cbdcace-07db-4b95-b69c-8e747ece97d5', 'locataire (3)', 'tenant', 'Les locataires doivent respecter le calme.', 'a2', 'housing'),
('37088502-5d57-4c9f-adba-e0f8ce8b51c2', 'déménagement (3)', 'moving', 'Le déménagement est prévu pour samedi.', 'a2', 'housing'),
('4e476a42-4927-4e53-8e30-16cabb1102cb', 'quartier (3)', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'a2', 'housing'),
('078b01a6-5286-4065-bc36-442ae7330dfe', 'meublé (3)', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'a2', 'housing'),
('a5f25116-b362-4d72-a3c4-2a2becbc021b', 'charges (3)', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'a2', 'housing'),
('692fd450-d188-4e6e-a1e3-e2ee7b12a599', 'hypothèque (3)', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'a2', 'housing'),
('1bf9dfc1-63db-44ab-9e15-c9ab5241e547', 'médecin (3)', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'a2', 'health'),
('b3ed801f-ba5a-42f9-9121-c1fd00fc75dc', 'hôpital (3)', 'hospital', 'L''hôpital est situé au centre-ville.', 'a2', 'health'),
('64f650c3-d265-468b-841c-f2e4e60db2d7', 'ordonnance (3)', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'a2', 'health'),
('2f4de893-8d73-4986-b720-8253d5686222', 'assurance (3)', 'insurance', 'L''assurance maladie est obligatoire.', 'a2', 'health'),
('e8f8490b-06cd-4fe0-88c7-341214cabfd3', 'santé (3)', 'health', 'La santé est le bien le plus précieux.', 'a2', 'health'),
('0a9cbc0c-47c3-457d-a68b-0f817c2d354f', 'urgence (3)', 'emergency', 'En cas d''urgence, appelez le 911.', 'a2', 'health'),
('cba2b997-300a-4fc0-a45e-3d176087302e', 'traitement (3)', 'treatment', 'Ce traitement est très efficace.', 'a2', 'health'),
('6f1bda91-ec92-4d41-a4c6-231135e82d90', 'douleur (3)', 'pain', 'Où ressentez-vous la douleur ?', 'a2', 'health'),
('bb853801-6779-4ae9-b3a4-3c6c3b31aa6e', 'vaccin (3)', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'a2', 'health'),
('6944b540-26cb-483a-90b6-61edc5c11414', 'symptôme (3)', 'symptom', 'Quels sont vos symptômes ?', 'a2', 'health'),
('68a9211d-9841-491d-8e2b-3318f0a88983', 'épicerie (3)', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'a2', 'daily_life'),
('3e1eb9de-00f9-4876-9c9c-5bb3f1ba4107', 'transport (3)', 'transportation', 'Les transports en commun sont efficaces ici.', 'a2', 'daily_life'),
('7cc50c0d-e798-44d5-963e-031a6314a42e', 'météo (3)', 'weather', 'Consultez la météo avant de sortir.', 'a2', 'daily_life'),
('f85ac3d0-4f71-44e7-9178-bb59f17d68c1', 'loisir (3)', 'leisure', 'Le sport est mon loisir préféré.', 'a2', 'daily_life'),
('fb53ca8a-6949-4041-b588-85bc419d1da6', 'voisin (3)', 'neighbor', 'Nos voisins sont très sympathiques.', 'a2', 'daily_life'),
('8c403454-5327-4c6d-ad75-0d0a070415ea', 'banque (3)', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'a2', 'daily_life'),
('8b001e19-8f5b-4aa9-aeb6-a470205622f1', 'courrier (3)', 'mail', 'Avez-vous reçu mon courrier ?', 'a2', 'daily_life'),
('2ee10061-d386-4991-bdf1-5c76b2d8684c', 'vêtement (3)', 'clothing', 'Portez des vêtements chauds en hiver.', 'a2', 'daily_life'),
('abe38c27-0d3b-41cf-b9ea-9cf332d9dc60', 'nourriture (3)', 'food', 'La nourriture canadienne est variée.', 'a2', 'daily_life'),
('713157d9-0dda-4353-bb21-30d81b1f02c8', 'famille (3)', 'family', 'Ma famille me manque beaucoup.', 'a2', 'daily_life'),
('1fb9cee6-a18e-4792-84a3-e4c1c23cbdc3', 'citoyenneté (4)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'a2', 'immigration'),
('d3c995dd-aa07-42b4-a8b5-c25e5e05650f', 'résidence (4)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'a2', 'immigration'),
('b71c7525-fdc2-4a73-8cbb-c8557217ac3f', 'visa (4)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'a2', 'immigration'),
('5fae9610-d860-4900-baa5-b7e74866a258', 'frontière (4)', 'border', 'Le contrôle à la frontière a été très rapide.', 'a2', 'immigration'),
('50ef4246-d163-468d-85b3-c155d53dda07', 'intégration (4)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'a2', 'immigration'),
('17c8f61a-9379-4df5-b943-521ca7c8432d', 'naturalisation (4)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'a2', 'immigration'),
('2dc5dd6c-77a8-45f3-a158-5edfdbe288fa', 'parrainage (4)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'a2', 'immigration'),
('2e68be86-14c4-4067-b2ae-7d856cb78591', 'réfugié (4)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'a2', 'immigration'),
('d52d5199-ff2e-424f-bd74-1c1404bd1af7', 'permis (4)', 'permit', 'Avez-vous un permis de travail valide ?', 'a2', 'immigration'),
('f1718a70-88a3-4acc-a15a-59a7b8c2b1b9', 'admissibilité (4)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'a2', 'immigration'),
('98892118-6ebc-45cb-ae6d-e9c5a00a532c', 'embauche (4)', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'a2', 'work'),
('43513c72-c132-4505-940f-63d5ae0cddbb', 'chômage (4)', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'a2', 'work'),
('a6b1cd4c-d4c6-4d2e-b51d-2d1ccdd2e779', 'salaire (4)', 'salary', 'Le salaire minimum varie selon la province.', 'a2', 'work'),
('272afda4-6372-4a0a-970a-aa7153f510ea', 'compétence (4)', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'a2', 'work'),
('114c1315-d0cf-4fea-9c39-d903bd1673fb', 'entretien (4)', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'a2', 'work'),
('0538343e-7bb4-418e-a0eb-bb12bafa55ec', 'cv (4)', 'resume', 'Envoyez votre CV par courriel.', 'a2', 'work'),
('8694a516-b1a5-4bd8-8669-08e5e6b67660', 'stage (4)', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'a2', 'work'),
('29e5da3e-07a9-4a2c-8b59-5c3d5e06dcb6', 'retraite (4)', 'retirement', 'Il prendra sa retraite à 65 ans.', 'a2', 'work'),
('ef4d8d59-cd11-48f1-b00b-3075e9752636', 'syndicat (4)', 'union', 'Le syndicat négocie les conditions de travail.', 'a2', 'work'),
('7fd1352b-7f0d-49d0-aa93-bfc1f9e07712', 'carrière (4)', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'a2', 'work'),
('71957d34-e20e-4db0-b667-1f55f3dceb0b', 'diplôme (4)', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'a2', 'education'),
('fa9f1de2-5710-41d9-a7ea-553a246f5b8b', 'bourse (4)', 'scholarship', 'Il a reçu une bourse pour ses études.', 'a2', 'education'),
('f6b45a16-4ad2-471b-ac4c-c2d002b40457', 'inscription (4)', 'registration', 'La date limite d''inscription est demain.', 'a2', 'education'),
('66d9b931-b075-4c92-b60f-c841b1bdf840', 'cours (4)', 'course', 'Je suis un cours de français intensif.', 'a2', 'education'),
('846c43fa-9c78-4eba-b0ec-0ec29049a221', 'examen (4)', 'exam', 'L''examen final aura lieu dans le gymnase.', 'a2', 'education'),
('446bac58-20b7-4cf9-ae8b-981ff6dc90ca', 'apprentissage (4)', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'a2', 'education'),
('094d6277-46bc-4770-9f58-6e8521b9df38', 'bibliothèque (4)', 'library', 'J''étudie souvent à la bibliothèque.', 'a2', 'education'),
('0b527e2d-a99b-428e-ad33-55d2df57cd23', 'scolarité (4)', 'schooling', 'Les frais de scolarité sont élevés.', 'a2', 'education'),
('bf674059-ffb7-41df-a8b7-68b727f76a76', 'enseignement (4)', 'teaching', 'L''enseignement est une profession valorisante.', 'a2', 'education'),
('a67f2e36-f8c0-415e-9c22-a44f1c6b8826', 'recherche (4)', 'research', 'Il travaille dans un laboratoire de recherche.', 'a2', 'education'),
('96bc1561-96dc-4cda-a29f-58f047de5fc8', 'loyer (4)', 'rent', 'Le loyer est dû le premier du mois.', 'a2', 'housing'),
('0160e1b8-f66d-410b-8947-8742125f3019', 'bail (4)', 'lease', 'Nous avons signé un bail de douze mois.', 'a2', 'housing'),
('2ea040a2-cbce-487d-98da-4b9325f5dd5b', 'appartement (4)', 'apartment', 'Je cherche un appartement de deux chambres.', 'a2', 'housing'),
('851fb40f-dd86-4eb7-994a-a2c39f3c0550', 'propriétaire (4)', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'a2', 'housing'),
('1cead7ef-8485-4b75-896e-aea82ab14e74', 'locataire (4)', 'tenant', 'Les locataires doivent respecter le calme.', 'a2', 'housing'),
('33c053d8-b563-4e0c-82ef-49e5b01a0cdc', 'déménagement (4)', 'moving', 'Le déménagement est prévu pour samedi.', 'a2', 'housing'),
('3432f19e-6833-46c4-8839-421a861d5893', 'quartier (4)', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'a2', 'housing'),
('9437c4ff-c885-4bf0-bffc-2802029c0ba8', 'meublé (4)', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'a2', 'housing'),
('4ed914b8-08f2-482b-9be1-06f367c0554e', 'charges (4)', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'a2', 'housing'),
('59a48641-65ad-4e67-b91c-88e0a8aa0afc', 'hypothèque (4)', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'a2', 'housing'),
('f39c09e5-8505-4163-a1c3-3e2793b1cea5', 'médecin (4)', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'b1', 'health'),
('14833641-46e7-4c57-9408-7e080dd13506', 'hôpital (4)', 'hospital', 'L''hôpital est situé au centre-ville.', 'b1', 'health'),
('381ab2e6-162b-4477-8e77-fba9ac9b1103', 'ordonnance (4)', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'b1', 'health'),
('0c0cff10-9209-4474-8407-20534ca710a3', 'assurance (4)', 'insurance', 'L''assurance maladie est obligatoire.', 'b1', 'health'),
('596b5099-ad16-416a-84f9-a5cf054effaa', 'santé (4)', 'health', 'La santé est le bien le plus précieux.', 'b1', 'health'),
('3c7a1c0b-9c6a-4c8e-a1e9-4e459d6d1cdc', 'urgence (4)', 'emergency', 'En cas d''urgence, appelez le 911.', 'b1', 'health'),
('134f92d8-5857-40e8-bbcd-96a1a10e000c', 'traitement (4)', 'treatment', 'Ce traitement est très efficace.', 'b1', 'health'),
('2800d436-31a6-4ff9-8a7a-aa037350c727', 'douleur (4)', 'pain', 'Où ressentez-vous la douleur ?', 'b1', 'health'),
('eb275b93-c4a3-46ea-a3da-20e8230bdeb7', 'vaccin (4)', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'b1', 'health'),
('f0076389-dc75-49ad-9614-da58a1a153e3', 'symptôme (4)', 'symptom', 'Quels sont vos symptômes ?', 'b1', 'health'),
('f325d6e7-2f95-4d6b-ab12-0495e4eb0af1', 'épicerie (4)', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'b1', 'daily_life'),
('f0045031-1227-4da2-9294-0bb39567edb7', 'transport (4)', 'transportation', 'Les transports en commun sont efficaces ici.', 'b1', 'daily_life'),
('be6ac7cd-967e-4414-9f7e-12826c6273bb', 'météo (4)', 'weather', 'Consultez la météo avant de sortir.', 'b1', 'daily_life'),
('dfb35ee5-aad2-4652-86ce-4eef256e098d', 'loisir (4)', 'leisure', 'Le sport est mon loisir préféré.', 'b1', 'daily_life'),
('f93c4d46-825d-4255-a6c0-fdd33c202b8c', 'voisin (4)', 'neighbor', 'Nos voisins sont très sympathiques.', 'b1', 'daily_life'),
('550f4fcb-af25-42ad-a9fa-11ceafd6bdf3', 'banque (4)', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'b1', 'daily_life'),
('e482a05f-3c0c-4e6b-a158-960bc44a4e09', 'courrier (4)', 'mail', 'Avez-vous reçu mon courrier ?', 'b1', 'daily_life'),
('33dc057d-309f-4ed1-8d44-fd8227290424', 'vêtement (4)', 'clothing', 'Portez des vêtements chauds en hiver.', 'b1', 'daily_life'),
('fca6e223-4009-491f-89ec-6892d352a513', 'nourriture (4)', 'food', 'La nourriture canadienne est variée.', 'b1', 'daily_life'),
('1ff0f391-3080-411d-9dd8-1e3c1d4877ef', 'famille (4)', 'family', 'Ma famille me manque beaucoup.', 'b1', 'daily_life'),
('60e5eb87-187c-431a-896d-56f6357d0792', 'citoyenneté (5)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'b1', 'immigration'),
('26829511-28b2-4e52-ba6e-f2bc1dc57acd', 'résidence (5)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'b1', 'immigration'),
('d694a991-db1a-4fdf-92d0-ef60abc8444d', 'visa (5)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'b1', 'immigration'),
('1cfc12b7-37fc-4ace-86eb-0609562e734b', 'frontière (5)', 'border', 'Le contrôle à la frontière a été très rapide.', 'b1', 'immigration'),
('462e71a3-ed6b-4580-9cc0-07efefe0ab04', 'intégration (5)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'b1', 'immigration'),
('925fd40d-dcbc-4688-8316-1753aa951b99', 'naturalisation (5)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'b1', 'immigration'),
('53d841a7-8bfa-45ff-a383-8414bf5a7d06', 'parrainage (5)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'b1', 'immigration'),
('59392eb7-7f4d-4576-bdfa-eeeb79958aeb', 'réfugié (5)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'b1', 'immigration'),
('3debbc2f-a5ec-4073-9bd1-4830676b8dcd', 'permis (5)', 'permit', 'Avez-vous un permis de travail valide ?', 'b1', 'immigration'),
('2c95dc3d-56cb-4716-8fe6-1fd51b670140', 'admissibilité (5)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'b1', 'immigration'),
('ea751346-edf3-45d9-bef1-81b13aedef19', 'embauche (5)', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'b1', 'work'),
('2ce691ac-9747-4823-80a7-052de961fb2a', 'chômage (5)', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'b1', 'work'),
('cfd32928-f62d-4860-a9fe-48c15b086cfe', 'salaire (5)', 'salary', 'Le salaire minimum varie selon la province.', 'b1', 'work'),
('63efca65-320b-4f8b-9c60-6aa94191feeb', 'compétence (5)', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'b1', 'work'),
('1d133080-2499-4204-a25c-29a5be0d0c9b', 'entretien (5)', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'b1', 'work'),
('8aae051a-a71a-40a4-a0e1-db8bcf1f70c8', 'cv (5)', 'resume', 'Envoyez votre CV par courriel.', 'b1', 'work'),
('a8708924-d84b-4bb7-8cf1-16db7dacb156', 'stage (5)', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'b1', 'work'),
('4caba254-d8b6-4dac-aa4f-06ede2ad9d21', 'retraite (5)', 'retirement', 'Il prendra sa retraite à 65 ans.', 'b1', 'work'),
('2ca1822c-63da-4a44-b4db-f3d3104f5a3b', 'syndicat (5)', 'union', 'Le syndicat négocie les conditions de travail.', 'b1', 'work'),
('1d76b72d-2355-4739-a07c-9df6b6c82ac9', 'carrière (5)', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'b1', 'work'),
('2c02bbd0-808c-449d-8e37-db810b06b9c1', 'diplôme (5)', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'b1', 'education'),
('c9a547da-239d-4658-9568-72529cef7c8b', 'bourse (5)', 'scholarship', 'Il a reçu une bourse pour ses études.', 'b1', 'education'),
('ce85084f-d527-445c-91d8-6bf0ecc504b3', 'inscription (5)', 'registration', 'La date limite d''inscription est demain.', 'b1', 'education'),
('5e3974ad-1298-4c1e-9bc1-e1646bf31e06', 'cours (5)', 'course', 'Je suis un cours de français intensif.', 'b1', 'education'),
('09739629-c67e-418a-aba8-bd96c68e6e4c', 'examen (5)', 'exam', 'L''examen final aura lieu dans le gymnase.', 'b1', 'education'),
('32e5d98a-417a-4a04-b23b-427accb5edae', 'apprentissage (5)', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'b1', 'education'),
('921bd52a-b73a-418f-b7bd-abcee51b313e', 'bibliothèque (5)', 'library', 'J''étudie souvent à la bibliothèque.', 'b1', 'education'),
('b9f9594b-152f-4386-838c-641372a46842', 'scolarité (5)', 'schooling', 'Les frais de scolarité sont élevés.', 'b1', 'education'),
('e6292c26-7e7f-472e-a4de-f2cff8854aff', 'enseignement (5)', 'teaching', 'L''enseignement est une profession valorisante.', 'b1', 'education'),
('4650fd8f-ffdd-45e1-902b-9e18a5487ca0', 'recherche (5)', 'research', 'Il travaille dans un laboratoire de recherche.', 'b1', 'education'),
('231f561c-2a7e-4257-a616-aa1b09ecc720', 'loyer (5)', 'rent', 'Le loyer est dû le premier du mois.', 'b1', 'housing'),
('0667c5d4-d646-458b-a663-9de1c40c79e7', 'bail (5)', 'lease', 'Nous avons signé un bail de douze mois.', 'b1', 'housing'),
('83975774-94b9-4695-9eb7-ad08fe92beb7', 'appartement (5)', 'apartment', 'Je cherche un appartement de deux chambres.', 'b1', 'housing'),
('fddd5b77-73fa-4536-a9f9-456bedf0253b', 'propriétaire (5)', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'b1', 'housing'),
('eac65642-d8f3-449a-ab2b-8f0b6f21ce1a', 'locataire (5)', 'tenant', 'Les locataires doivent respecter le calme.', 'b1', 'housing'),
('174fa3f3-25d7-4de5-bc48-026eed7cfb42', 'déménagement (5)', 'moving', 'Le déménagement est prévu pour samedi.', 'b1', 'housing'),
('b3828d4c-20b8-4ed4-89fc-e8b8dc9434e5', 'quartier (5)', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'b1', 'housing'),
('48884612-af2c-4c0b-8a02-26616416424d', 'meublé (5)', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'b1', 'housing'),
('64a88b96-d44a-41cc-b69a-881603333883', 'charges (5)', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'b1', 'housing'),
('515d57af-bfa6-48c9-8bef-2749a3a2f317', 'hypothèque (5)', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'b1', 'housing'),
('41899d24-656f-4d13-83cd-0b0e4a6378ac', 'médecin (5)', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'b1', 'health'),
('712b05c7-4bb4-4174-8b30-71aa9f9613d2', 'hôpital (5)', 'hospital', 'L''hôpital est situé au centre-ville.', 'b1', 'health'),
('e71c9998-1dda-4cf1-967d-095c4b98c05c', 'ordonnance (5)', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'b1', 'health'),
('0cb434ff-d409-44bb-a323-68b92389c4f6', 'assurance (5)', 'insurance', 'L''assurance maladie est obligatoire.', 'b1', 'health'),
('a199e8db-884f-46e1-8da6-8accacac60dc', 'santé (5)', 'health', 'La santé est le bien le plus précieux.', 'b1', 'health'),
('3471ed40-82f3-49ce-a6fe-c46497c40868', 'urgence (5)', 'emergency', 'En cas d''urgence, appelez le 911.', 'b1', 'health'),
('4c333436-d94e-49f9-9b99-2cd490f0161b', 'traitement (5)', 'treatment', 'Ce traitement est très efficace.', 'b1', 'health'),
('8c4ee301-debc-4da4-8cd5-168e6b8b98d8', 'douleur (5)', 'pain', 'Où ressentez-vous la douleur ?', 'b1', 'health'),
('6bea8a96-64a0-4e8d-a8df-c8a93fe5df55', 'vaccin (5)', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'b1', 'health'),
('8c48c23b-cb1a-4614-bdff-8e205de84799', 'symptôme (5)', 'symptom', 'Quels sont vos symptômes ?', 'b1', 'health'),
('e19a4d57-a49f-4758-90b4-a8e069efb628', 'épicerie (5)', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'b1', 'daily_life'),
('10028576-3774-487a-bfca-2915e3a45058', 'transport (5)', 'transportation', 'Les transports en commun sont efficaces ici.', 'b1', 'daily_life'),
('bafbe8db-b7e9-45a7-b8ec-ac28be41a1e0', 'météo (5)', 'weather', 'Consultez la météo avant de sortir.', 'b1', 'daily_life'),
('e1a2c016-b367-418d-8ce1-73140866d508', 'loisir (5)', 'leisure', 'Le sport est mon loisir préféré.', 'b1', 'daily_life'),
('9df1b37b-768f-47de-aeea-99e407951012', 'voisin (5)', 'neighbor', 'Nos voisins sont très sympathiques.', 'b1', 'daily_life'),
('4a2c4fd3-7ece-47e4-b7d6-0e8f27506b68', 'banque (5)', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'b1', 'daily_life'),
('24cdf1c1-66a8-41a8-b115-f73586df97c1', 'courrier (5)', 'mail', 'Avez-vous reçu mon courrier ?', 'b1', 'daily_life'),
('0be755df-3d78-4cf6-8941-88ae1104ded4', 'vêtement (5)', 'clothing', 'Portez des vêtements chauds en hiver.', 'b1', 'daily_life'),
('c8ec5a2a-7d72-4cbc-903b-05229cb8f2f7', 'nourriture (5)', 'food', 'La nourriture canadienne est variée.', 'b1', 'daily_life'),
('516c275c-35a5-40de-9ded-4f27ad03c154', 'famille (5)', 'family', 'Ma famille me manque beaucoup.', 'b1', 'daily_life'),
('e01488a0-810f-42c4-b304-8df9684489e4', 'citoyenneté (6)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'b1', 'immigration'),
('f67953bb-b850-49ce-a08c-5a5b443936b5', 'résidence (6)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'b1', 'immigration'),
('5fe899f2-8d08-45a4-a388-72dabeec73ca', 'visa (6)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'b1', 'immigration'),
('cd6ad6cc-3741-43e8-8528-6e56651b04d8', 'frontière (6)', 'border', 'Le contrôle à la frontière a été très rapide.', 'b1', 'immigration'),
('a1fe8fe7-32c6-495d-ad70-d02013f8cb16', 'intégration (6)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'b1', 'immigration'),
('8e0a4cae-3343-4243-a8fd-0a2c5741f85b', 'naturalisation (6)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'b1', 'immigration'),
('a9c67647-9447-49d5-be62-f3978b25051c', 'parrainage (6)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'b1', 'immigration'),
('781632e1-d381-4c43-8a07-b08e591d8e1f', 'réfugié (6)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'b1', 'immigration'),
('15e90bfa-9597-4926-9b91-7534b7cee7b7', 'permis (6)', 'permit', 'Avez-vous un permis de travail valide ?', 'b1', 'immigration'),
('de7f609e-a505-4c0c-8170-7b9083435c7e', 'admissibilité (6)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'b1', 'immigration'),
('c5e436de-782a-47c7-8929-4479d4a11680', 'embauche (6)', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'b1', 'work'),
('69d340e4-7e26-488f-894c-8ef4e20c737c', 'chômage (6)', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'b1', 'work'),
('3046f54b-f7c0-4661-8cb3-09617fcd6a4c', 'salaire (6)', 'salary', 'Le salaire minimum varie selon la province.', 'b1', 'work'),
('d615f21c-efe5-416c-8004-0282c2ae7753', 'compétence (6)', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'b1', 'work'),
('20a22dbe-7f41-47db-b759-381d68828b56', 'entretien (6)', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'b1', 'work'),
('280a7d51-5763-4782-aabd-f0247d529e10', 'cv (6)', 'resume', 'Envoyez votre CV par courriel.', 'b1', 'work'),
('aad1c9b7-f26f-4592-8a32-d0565409c8d1', 'stage (6)', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'b1', 'work'),
('8c62dd9c-544a-4f70-88ee-8e1a51973f2b', 'retraite (6)', 'retirement', 'Il prendra sa retraite à 65 ans.', 'b1', 'work'),
('b474ef80-5f7c-4a53-8564-4cb26c25b09c', 'syndicat (6)', 'union', 'Le syndicat négocie les conditions de travail.', 'b1', 'work'),
('3e3f80db-64af-4b74-88b8-6dcabe394d93', 'carrière (6)', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'b1', 'work'),
('59bb0644-83d5-42f1-8deb-372cc7fcce9c', 'diplôme (6)', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'b1', 'education'),
('77cb4f62-779c-4d2d-9793-55252d3ca7d6', 'bourse (6)', 'scholarship', 'Il a reçu une bourse pour ses études.', 'b1', 'education'),
('9c3088d9-6c9b-4cc6-8c7c-ba8a07d6906f', 'inscription (6)', 'registration', 'La date limite d''inscription est demain.', 'b1', 'education'),
('89f3b962-c92a-4b88-aa7b-e306b6f68391', 'cours (6)', 'course', 'Je suis un cours de français intensif.', 'b1', 'education'),
('c2bc9250-d909-4461-9475-ba422371b026', 'examen (6)', 'exam', 'L''examen final aura lieu dans le gymnase.', 'b1', 'education'),
('5aa17e86-c87f-4c21-9b9f-03c510ee5850', 'apprentissage (6)', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'b1', 'education'),
('131262ac-a1ea-4f4e-8b37-ffef72471e5e', 'bibliothèque (6)', 'library', 'J''étudie souvent à la bibliothèque.', 'b1', 'education'),
('de8edc3f-46ea-407f-920c-33fe3acaf9d3', 'scolarité (6)', 'schooling', 'Les frais de scolarité sont élevés.', 'b1', 'education'),
('f336f399-7e36-4001-a8d0-5bef184302a7', 'enseignement (6)', 'teaching', 'L''enseignement est une profession valorisante.', 'b1', 'education'),
('092d0260-88c2-4788-9b16-b0d06adb7fde', 'recherche (6)', 'research', 'Il travaille dans un laboratoire de recherche.', 'b1', 'education'),
('d935f9b8-26e4-42a2-bfd6-29fa25066ad8', 'loyer (6)', 'rent', 'Le loyer est dû le premier du mois.', 'b2', 'housing'),
('901abee5-ff36-434e-ad31-c7679208e0cb', 'bail (6)', 'lease', 'Nous avons signé un bail de douze mois.', 'b2', 'housing'),
('272f6c4f-15a1-4e30-b73d-1c3d8d44ba9c', 'appartement (6)', 'apartment', 'Je cherche un appartement de deux chambres.', 'b2', 'housing'),
('71dad23a-4d44-4f41-9d25-c2ba9e0c833b', 'propriétaire (6)', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'b2', 'housing'),
('f4c7f5ee-4d08-48f3-a4ba-307336137d79', 'locataire (6)', 'tenant', 'Les locataires doivent respecter le calme.', 'b2', 'housing'),
('6decf9b3-8558-4643-989f-b44726c296b8', 'déménagement (6)', 'moving', 'Le déménagement est prévu pour samedi.', 'b2', 'housing'),
('6dcafe59-949e-4ea2-85e7-3cbdb148e9a4', 'quartier (6)', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'b2', 'housing'),
('ca45c7f1-ad25-479f-a731-ae356e50bc74', 'meublé (6)', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'b2', 'housing'),
('0a786179-f8d4-47a3-8eed-3f1b29627987', 'charges (6)', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'b2', 'housing'),
('6dbddaea-0fea-4170-bebe-7f1958831080', 'hypothèque (6)', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'b2', 'housing'),
('203eb312-58d5-4a69-bb8a-f429b9d45a36', 'médecin (6)', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'b2', 'health'),
('f55bee52-1fa9-44f1-8ff5-8ef806c72011', 'hôpital (6)', 'hospital', 'L''hôpital est situé au centre-ville.', 'b2', 'health'),
('9c6432ae-0537-4b38-83ae-1da1d1594748', 'ordonnance (6)', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'b2', 'health'),
('2b9abebe-83c0-43b0-9fb2-bb327276a78d', 'assurance (6)', 'insurance', 'L''assurance maladie est obligatoire.', 'b2', 'health'),
('bd970e6d-dcb0-45f6-80fa-1b7abfc2e7de', 'santé (6)', 'health', 'La santé est le bien le plus précieux.', 'b2', 'health'),
('58e919a9-1630-42e4-8996-601dc84044d8', 'urgence (6)', 'emergency', 'En cas d''urgence, appelez le 911.', 'b2', 'health'),
('9d9cc2be-a2f1-426e-8b02-37d4c3445a79', 'traitement (6)', 'treatment', 'Ce traitement est très efficace.', 'b2', 'health'),
('a207ea3e-78a5-45d9-9436-895888747666', 'douleur (6)', 'pain', 'Où ressentez-vous la douleur ?', 'b2', 'health'),
('f6e188f9-361b-419a-a302-3728b8b5625f', 'vaccin (6)', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'b2', 'health'),
('3caffbdc-23cb-436f-bae0-e8305322fc16', 'symptôme (6)', 'symptom', 'Quels sont vos symptômes ?', 'b2', 'health'),
('9d8bf8b1-54be-42a9-b077-3faa885d7f06', 'épicerie (6)', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'b2', 'daily_life'),
('fe000b6a-665c-4ee8-80a5-51880d3be4ec', 'transport (6)', 'transportation', 'Les transports en commun sont efficaces ici.', 'b2', 'daily_life'),
('667df457-be0b-4c65-a42d-1d7b31fd85e5', 'météo (6)', 'weather', 'Consultez la météo avant de sortir.', 'b2', 'daily_life'),
('5f2841da-7707-416e-a3b8-b6e3c455d359', 'loisir (6)', 'leisure', 'Le sport est mon loisir préféré.', 'b2', 'daily_life'),
('9384783c-d607-43e1-8356-c99f84be801b', 'voisin (6)', 'neighbor', 'Nos voisins sont très sympathiques.', 'b2', 'daily_life'),
('a0d3352c-9136-4a27-903a-ee321f6619e5', 'banque (6)', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'b2', 'daily_life'),
('3acf71b2-bf1a-423e-a59b-38f5112794d7', 'courrier (6)', 'mail', 'Avez-vous reçu mon courrier ?', 'b2', 'daily_life'),
('b1e04d7c-7307-46ac-a9fa-d3bf8a4c0bc9', 'vêtement (6)', 'clothing', 'Portez des vêtements chauds en hiver.', 'b2', 'daily_life'),
('d5f304dc-36f7-49c7-b3c0-5efb5786ab70', 'nourriture (6)', 'food', 'La nourriture canadienne est variée.', 'b2', 'daily_life'),
('cdd601ed-0ede-45ec-a79b-ca51d8da727f', 'famille (6)', 'family', 'Ma famille me manque beaucoup.', 'b2', 'daily_life'),
('3606d8d8-d090-42bc-a65d-0d794411d39a', 'citoyenneté (7)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'b2', 'immigration'),
('315c0341-583d-4658-b412-d5aaf429d1a2', 'résidence (7)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'b2', 'immigration'),
('45bb697e-6944-439b-8a4b-ab7a3d815f53', 'visa (7)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'b2', 'immigration'),
('2669a309-6e77-406f-943a-c0729eafea5d', 'frontière (7)', 'border', 'Le contrôle à la frontière a été très rapide.', 'b2', 'immigration'),
('2eae58b5-a784-40f0-b931-5fc09185bfa4', 'intégration (7)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'b2', 'immigration'),
('daa065f8-7637-42dc-a1c0-ec6fb7db935b', 'naturalisation (7)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'b2', 'immigration'),
('1f760de6-f5e4-44dc-baa0-46a76d5379e8', 'parrainage (7)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'b2', 'immigration'),
('f6fcbc25-d35c-48d1-99e8-b85f568301ac', 'réfugié (7)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'b2', 'immigration'),
('a51c572d-c983-46a3-a67a-bcc12db76a6f', 'permis (7)', 'permit', 'Avez-vous un permis de travail valide ?', 'b2', 'immigration'),
('05c3f2a0-0582-44f8-8300-e02001f3f7d0', 'admissibilité (7)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'b2', 'immigration'),
('3f11dc06-ead6-4c26-b4d4-fd7903aa6b7f', 'embauche (7)', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'b2', 'work'),
('aa8fddc5-5ca7-4358-b79c-373fe05b8ea4', 'chômage (7)', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'b2', 'work'),
('be2862f1-32af-44c1-9935-81e533cb6744', 'salaire (7)', 'salary', 'Le salaire minimum varie selon la province.', 'b2', 'work'),
('0d6a7fd9-c729-41cd-9071-510e76c5766f', 'compétence (7)', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'b2', 'work'),
('ad22c608-2711-4864-8cdd-f42da9b13c38', 'entretien (7)', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'b2', 'work'),
('5e77d0be-1c98-4880-a6ab-f741d48aecf8', 'cv (7)', 'resume', 'Envoyez votre CV par courriel.', 'b2', 'work'),
('970576bc-9092-477d-af57-2087882f5b63', 'stage (7)', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'b2', 'work'),
('b98dbbff-f914-4163-b6b0-ccaea1d64189', 'retraite (7)', 'retirement', 'Il prendra sa retraite à 65 ans.', 'b2', 'work'),
('e6595cd5-f958-4626-ad3a-ae4996126bce', 'syndicat (7)', 'union', 'Le syndicat négocie les conditions de travail.', 'b2', 'work'),
('1a033f23-a734-49ac-8d93-ff5efb54d833', 'carrière (7)', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'b2', 'work'),
('47ebbe2f-c4a0-498d-9836-580f311f1546', 'diplôme (7)', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'b2', 'education'),
('9979596f-b551-4c8f-9782-1e76c4afc766', 'bourse (7)', 'scholarship', 'Il a reçu une bourse pour ses études.', 'b2', 'education'),
('5d2a6cef-9174-45e4-88b0-477d4a3c5e7f', 'inscription (7)', 'registration', 'La date limite d''inscription est demain.', 'b2', 'education'),
('bc2921f4-eb5b-4c54-b1d6-e87d96ee2b6b', 'cours (7)', 'course', 'Je suis un cours de français intensif.', 'b2', 'education'),
('f725fd2b-1ed2-4fa6-831c-e1c183576c69', 'examen (7)', 'exam', 'L''examen final aura lieu dans le gymnase.', 'b2', 'education'),
('c5a017a1-d88f-4319-ac19-350875650b69', 'apprentissage (7)', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'b2', 'education'),
('459c1566-e5b7-424b-95fb-058005f5140b', 'bibliothèque (7)', 'library', 'J''étudie souvent à la bibliothèque.', 'b2', 'education'),
('49696c5c-b2b2-413e-b63d-934a956dd1b6', 'scolarité (7)', 'schooling', 'Les frais de scolarité sont élevés.', 'b2', 'education'),
('ec780aca-ed23-45a6-93aa-57a0b0aee895', 'enseignement (7)', 'teaching', 'L''enseignement est une profession valorisante.', 'b2', 'education'),
('03be2f2c-b0db-44e5-a685-86074bfff8fa', 'recherche (7)', 'research', 'Il travaille dans un laboratoire de recherche.', 'b2', 'education'),
('7fa9be3a-87f7-4d25-ba63-bd82efe4e368', 'loyer (7)', 'rent', 'Le loyer est dû le premier du mois.', 'b2', 'housing'),
('e27d5536-616a-4529-abca-7f9fa22818a3', 'bail (7)', 'lease', 'Nous avons signé un bail de douze mois.', 'b2', 'housing'),
('0569ad6a-9a7b-4ae1-b848-05ede607ef44', 'appartement (7)', 'apartment', 'Je cherche un appartement de deux chambres.', 'b2', 'housing'),
('ee9674f3-b3a7-476a-9cc6-8ab3cd551c1a', 'propriétaire (7)', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'b2', 'housing'),
('7d0b6be6-e9d1-472d-b067-ddd35276f6a1', 'locataire (7)', 'tenant', 'Les locataires doivent respecter le calme.', 'b2', 'housing'),
('13ff55cc-a1dc-4bc4-bb47-c89dbc0a8fac', 'déménagement (7)', 'moving', 'Le déménagement est prévu pour samedi.', 'b2', 'housing'),
('c3113450-ef77-4e11-bf1a-c2157328f14d', 'quartier (7)', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'b2', 'housing'),
('a74c791d-3e26-4cea-8107-b7c227242c56', 'meublé (7)', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'b2', 'housing'),
('52003abc-0d9a-46c8-b0f8-e8e41d3d2aa7', 'charges (7)', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'b2', 'housing'),
('f7e0692e-bbc0-412c-a061-45aa6806c723', 'hypothèque (7)', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'b2', 'housing'),
('ecdc47d7-a5e5-46be-9a2f-1ba7972d1b63', 'médecin (7)', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'b2', 'health'),
('902b4655-8df2-4f47-8995-862777dcac29', 'hôpital (7)', 'hospital', 'L''hôpital est situé au centre-ville.', 'b2', 'health'),
('28c47acb-2c24-41b3-9e78-a0cd8eea636d', 'ordonnance (7)', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'b2', 'health'),
('c4702d83-1a0a-4a03-8187-140b1a89ba32', 'assurance (7)', 'insurance', 'L''assurance maladie est obligatoire.', 'b2', 'health'),
('d9238f8c-e5bc-48b4-8c9f-c766aa5ebf31', 'santé (7)', 'health', 'La santé est le bien le plus précieux.', 'b2', 'health'),
('72c9919a-b116-4ce7-9c50-71f1d5832b60', 'urgence (7)', 'emergency', 'En cas d''urgence, appelez le 911.', 'b2', 'health'),
('2635c65e-7196-4b5f-a711-e22e56282901', 'traitement (7)', 'treatment', 'Ce traitement est très efficace.', 'b2', 'health'),
('f70eac5e-d1a2-438c-bd8a-496945ddf585', 'douleur (7)', 'pain', 'Où ressentez-vous la douleur ?', 'b2', 'health'),
('dd735be2-9936-445b-9288-21e20ac317a3', 'vaccin (7)', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'b2', 'health'),
('b138f1b6-02ce-44fb-84c7-879f44d3bf5b', 'symptôme (7)', 'symptom', 'Quels sont vos symptômes ?', 'b2', 'health'),
('ced53dbf-2e75-4a82-bdb8-0b67bb35a56f', 'épicerie (7)', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'b2', 'daily_life'),
('583e199e-4528-461a-8ce6-b3baee6b90ff', 'transport (7)', 'transportation', 'Les transports en commun sont efficaces ici.', 'b2', 'daily_life'),
('fcaaa84a-4101-4f3e-b25b-dfa451c2a34e', 'météo (7)', 'weather', 'Consultez la météo avant de sortir.', 'b2', 'daily_life'),
('f248c6f4-df72-4471-a293-eff62a13f80b', 'loisir (7)', 'leisure', 'Le sport est mon loisir préféré.', 'b2', 'daily_life'),
('688c47bc-a1a2-431a-a220-c23d8976fca8', 'voisin (7)', 'neighbor', 'Nos voisins sont très sympathiques.', 'b2', 'daily_life'),
('f287b2df-ee62-420a-b57b-40f2961da86a', 'banque (7)', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'b2', 'daily_life'),
('6a8fbf76-2ddb-41c7-b8e4-31302aaa0922', 'courrier (7)', 'mail', 'Avez-vous reçu mon courrier ?', 'b2', 'daily_life'),
('9d3a6238-ddee-40da-8e81-4af80e2bbc07', 'vêtement (7)', 'clothing', 'Portez des vêtements chauds en hiver.', 'b2', 'daily_life'),
('05244822-f41a-4c9a-aca0-39d2fed38e85', 'nourriture (7)', 'food', 'La nourriture canadienne est variée.', 'b2', 'daily_life'),
('996c9354-5303-41e6-aff2-68eaf5e29ac0', 'famille (7)', 'family', 'Ma famille me manque beaucoup.', 'b2', 'daily_life'),
('870876ea-3765-4c1d-9f11-53002aeb4b42', 'citoyenneté (8)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'b2', 'immigration'),
('e9dab546-9f0a-4b84-90b7-240372a1d2d9', 'résidence (8)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'b2', 'immigration'),
('29428e6f-f83f-45dc-a584-2d9277c55983', 'visa (8)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'b2', 'immigration'),
('f1c53768-9fc1-4277-9048-a4ff9038179d', 'frontière (8)', 'border', 'Le contrôle à la frontière a été très rapide.', 'b2', 'immigration'),
('73b23383-4f72-4221-b9ab-e584eb31d3b0', 'intégration (8)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'b2', 'immigration'),
('dd66bee9-01e3-40d1-b978-3c64c6e80f38', 'naturalisation (8)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'b2', 'immigration'),
('58d6b110-80d0-4cea-be61-3a5b9ca3d030', 'parrainage (8)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'b2', 'immigration'),
('bc1f42b4-b53c-4094-b794-35bb580dabc5', 'réfugié (8)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'b2', 'immigration'),
('629608e3-1d4e-4183-97cc-9dbc70d89a6f', 'permis (8)', 'permit', 'Avez-vous un permis de travail valide ?', 'b2', 'immigration'),
('ee71eaca-a0b5-4347-99da-d96e3858584b', 'admissibilité (8)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'b2', 'immigration'),
('299574a6-0081-47e3-ab87-755a5fa63428', 'embauche (8)', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'b2', 'work'),
('25ff4461-992a-4585-851f-7d3d7f5e7b21', 'chômage (8)', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'b2', 'work'),
('7ec095c4-f07a-472a-9429-0b75ba75e603', 'salaire (8)', 'salary', 'Le salaire minimum varie selon la province.', 'b2', 'work'),
('6e795562-63a4-4a51-b533-e31ca582a9d1', 'compétence (8)', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'b2', 'work'),
('d775b5f8-a0c7-4694-a4be-e98b639f717e', 'entretien (8)', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'b2', 'work'),
('b5baab11-2912-4e3e-83fa-02a3e1bc5a0e', 'cv (8)', 'resume', 'Envoyez votre CV par courriel.', 'b2', 'work'),
('7443bd22-7ca0-44bf-9021-7ba17278651a', 'stage (8)', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'b2', 'work'),
('1aa35a4e-9cf6-4c2e-b56e-a1f9e4c295cb', 'retraite (8)', 'retirement', 'Il prendra sa retraite à 65 ans.', 'b2', 'work'),
('2b186e6d-cedb-470e-93d1-2a73e700cd35', 'syndicat (8)', 'union', 'Le syndicat négocie les conditions de travail.', 'b2', 'work'),
('720a3d97-6ecd-4a02-afcf-fe6d187a281b', 'carrière (8)', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'b2', 'work'),
('b8e262d9-d787-470d-9218-c450f17e449f', 'diplôme (8)', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'c1', 'education'),
('957b1ef5-fe58-4431-a74f-6bac76406f1f', 'bourse (8)', 'scholarship', 'Il a reçu une bourse pour ses études.', 'c1', 'education'),
('feac4274-81ee-4a6a-9112-74aaed2a3655', 'inscription (8)', 'registration', 'La date limite d''inscription est demain.', 'c1', 'education'),
('4f219c8d-37a6-401f-bb64-585e07bf9f0d', 'cours (8)', 'course', 'Je suis un cours de français intensif.', 'c1', 'education'),
('314fa902-a30f-4a67-8cbc-3d07cb54c349', 'examen (8)', 'exam', 'L''examen final aura lieu dans le gymnase.', 'c1', 'education'),
('4d83a4e3-ca29-435d-85f4-26625579412d', 'apprentissage (8)', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'c1', 'education'),
('c9fde1aa-27b6-49cc-a33e-e1f5b948dc44', 'bibliothèque (8)', 'library', 'J''étudie souvent à la bibliothèque.', 'c1', 'education'),
('b22b7f4e-f9ff-40e2-a9cc-de2830f443fb', 'scolarité (8)', 'schooling', 'Les frais de scolarité sont élevés.', 'c1', 'education'),
('dfaa50f5-0617-4799-b58a-3aa368bd5e3b', 'enseignement (8)', 'teaching', 'L''enseignement est une profession valorisante.', 'c1', 'education'),
('4c30d526-5dfb-436a-a33f-59ee237f5608', 'recherche (8)', 'research', 'Il travaille dans un laboratoire de recherche.', 'c1', 'education'),
('c283fd3b-1677-4f59-8802-88f1dc48c711', 'loyer (8)', 'rent', 'Le loyer est dû le premier du mois.', 'c1', 'housing'),
('fb1685d3-12c9-4fb0-bc92-ecff52c852fd', 'bail (8)', 'lease', 'Nous avons signé un bail de douze mois.', 'c1', 'housing'),
('7cd5b96f-e14b-4d28-a4b4-0b77cb4ce35f', 'appartement (8)', 'apartment', 'Je cherche un appartement de deux chambres.', 'c1', 'housing'),
('df2fecc5-0ce0-406c-95ac-f41a434a538c', 'propriétaire (8)', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'c1', 'housing'),
('76392418-2061-4349-b5ac-dc7c05a72a3d', 'locataire (8)', 'tenant', 'Les locataires doivent respecter le calme.', 'c1', 'housing'),
('40783730-f236-4ec3-a79c-2f4e6440eb25', 'déménagement (8)', 'moving', 'Le déménagement est prévu pour samedi.', 'c1', 'housing'),
('0b74fd28-39d2-442a-8519-e1a023cd65b0', 'quartier (8)', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'c1', 'housing'),
('a8897238-db77-4927-984a-cdf052ed0ab3', 'meublé (8)', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'c1', 'housing'),
('87487d47-059f-4636-86e7-dd9caa20c43e', 'charges (8)', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'c1', 'housing'),
('9475a214-a8e8-44c1-98e9-696d7bdbf067', 'hypothèque (8)', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'c1', 'housing'),
('69a05f2b-1f2d-4a06-a173-c49b20bd1953', 'médecin (8)', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'c1', 'health'),
('c680247a-bf78-4178-a07e-a4e3c626c005', 'hôpital (8)', 'hospital', 'L''hôpital est situé au centre-ville.', 'c1', 'health'),
('297639db-3b90-454b-939d-f45769030245', 'ordonnance (8)', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'c1', 'health'),
('595c1593-3c3d-4f0f-b940-d4d55a421152', 'assurance (8)', 'insurance', 'L''assurance maladie est obligatoire.', 'c1', 'health'),
('6764caff-7f71-4be9-9249-0d35bfbce431', 'santé (8)', 'health', 'La santé est le bien le plus précieux.', 'c1', 'health'),
('52fee8b7-f07b-4117-9585-dc0536f9ea8e', 'urgence (8)', 'emergency', 'En cas d''urgence, appelez le 911.', 'c1', 'health'),
('07ed22f2-81bf-4ea0-8b7e-cec3295bcf48', 'traitement (8)', 'treatment', 'Ce traitement est très efficace.', 'c1', 'health'),
('03e8450b-ca58-4edb-9118-423ff088af4e', 'douleur (8)', 'pain', 'Où ressentez-vous la douleur ?', 'c1', 'health'),
('91945cb3-ccf2-4040-94e7-a29512dd51e4', 'vaccin (8)', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'c1', 'health'),
('c8dc5045-3b3e-44c6-8190-2de8c7ab9116', 'symptôme (8)', 'symptom', 'Quels sont vos symptômes ?', 'c1', 'health'),
('079e73a9-e2d5-4ea3-9ed4-517f287e4876', 'épicerie (8)', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'c1', 'daily_life'),
('403c2833-6bed-4590-874a-4d4a18c21fa9', 'transport (8)', 'transportation', 'Les transports en commun sont efficaces ici.', 'c1', 'daily_life'),
('2cbb5906-cc89-4341-a1d6-644f984a94ba', 'météo (8)', 'weather', 'Consultez la météo avant de sortir.', 'c1', 'daily_life'),
('641f142d-d04e-4ab3-958b-7ac1bba63d1a', 'loisir (8)', 'leisure', 'Le sport est mon loisir préféré.', 'c1', 'daily_life'),
('f32b658b-d775-47d9-a148-18f26e7b741d', 'voisin (8)', 'neighbor', 'Nos voisins sont très sympathiques.', 'c1', 'daily_life'),
('1dbc887d-f1c1-428d-9cfd-de8c8b6a2277', 'banque (8)', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'c1', 'daily_life'),
('eb0f460e-fdad-43bf-884f-7dcd8780cd2c', 'courrier (8)', 'mail', 'Avez-vous reçu mon courrier ?', 'c1', 'daily_life'),
('287626f5-8f2d-4c40-b402-ecfe9fe9028b', 'vêtement (8)', 'clothing', 'Portez des vêtements chauds en hiver.', 'c1', 'daily_life'),
('822ac6ed-7bc4-43b4-b349-ffd3508af02a', 'nourriture (8)', 'food', 'La nourriture canadienne est variée.', 'c1', 'daily_life'),
('9bd1c891-ed50-4ead-ba19-cdfb07f397b7', 'famille (8)', 'family', 'Ma famille me manque beaucoup.', 'c1', 'daily_life'),
('639ff4af-e90f-4667-8932-c4bb9f673122', 'citoyenneté (9)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'c1', 'immigration'),
('988f0160-fd97-4797-9c36-1dc8ca65f079', 'résidence (9)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'c1', 'immigration'),
('9e9eabd0-d9d0-4433-82fe-48ae1bf0cb9d', 'visa (9)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'c1', 'immigration'),
('73ec016e-7730-42d1-b187-4dfb170d6ebd', 'frontière (9)', 'border', 'Le contrôle à la frontière a été très rapide.', 'c1', 'immigration'),
('dd4a8474-5a53-4de9-be65-cf378a8d24a1', 'intégration (9)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'c1', 'immigration'),
('b4c684d6-8cdb-435a-a984-b14baeb74525', 'naturalisation (9)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'c1', 'immigration'),
('a87e99e6-b5f3-4d19-9dfb-a3117776f4c4', 'parrainage (9)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'c1', 'immigration'),
('c3a334dc-a14e-47d5-8946-45f527fcd5ba', 'réfugié (9)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'c1', 'immigration'),
('c7baac2c-600c-41ed-947b-133178b05fcb', 'permis (9)', 'permit', 'Avez-vous un permis de travail valide ?', 'c1', 'immigration'),
('4a5d97b0-2af1-4d45-ad06-001790daf128', 'admissibilité (9)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'c1', 'immigration'),
('7a8267a7-ed76-471e-b8bc-bfa5963c253a', 'embauche (9)', 'hiring', 'Cette entreprise prévoit l''embauche de dix nouveaux employés.', 'c1', 'work'),
('06055f4f-40eb-4915-9b2e-f7043b095c51', 'chômage (9)', 'unemployment', 'Le taux de chômage est bas dans cette région.', 'c1', 'work'),
('70007dda-a1de-4478-82ef-4f080d6a937c', 'salaire (9)', 'salary', 'Le salaire minimum varie selon la province.', 'c1', 'work'),
('8d14d949-5a5a-4beb-88ad-d85d694b60aa', 'compétence (9)', 'skill', 'Il possède les compétences nécessaires pour ce poste.', 'c1', 'work'),
('207cdef7-c216-4497-84f3-77257a64a0c5', 'entretien (9)', 'interview', 'Mon entretien d''embauche s''est bien passé.', 'c1', 'work'),
('d2fd0831-f236-4914-a587-40a68031b6c4', 'cv (9)', 'resume', 'Envoyez votre CV par courriel.', 'c1', 'work'),
('0bdea5b3-9588-4226-a816-c7fe8b0786aa', 'stage (9)', 'internship', 'Elle a fait un stage de trois mois à Montréal.', 'c1', 'work'),
('20c11054-eaa6-4644-a169-e73c82de80ca', 'retraite (9)', 'retirement', 'Il prendra sa retraite à 65 ans.', 'c1', 'work'),
('d85e44b7-bd65-4037-a181-0b110a8eefb2', 'syndicat (9)', 'union', 'Le syndicat négocie les conditions de travail.', 'c1', 'work'),
('28699e47-4a87-4ad1-9d01-8151b3fb409c', 'carrière (9)', 'career', 'Il souhaite faire carrière dans l''enseignement.', 'c1', 'work'),
('a64c429a-7730-4899-9904-0ab3a2209692', 'diplôme (9)', 'degree/diploma', 'Elle a obtenu son diplôme universitaire en juin.', 'c1', 'education'),
('f7231703-a3c7-4d1e-888c-fff5d6d10e87', 'bourse (9)', 'scholarship', 'Il a reçu une bourse pour ses études.', 'c1', 'education'),
('b0a00621-6c85-4f8d-a3d8-de14fa4d03b4', 'inscription (9)', 'registration', 'La date limite d''inscription est demain.', 'c1', 'education'),
('6534bf94-45e8-4f46-9494-2b0d90f1e270', 'cours (9)', 'course', 'Je suis un cours de français intensif.', 'c1', 'education'),
('e8b85e41-66bc-4bf0-9eaa-693bbd2abdb3', 'examen (9)', 'exam', 'L''examen final aura lieu dans le gymnase.', 'c1', 'education'),
('d4fe8750-da61-4c39-9ebc-46e3b2adcb1e', 'apprentissage (9)', 'learning', 'L''apprentissage d''une langue demande de la patience.', 'c1', 'education'),
('c2f6712a-9bd4-4332-97ba-e487f04dc8b7', 'bibliothèque (9)', 'library', 'J''étudie souvent à la bibliothèque.', 'c1', 'education'),
('912a3223-ba30-4817-b9fd-f672963acc81', 'scolarité (9)', 'schooling', 'Les frais de scolarité sont élevés.', 'c1', 'education'),
('cfeb39ac-0bb2-4244-b86e-1ac61f2f9c6d', 'enseignement (9)', 'teaching', 'L''enseignement est une profession valorisante.', 'c1', 'education'),
('9abfd2eb-0c34-440d-8f9e-8fbd3f3fb641', 'recherche (9)', 'research', 'Il travaille dans un laboratoire de recherche.', 'c1', 'education'),
('69727cc1-1328-4e14-8cd1-c819c916b214', 'loyer (9)', 'rent', 'Le loyer est dû le premier du mois.', 'c1', 'housing'),
('0403eb44-0980-40ae-8945-cec4ef9d1052', 'bail (9)', 'lease', 'Nous avons signé un bail de douze mois.', 'c1', 'housing'),
('0f0966b7-391a-4ee5-af83-d3ed53554207', 'appartement (9)', 'apartment', 'Je cherche un appartement de deux chambres.', 'c1', 'housing'),
('94d987dc-17d3-4c37-8f42-1a2ed30723c3', 'propriétaire (9)', 'landlord', 'Le propriétaire doit réparer le chauffage.', 'c1', 'housing'),
('d2c660e8-39e6-42c9-a9aa-a3037e729cb9', 'locataire (9)', 'tenant', 'Les locataires doivent respecter le calme.', 'c1', 'housing'),
('c23729ab-2a6f-48e0-a73d-cb4e941be212', 'déménagement (9)', 'moving', 'Le déménagement est prévu pour samedi.', 'c1', 'housing'),
('1fc95767-40c0-430e-ad46-c128251cbfeb', 'quartier (9)', 'neighborhood', 'C''est un quartier très calme et sécuritaire.', 'c1', 'housing'),
('11eeccb5-299f-4013-9e3f-914622db7b16', 'meublé (9)', 'furnished', 'Est-ce que l''appartement est loué meublé ?', 'c1', 'housing'),
('181b6a42-fb56-4bcf-8b54-a5b59d4f67ae', 'charges (9)', 'utilities/fees', 'Les charges sont comprises dans le loyer.', 'c1', 'housing'),
('0e6a1a26-e052-414d-bdfc-e1ee27a4ab5c', 'hypothèque (9)', 'mortgage', 'Ils ont contracté une hypothèque pour leur maison.', 'c1', 'housing'),
('1528561d-aaa9-43cf-a0c4-13e128b3fec5', 'médecin (9)', 'doctor', 'Je dois prendre rendez-vous chez le médecin.', 'c1', 'health'),
('2ad42665-2af7-4f39-9832-7674e487d940', 'hôpital (9)', 'hospital', 'L''hôpital est situé au centre-ville.', 'c1', 'health'),
('8fb88861-1fee-458c-9689-0fe2d419eed3', 'ordonnance (9)', 'prescription', 'Le pharmacien a lu l''ordonnance.', 'c1', 'health'),
('e16d2c2b-7a97-4152-a3f4-f23176ce8503', 'assurance (9)', 'insurance', 'L''assurance maladie est obligatoire.', 'c1', 'health'),
('0eeb2c36-ea24-4b09-81cf-9a1bb4988613', 'santé (9)', 'health', 'La santé est le bien le plus précieux.', 'c1', 'health'),
('d0e88045-8e03-4dfe-a711-6aaff7c8a8a0', 'urgence (9)', 'emergency', 'En cas d''urgence, appelez le 911.', 'c1', 'health'),
('1d80893c-aaf9-43f6-8f80-f63dfeb626a9', 'traitement (9)', 'treatment', 'Ce traitement est très efficace.', 'c1', 'health'),
('83844d1a-d5a7-47ac-8b60-33e6882f3643', 'douleur (9)', 'pain', 'Où ressentez-vous la douleur ?', 'c1', 'health'),
('0f7e68da-35f5-4c7d-b3f4-36ff8631899b', 'vaccin (9)', 'vaccine', 'Le vaccin est recommandé pour les voyageurs.', 'c1', 'health'),
('cc6a2f2f-cbb5-4d6d-b4c4-18ec046929aa', 'symptôme (9)', 'symptom', 'Quels sont vos symptômes ?', 'c1', 'health'),
('06146565-07eb-42db-85a9-ea14ae0c3245', 'épicerie (9)', 'grocery store', 'Je vais à l''épicerie pour acheter du lait.', 'c1', 'daily_life'),
('af421448-fd9f-468f-9fee-be58265b2507', 'transport (9)', 'transportation', 'Les transports en commun sont efficaces ici.', 'c1', 'daily_life'),
('6412217e-ea88-45ae-9970-487352706998', 'météo (9)', 'weather', 'Consultez la météo avant de sortir.', 'c1', 'daily_life'),
('f3dab6b1-4d22-4c34-b7c4-dd17d852a0e2', 'loisir (9)', 'leisure', 'Le sport est mon loisir préféré.', 'c1', 'daily_life'),
('2d8c0c87-15d6-495d-821d-7a3f0433dd8a', 'voisin (9)', 'neighbor', 'Nos voisins sont très sympathiques.', 'c1', 'daily_life'),
('65369be3-40e3-4719-ac84-3e567368e9fd', 'banque (9)', 'bank', 'Je dois aller à la banque pour ouvrir un compte.', 'c1', 'daily_life'),
('671e4190-8090-423d-bc35-4d7ee5f87399', 'courrier (9)', 'mail', 'Avez-vous reçu mon courrier ?', 'c1', 'daily_life'),
('16e2eff5-ac8e-461a-a293-06914d34719e', 'vêtement (9)', 'clothing', 'Portez des vêtements chauds en hiver.', 'c1', 'daily_life'),
('98f1aae2-45d1-4393-8bd0-dc61dfd78e2b', 'nourriture (9)', 'food', 'La nourriture canadienne est variée.', 'c1', 'daily_life'),
('942eb05e-1d7e-4b1e-b0a7-3af17c31153d', 'famille (9)', 'family', 'Ma famille me manque beaucoup.', 'c1', 'daily_life'),
('0bf5381f-f2dc-4b4e-9652-3dfedc87519f', 'citoyenneté (10)', 'citizenship', 'La cérémonie de citoyenneté est un moment émouvant.', 'c1', 'immigration'),
('070aba9c-810f-46a0-a131-f98520fa7ddb', 'résidence (10)', 'residence', 'Il a obtenu sa résidence permanente l''année dernière.', 'c1', 'immigration'),
('1cc8d0d4-643a-4d82-97c0-583332058743', 'visa (10)', 'visa', 'N''oubliez pas de renouveler votre visa de visiteur.', 'c1', 'immigration'),
('6b42d8fe-7e03-48ad-84d5-326547504bb6', 'frontière (10)', 'border', 'Le contrôle à la frontière a été très rapide.', 'c1', 'immigration'),
('1d30f651-cd3a-424e-ab78-dbe1aa84e009', 'intégration (10)', 'integration', 'L''intégration passe par l''apprentissage de la langue.', 'c1', 'immigration'),
('40d67de9-a3f4-4a63-9bf8-b863239f14e8', 'naturalisation (10)', 'naturalization', 'Le dossier de naturalisation est complexe.', 'c1', 'immigration'),
('a03a1d87-1426-47a0-a1fc-1c1aec176adb', 'parrainage (10)', 'sponsorship', 'Le parrainage d''un conjoint peut prendre plusieurs mois.', 'c1', 'immigration'),
('3155c6e9-4cd1-4ec6-83f9-66a71ef58a9e', 'réfugié (10)', 'refugee', 'Le Canada accueille des réfugiés du monde entier.', 'c1', 'immigration'),
('eb96dcc1-f979-491b-9f68-4c42ed751d51', 'permis (10)', 'permit', 'Avez-vous un permis de travail valide ?', 'c1', 'immigration'),
('dcb4619f-f1e9-4ae9-ab7c-1e1cf241c499', 'admissibilité (10)', 'eligibility', 'Vérifiez votre admissibilité sur le site officiel.', 'c1', 'immigration');

-- News articles seed data
INSERT INTO public.news_articles (title, content, summary, source, difficulty, id, published_at, created_at, image_url)
VALUES
('Le Canada augmente ses cibles d''immigration francophone', 'Le gouvernement canadien a annoncé aujourd''hui une augmentation significative de ses cibles pour l''immigration francophone hors Québec. Cette mesure vise à renforcer la vitalité des communautés de langue officielle en situation minoritaire à travers le pays. Le ministre de l''Immigration a souligné que les nouveaux arrivants francophones apportent des compétences essentielles et contribuent à la diversité culturelle du Canada.', 'Le Canada vise à attirer plus d''immigrants francophones hors Québec.', 'https://www.canada.ca/news', 'b1', '02394011-9807-43f7-8fa3-57c8f376abb0', '2026-06-22T22:39:34.296959', '2026-06-22T22:39:34.296968', 'https://source.unsplash.com/featured/?Le'),
('Les avantages de la double citoyenneté', 'Avoir deux passeports offre de nombreux avantages, notamment la liberté de mouvement et plus d''opportunités professionnelles. Cependant, cela implique aussi des responsabilités, comme le respect des lois des deux pays. Beaucoup d''immigrants au Canada choisissent de conserver leur nationalité d''origine tout en devenant citoyens canadiens pour maintenir un lien avec leurs racines.', 'La double citoyenneté offre des avantages pratiques et sentimentaux.', 'https://www.immigrant-magazine.ca', 'a2', '912ab4ff-b030-410b-b865-64e346e807ae', '2026-06-22T22:39:34.296978', '2026-06-22T22:39:34.296986', 'https://source.unsplash.com/featured/?Les'),
('L''importance du TEF pour Entrée Express', 'Le Test d''Évaluation de Français (TEF) est un outil crucial pour les candidats à l''immigration via le système Entrée Express. Un score élevé peut rapporter jusqu''à 50 points supplémentaires dans le Système de classement global (SCG). Les experts recommandent une préparation intensive d''au moins trois mois pour maximiser ses chances de réussite et obtenir une invitation à présenter une demande de résidence permanente.', 'Le TEF peut augmenter significativement vos points CRS.', 'https://www.francaispass.com/blog', 'b2', '539813c5-709a-4510-9ede-250d8a423b93', '2026-06-22T22:39:34.296993', '2026-06-22T22:39:34.296996', 'https://source.unsplash.com/featured/?L''importance'),
('La culture du café à Montréal', 'Montréal est célèbre pour ses nombreux cafés indépendants où les gens se retrouvent pour discuter ou travailler. Contrairement à la France, où le café se boit souvent debout au comptoir, les Montréalais préfèrent s''installer confortablement pendant des heures. Cette culture reflète le mélange unique d''influences européennes et nord-américaines qui caractérise la métropole québécoise.', 'Une exploration de la culture sociale des cafés à Montréal.', 'https://www.mtl-blog.com', 'a1', '12f3b4e1-5b02-43b0-b4a8-b12651339b66', '2026-06-22T22:39:34.297001', '2026-06-22T22:39:34.297002', 'https://source.unsplash.com/featured/?La'),
('Les nouveaux défis du marché du travail canadien', 'Avec le vieillissement de la population, le Canada fait face à des pénuries de main-d''œuvre dans plusieurs secteurs clés comme la santé et la technologie. Le gouvernement encourage les employeurs à recruter des talents internationaux qualifiés. Pour les nouveaux arrivants, la maîtrise de l''anglais et du français reste un atout majeur pour décrocher des postes à haute responsabilité.', 'Pénurie de main-d''œuvre et opportunités pour les immigrés qualifiés.', 'https://www.radio-canada.ca/economie', 'c1', '83c9da34-24d0-4fb3-968e-9b206bdea299', '2026-06-22T22:39:34.297007', '2026-06-22T22:39:34.297008', 'https://source.unsplash.com/featured/?Les'),
('Apprendre le français en ligne : conseils et astuces', 'L''apprentissage d''une langue étrangère demande de la régularité. Avec l''avènement des plateformes numériques, il est désormais possible de pratiquer quotidiennement avec des tuteurs natifs ou des applications mobiles. Les spécialistes suggèrent de varier les supports : podcasts, films sous-titrés et exercices de grammaire interactifs pour ne pas se lasser et progresser rapidement.', 'Conseils pour progresser en français grâce aux outils numériques.', 'https://www.le-monde-fle.fr', 'b1', 'ffb5f541-83d1-4d6d-bde3-af1ae150ff0e', '2026-06-22T22:39:34.297013', '2026-06-22T22:39:34.297014', 'https://source.unsplash.com/featured/?Apprendre'),
('Le festival d''été de Québec attire les foules', 'Chaque année en juillet, la ville de Québec vibre au rythme de son festival d''été. Des artistes internationaux et locaux se produisent sur les Plaines d''Abraham devant des milliers de spectateurs. C''est l''un des événements culturels les plus importants au pays, attirant des touristes du monde entier et générant des retombées économiques majeures pour la région.', 'Le succès continu d''un grand festival de musique au Québec.', 'https://www.quebec-cite.com', 'a2', '3f348830-e118-4bd5-bb0f-377d3d69e254', '2026-06-22T22:39:34.297019', '2026-06-22T22:39:34.297020', 'https://source.unsplash.com/featured/?Le'),
('Réussir son intégration professionnelle au Canada', 'Trouver un emploi dans son domaine d''expertise est une priorité pour de nombreux immigrants. Le réseautage est souvent la clé du succès au Canada. Il est conseillé de participer à des salons de l''emploi et de contacter des mentors. L''adaptation du CV au format canadien et la préparation aux entrevues comportementales sont également des étapes essentielles.', 'L''importance du réseautage pour la carrière des nouveaux arrivants.', 'https://www.emplois-canada.ca', 'b2', 'a6968b02-f1f6-452b-8e6b-c5a6cb1b8e42', '2026-06-22T22:39:34.297025', '2026-06-22T22:39:34.297026', 'https://source.unsplash.com/featured/?Réussir'),
('Le système de santé canadien expliqué', 'Le Canada dispose d''un système de santé financé par l''État qui offre des soins gratuits à tous ses résidents permanents et citoyens. Chaque province gère son propre régime d''assurance maladie. Bien que les délais d''attente puissent parfois être longs pour certains spécialistes, la qualité des soins d''urgence est mondialement reconnue comme étant excellente.', 'Fonctionnement et principes de base de l''assurance maladie canadienne.', 'https://www.canada-health.ca', 'b1', 'dd80b392-bdc4-499e-b7c6-cd2a4e3aa920', '2026-06-22T22:39:34.297032', '2026-06-22T22:39:34.297033', 'https://source.unsplash.com/featured/?Le'),
('Les fêtes de fin d''année au Canada', 'Au Canada, les traditions de Noël et du Nouvel An sont très ancrées. On décore souvent les maisons avec de nombreuses lumières et un sapin naturel. La neige, souvent présente à cette période, ajoute une touche magique aux célébrations. C''est un moment privilégié pour se retrouver en famille autour d''un grand repas traditionnel composé de dinde et de tourtière.', 'Découverte des traditions hivernales et familiales au Canada.', 'https://www.vivre-au-canada.com', 'a1', '80f0271b-fc3e-4cb8-a525-d5eac053d43e', '2026-06-22T22:39:34.297038', '2026-06-22T22:39:34.297039', 'https://source.unsplash.com/featured/?Les');

-- RFI Reading Passages seed data
-- RFI Reading Comprehension Passages Seed Data
-- Generated at 2026-07-15T02:09:15.727Z
-- Total: 10 tests, 50 questions

BEGIN;

INSERT INTO public.mock_tests (id, title, description, exam_type, module, difficulty, duration_minutes, created_at)
VALUES
('1d213556-c650-4532-8fe2-973fe1e3e239', 'RFI — Réforme des institutions : le débat sur la décentralisation relancé', 'Le débat sur la décentralisation refait surface dans l''hexagone, alors que le gouvernement vient de déposer un projet de loi visant à transférer de nouvelles compétences aux régions. Cette réforme, dont l''ambition affichée est de rapprocher les centres de décision des citoyens, suscite toutefois des réactions contrastées au sein de la classe politique.

Si les partisans de la mesure estiment qu''elle permettrait une gestion plus efficace des politiques publiques, notamment dans les domaines de l''éducation et des transports, ses détracteurs craignent qu''elle n''accentue les inégalités territoriales. « Il serait illusoire de croire que toutes les régions disposent des mêmes capacités financières pour assumer ces nouvelles responsabilités », a déclaré un élu de l''opposition, soulignant qu''il faudrait que l''État garantisse une péréquation équitable avant d''envisager un quelconque transfert de compétences.

Le texte prévoit également la création d''un fonds de solidarité destiné à compenser les disparités économiques entre les territoires. Les débats parlementaires devraient s''étendre sur plusieurs mois, et de nombreux amendements sont attendus de la part des sénateurs qui souhaitent que le rôle des collectivités locales soit renforcé dans la mise en œuvre de cette politique ambitieuse. Les citoyens, quant à eux, attendent des résultats concrets : une enquête récente révèle que 68% des Français se disent favorables à une décentralisation accrue, pourvu qu''elle s''accompagne de moyens financiers à la hauteur des enjeux.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.726Z', '2026-07-15T02:09:15.727Z'),
('bfff26c0-19c2-499d-b8b4-309bda249db3', 'RFI — L''économie française face aux défis de la transition énergétique', 'La transition énergétique représente à la fois un défi et une opportunité pour l''économie française. Alors que le gouvernement a fixé l''objectif ambitieux d''atteindre la neutralité carbone d''ici 2050, les entreprises doivent désormais repenser leurs modèles d''affaires pour s''adapter à cette nouvelle donne. Encore faudrait-il que les investissements nécessaires suivent le rythme des ambitions affichées.

Selon un rapport récent de l''Observatoire des investissements verts, les montants alloués aux énergies renouvelables ont augmenté de 35% au cours des deux dernières années, témoignant d''une prise de conscience collective. Néanmoins, certains secteurs industriels, notamment l''automobile et la sidérurgie, peinent à opérer leur mue écologique sans compromettre leur compétitivité sur le marché international. Le président d''un grand groupe industriel a récemment déclaré qu''il serait indispensable que l''Union européenne assouplisse temporairement certaines normes environnementales pour permettre une transition en douceur.

Les économistes s''interrogent sur la capacité de la France à concilier impératifs écologiques et croissance économique. « Il faudrait que les pouvoirs publics accompagnent davantage les PME dans cette transition, car elles représentent le tissu économique le plus vulnérable », souligne une étude de la Banque de France. Les prochaines années seront décisives pour déterminer si cette transformation structurelle portera ses fruits, d''autant que la facture énergétique des ménages continue d''augmenter, ce qui suscite des inquiétudes quant à l''acceptabilité sociale de ces réformes.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z'),
('c865b70f-ef51-48d4-98f5-f5fe92e5d85e', 'RFI — La biodiversité en péril : l''urgence d''agir face à l''effondrement des écosystèmes', 'L''érosion de la biodiversité s''accélère à un rythme préoccupant, selon le dernier rapport du Groupe d''experts intergouvernemental sur l''évolution du climat (GIEC). Près d''un million d''espèces animales et végétales seraient menacées d''extinction à court terme, principalement en raison des activités humaines et du dérèglement climatique. Il est impératif que des mesures drastiques soient adoptées sans délai pour inverser cette tendance.

Face à ce constat alarmant, de nombreuses initiatives voient le jour tant au niveau local qu''international. La France a notamment annoncé le lancement d''un programme de restauration écologique portant sur 50 000 hectares de zones humides d''ici 2030. Ces écosystèmes, qui jouent un rôle crucial dans la régulation du climat et la filtration de l''eau, ont vu leur superficie diminuer de 67% au cours du siècle dernier. Il serait regrettable que les efforts ne soient pas à la hauteur de l''urgence.

Les scientifiques insistent sur la nécessité d''adopter une approche systémique. « Il ne suffit pas que nous protégions quelques espèces emblématiques ; il faut que nous préservions l''intégralité des écosystèmes dont dépend notre propre survie », explique une chercheuse du Muséum national d''histoire naturelle. Les décisions politiques prises dans les prochaines années seront déterminantes pour inverser cette tendance. Selon un sondage, 73% des citoyens européens considèrent que la protection de l''environnement devrait être une priorité absolue, ce qui témoigne d''une sensibilisation croissante de l''opinion publique.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z'),
('c87e4e84-4353-4303-8101-412ed8de4bba', 'RFI — L''intelligence artificielle transforme le marché du travail : quelles perspectives ?', 'L''intelligence artificielle générative bouleverse les codes établis du monde professionnel, suscitant à la fois enthousiasme et inquiétude. Selon une étude prospective du Ministère du Travail, près de 30% des métiers actuels pourraient être profondément transformés par ces technologies d''ici 2030, tandis que de nouvelles professions émergeraient simultanément. Il est essentiel que les travailleurs anticipent ces mutations pour ne pas être pris au dépourvu.

Les secteurs les plus impactés seraient ceux de la traduction, du journalisme, de la programmation informatique et des services juridiques. « L''IA ne remplacera pas les humains, mais il est probable que les professionnels qui sauront exploiter ces outils remplaceront ceux qui les ignorent », affirme un expert en transformation numérique interrogé par nos confrères du Monde. Cette citation illustre bien le paradoxe auquel sont confrontés les travailleurs : il faudrait qu''ils se forment aux nouvelles technologies tout en conservant leur expertise métier.

Parallèlement, le gouvernement a annoncé un plan d''investissement de deux milliards d''euros pour former les travailleurs aux compétences numériques de demain. Ce programme ambitieux comprend notamment la création de cinquante campus dédiés à l''intelligence artificielle sur l''ensemble du territoire. Les syndicats restent toutefois vigilants quant aux conditions de mise en œuvre de cette transition technologique, craignant qu''elle ne se traduise par une précarisation accrue de certains emplois. Une enquête récente indique que 62% des salariés français se disent préoccupés par l''impact de l''IA sur leur travail.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z'),
('d8f69719-4c9d-4d2f-a51c-fce6da6be3d0', 'RFI — La culture française à l''ère du numérique : entre tradition et innovation', 'Le paysage culturel français connaît une mutation profonde sous l''effet des nouvelles technologies. Si les salles de cinéma et les théâtres ont vu leur fréquentation diminuer de 15% depuis la crise sanitaire, les plateformes numériques enregistrent une croissance exponentielle de leur audience, notamment chez les jeunes générations. Il serait pourtant regrettable que la culture en ligne se substitue entièrement à l''expérience physique du spectacle vivant.

Le ministère de la Culture a récemment dévoilé un plan de soutien à la création artistique doté de 300 millions d''euros, visant à accompagner les acteurs culturels dans leur transition numérique. « Il est impératif que notre patrimoine culturel demeure accessible au plus grand nombre, tout en s''adaptant aux nouveaux usages », a déclaré la ministre lors d''une conférence de presse. Ce plan prévoit notamment la numérisation de 500 000 œuvres issues des collections nationales, dont une large part n''avait jamais été accessible au public.

Les festivals, véritables institutions de la vie culturelle française, réinventent également leur modèle. Le Festival d''Avignon, plus grand rendez-vous de théâtre contemporain d''Europe, propose désormais une programmation hybride alliant représentations physiques et diffusions en ligne. Cette stratégie permet de toucher un public international tout en préservant l''essence même de l''expérience théâtrale. Selon une enquête, 58% des spectateurs estiment que le numérique enrichit leur expérience culturelle sans la remplacer.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z'),
('2aa02016-1de3-4c8d-b9aa-b656faf793d8', 'RFI — Politique d''immigration au Canada : le français comme vecteur d''intégration', 'Le Canada renforce sa politique d''immigration francophone en dehors du Québec, avec l''objectif ambitieux d''atteindre 12% d''immigrants francophones d''ici 2028 dans les provinces et territoires anglophones. Cette stratégie, qui s''inscrit dans le cadre de la Loi sur les langues officielles, vise à contrer le déclin du poids démographique des communautés francophones hors Québec. Il est essentiel que les nouveaux arrivants puissent s''intégrer pleinement dans la société canadienne.

« La maîtrise du français constitue un atout indéniable pour les candidats à l''immigration, leur permettant d''accumuler des points supplémentaires dans le système Entrée express », rappelle une conseillère en immigration basée à Toronto. Les données officielles indiquent que les candidats francophones obtiennent en moyenne des scores plus élevés et que leur dossier est traité plus rapidement. Le gouvernement fédéral souhaite que les provinces collaborent davantage à la mise en œuvre de cette stratégie linguistique.

Les nouveaux arrivants francophones bénéficient par ailleurs de programmes d''accompagnement spécifiques, notamment des services d''établissement et des cours de perfectionnement linguistique. Cependant, des défis persistent, particulièrement en ce qui concerne l''accès à l''emploi dans leur domaine de compétence. Des associations militent pour que les diplômes étrangers soient mieux reconnus et que l''accompagnement vers l''intégration professionnelle soit renforcé. Selon une étude récente, 71% des immigrants francophones trouvent un emploi dans leur domaine dans les deux ans suivant leur arrivée, un chiffre encourageant mais qui pourrait encore être amélioré.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z'),
('18995ead-9a60-4d56-b5aa-9b99dd5590f9', 'RFI — Système de santé : les défis de la médecine de demain face au vieillissement', 'Le système de santé français, longtemps considéré comme l''un des meilleurs au monde, traverse une période de turbulences sans précédent. La pénurie de personnel soignant, couplée au vieillissement de la population, exerce une pression croissante sur les hôpitaux publics. Selon un rapport du Haut Conseil de la santé publique, la France compterait 3,5 millions de personnes âgées dépendantes en 2030, soit une augmentation de 40% par rapport à 2020. Il est urgent que des mesures structurelles soient adoptées pour faire face à cette situation.

Face à cette situation, les pouvoirs publics misent sur la télémédecine et les innovations technologiques. « Les consultations à distance ont connu une augmentation de 500% depuis 2020, et cette tendance devrait se poursuivre », explique un chercheur en santé numérique. Le gouvernement a alloué une enveloppe de 500 millions d''euros pour moderniser les infrastructures hospitalières et développer les soins à domicile. Il faudrait que ces investissements soient pérennisés pour garantir leur efficacité à long terme.

Les professionnels de santé réclament quant à eux une revalorisation salariale et des conditions de travail plus attractives. « Il serait illusoire de vouloir réformer le système sans investir dans les ressources humaines », prévient un syndicat médical. La question du financement à long terme de la protection sociale demeure au cœur des débats politiques, d''autant que le vieillissement démographique devrait accroître les dépenses de santé de 1,5% par an en moyenne jusqu''en 2040, selon les projections de la Commission des comptes de la sécurité sociale.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z'),
('83f70f75-375d-41eb-95e2-eb427f79566d', 'RFI — L''école face aux défis du XXIe siècle : réformer pour mieux former', 'Le système éducatif français est engagé dans une vaste réforme visant à adapter l''enseignement aux enjeux contemporains. Au cœur de cette transformation, l''accent est mis sur l''apprentissage des langues étrangères, le développement des compétences numériques et l''éducation au développement durable. Il est indispensable que les élèves acquièrent les compétences qui leur permettront de s''épanouir dans un monde en constante évolution.

« Il convient que nos élèves soient préparés à évoluer dans un monde où les frontières professionnelles et géographiques sont de plus en plus poreuses », souligne un rapport de l''OCDE. Les résultats de la France aux évaluations internationales PISA, bien qu''en légère amélioration, demeurent inférieurs à la moyenne des pays comparables. Cette situation a motivé l''introduction de nouvelles méthodes pédagogiques, notamment l''enseignement par projet et l''évaluation par compétences. Il faudrait que les enseignants soient mieux formés à ces nouvelles approches pour qu''elles portent leurs fruits.

La réforme prévoit également la création de « cités éducatives » dans les quartiers prioritaires, visant à renforcer la coopération entre l''école, les familles et les acteurs locaux. Un budget supplémentaire de 800 millions d''euros a été débloqué pour réduire les effectifs dans les classes et améliorer l''équité territoriale. Le taux de décrochage scolaire, qui touche encore près de 8% des jeunes Français, est jugé préoccupant par les syndicats enseignants. Selon une enquête, 64% des parents estiment que l''école devrait accorder une place plus importante à l''éducation aux médias et à l''information.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z'),
('9e3bf377-f7a4-45d5-9c10-2f23e5027f6a', 'RFI — Géopolitique mondiale : l''émergence d''un nouvel ordre international', 'Les relations internationales connaissent actuellement des bouleversements majeurs, marqués par l''affirmation de nouvelles puissances et la remise en cause des équilibres établis depuis la fin de la guerre froide. L''essor économique de la Chine, le retour de la Russie sur la scène diplomatique et l''émergence du G20 comme forum de concertation privilégié redessinent la carte du pouvoir mondial. Il est probable que cette recomposition géopolitique s''accélère dans les années à venir.

« Nous assistons à une transition historique vers un monde multipolaire, où les alliances traditionnelles sont réévaluées », analyse une chercheuse en relations internationales de Sciences Po. Les organisations internationales, notamment l''ONU et l''OMC, peinent à s''adapter à cette nouvelle configuration, ce qui suscite des interrogations sur leur capacité à réguler les conflits et les échanges mondiaux. Il faudrait que ces institutions soient réformées en profondeur pour rester pertinentes.

La France, forte de son réseau diplomatique et de sa présence au Conseil de sécurité, cherche à maintenir son influence tout en nouant de nouveaux partenariats stratégiques. Le président a récemment plaidé pour une « autonomie stratégique européenne » lors d''un sommet à Bruxelles, appelant les États membres à renforcer leur coopération en matière de défense et de politique étrangère. Selon un sondage réalisé dans six pays européens, 58% des citoyens se déclarent favorables à une politique étrangère commune, bien que les divergences entre États membres restent importantes.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z'),
('55e29422-fba7-4c12-9b12-f35607f75a49', 'RFI — Les nouvelles solidarités face à la fragmentation du lien social', 'La société française contemporaine est traversée par des tensions qui interrogent la cohésion nationale. Entre individualisme croissant et fragmentation sociale, de nouvelles formes de solidarité émergent pourtant, témoignant d''une capacité de résilience collective. Les associations et les initiatives citoyennes se multiplient, notamment dans les domaines de l''aide alimentaire, du soutien scolaire et de l''accompagnement des personnes isolées. Il est remarquable que l''engagement citoyen se renouvelle malgré un contexte de défiance envers les institutions.

« On observe une véritable renaissance de l''engagement citoyen, particulièrement chez les jeunes générations », explique une sociologue spécialiste des mouvements associatifs. Selon une enquête récente, 62% des 18-35 ans déclarent avoir participé à au moins une action bénévole au cours des douze derniers mois, un chiffre en hausse constante depuis cinq ans. Il serait intéressant que les pouvoirs publics s''appuient davantage sur cet élan pour renforcer les politiques de cohésion sociale.

Les plateformes numériques jouent un rôle catalyseur dans cette recomposition du lien social, en facilitant la mise en relation des volontaires et des personnes dans le besoin. Cependant, des voix s''élèvent pour mettre en garde contre une « ubérisation » de la solidarité qui affaiblirait les services publics. Le débat sur le rôle de l''État et de la société civile dans la protection sociale reste plus que jamais d''actualité. Une enquête d''opinion révèle que 76% des Français estiment que la solidarité est une valeur fondamentale qui devrait être davantage encouragée par les politiques publiques.', 'tef', 'reading', 'advanced', 45, true, '2026-07-15T02:09:15.727Z', '2026-07-15T02:09:15.727Z');

INSERT INTO public.test_questions (id, test_id, question_text, audio_url, image_url, options, correct_answer, explanation, points, order_index, created_at)
VALUES
('fa15456b-cc5a-43fa-a754-a9a32be63929', '1d213556-c650-4532-8fe2-973fe1e3e239', '📖 Texte :

Le débat sur la décentralisation refait surface dans l''hexagone, alors que le gouvernement vient de déposer un projet de loi visant à transférer de nouvelles compétences aux régions. Cette réforme, dont l''ambition affichée est de rapprocher les centres de décision des citoyens, suscite toutefois des réactions contrastées au sein de la classe politique.

Si les partisans de la mesure estiment qu''elle permettrait une gestion plus efficace des politiques publiques, notamment dans les domaines de l''éducation et des transports, ses détracteurs craignent qu''elle n''accentue les inégalités territoriales. « Il serait illusoire de croire que toutes les régions disposent des mêmes capacités financières pour assumer ces nouvelles responsabilités », a déclaré un élu de l''opposition, soulignant qu''il faudrait que l''État garantisse une péréquation équitable avant d''envisager un quelconque transfert de compétences.

Le texte prévoit également la création d''un fonds de solidarité destiné à compenser les disparités économiques entre les territoires. Les débats parlementaires devraient s''étendre sur plusieurs mois, et de nombreux amendements sont attendus de la part des sénateurs qui souhaitent que le rôle des collectivités locales soit renforcé dans la mise en œuvre de cette politique ambitieuse. Les citoyens, quant à eux, attendent des résultats concrets : une enquête récente révèle que 68% des Français se disent favorables à une décentralisation accrue, pourvu qu''elle s''accompagne de moyens financiers à la hauteur des enjeux.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"Un projet de loi sur la décentralisation et ses implications\",\"Les élections municipales à venir en France\",\"La réforme du système de santé français\",\"Les relations entre la France et l''Union européenne\"]"'::jsonb, 'Un projet de loi sur la décentralisation et ses implications', 'L''article traite du projet de loi sur la décentralisation qui vise à transférer des compétences aux régions, ainsi que des réactions contrastées qu''il suscite.', 1, 0, '2026-07-15T02:09:15.727Z'),
('7b07dec3-08f2-486c-bdd7-f739fc2e36e5', '1d213556-c650-4532-8fe2-973fe1e3e239', '📖 Texte :

Le débat sur la décentralisation refait surface dans l''hexagone, alors que le gouvernement vient de déposer un projet de loi visant à transférer de nouvelles compétences aux régions. Cette réforme, dont l''ambition affichée est de rapprocher les centres de décision des citoyens, suscite toutefois des réactions contrastées au sein de la classe politique.

Si les partisans de la mesure estiment qu''elle permettrait une gestion plus efficace des politiques publiques, notamment dans les domaines de l''éducation et des transports, ses détracteurs craignent qu''elle n''accentue les inégalités territoriales. « Il serait illusoire de croire que toutes les régions disposent des mêmes capacités financières pour assumer ces nouvelles responsabilités », a déclaré un élu de l''opposition, soulignant qu''il faudrait que l''État garantisse une péréquation équitable avant d''envisager un quelconque transfert de compétences.

Le texte prévoit également la création d''un fonds de solidarité destiné à compenser les disparités économiques entre les territoires. Les débats parlementaires devraient s''étendre sur plusieurs mois, et de nombreux amendements sont attendus de la part des sénateurs qui souhaitent que le rôle des collectivités locales soit renforcé dans la mise en œuvre de cette politique ambitieuse. Les citoyens, quant à eux, attendent des résultats concrets : une enquête récente révèle que 68% des Français se disent favorables à une décentralisation accrue, pourvu qu''elle s''accompagne de moyens financiers à la hauteur des enjeux.

---

Question : Quel pourcentage de Français se dit favorable à une décentralisation accrue ?', NULL, NULL, '"[\"58%\",\"68%\",\"78%\",\"48%\"]"'::jsonb, '68%', 'Le texte mentionne explicitement qu''une enquête récente révèle que 68% des Français se disent favorables à une décentralisation accrue.', 1, 1, '2026-07-15T02:09:15.727Z'),
('20416adc-6126-446c-a1b2-23b669465153', '1d213556-c650-4532-8fe2-973fe1e3e239', '📖 Texte :

Le débat sur la décentralisation refait surface dans l''hexagone, alors que le gouvernement vient de déposer un projet de loi visant à transférer de nouvelles compétences aux régions. Cette réforme, dont l''ambition affichée est de rapprocher les centres de décision des citoyens, suscite toutefois des réactions contrastées au sein de la classe politique.

Si les partisans de la mesure estiment qu''elle permettrait une gestion plus efficace des politiques publiques, notamment dans les domaines de l''éducation et des transports, ses détracteurs craignent qu''elle n''accentue les inégalités territoriales. « Il serait illusoire de croire que toutes les régions disposent des mêmes capacités financières pour assumer ces nouvelles responsabilités », a déclaré un élu de l''opposition, soulignant qu''il faudrait que l''État garantisse une péréquation équitable avant d''envisager un quelconque transfert de compétences.

Le texte prévoit également la création d''un fonds de solidarité destiné à compenser les disparités économiques entre les territoires. Les débats parlementaires devraient s''étendre sur plusieurs mois, et de nombreux amendements sont attendus de la part des sénateurs qui souhaitent que le rôle des collectivités locales soit renforcé dans la mise en œuvre de cette politique ambitieuse. Les citoyens, quant à eux, attendent des résultats concrets : une enquête récente révèle que 68% des Français se disent favorables à une décentralisation accrue, pourvu qu''elle s''accompagne de moyens financiers à la hauteur des enjeux.

---

Question : Que peut-on déduire de l''opposition à cette réforme ?', NULL, NULL, '"[\"Les détracteurs craignent un creusement des inégalités entre régions\",\"Les opposants refusent toute forme de changement institutionnel\",\"Les critiques estiment que les régions sont déjà trop puissantes\",\"L''opposition préfère une centralisation renforcée\"]"'::jsonb, 'Les détracteurs craignent un creusement des inégalités entre régions', 'Le texte indique que les détracteurs craignent que la réforme n''accentue les inégalités territoriales, car toutes les régions ne disposent pas des mêmes capacités financières.', 1, 2, '2026-07-15T02:09:15.727Z'),
('5d35aabb-7360-432f-a68e-c4a6ebef252d', '1d213556-c650-4532-8fe2-973fe1e3e239', '📖 Texte :

Le débat sur la décentralisation refait surface dans l''hexagone, alors que le gouvernement vient de déposer un projet de loi visant à transférer de nouvelles compétences aux régions. Cette réforme, dont l''ambition affichée est de rapprocher les centres de décision des citoyens, suscite toutefois des réactions contrastées au sein de la classe politique.

Si les partisans de la mesure estiment qu''elle permettrait une gestion plus efficace des politiques publiques, notamment dans les domaines de l''éducation et des transports, ses détracteurs craignent qu''elle n''accentue les inégalités territoriales. « Il serait illusoire de croire que toutes les régions disposent des mêmes capacités financières pour assumer ces nouvelles responsabilités », a déclaré un élu de l''opposition, soulignant qu''il faudrait que l''État garantisse une péréquation équitable avant d''envisager un quelconque transfert de compétences.

Le texte prévoit également la création d''un fonds de solidarité destiné à compenser les disparités économiques entre les territoires. Les débats parlementaires devraient s''étendre sur plusieurs mois, et de nombreux amendements sont attendus de la part des sénateurs qui souhaitent que le rôle des collectivités locales soit renforcé dans la mise en œuvre de cette politique ambitieuse. Les citoyens, quant à eux, attendent des résultats concrets : une enquête récente révèle que 68% des Français se disent favorables à une décentralisation accrue, pourvu qu''elle s''accompagne de moyens financiers à la hauteur des enjeux.

---

Question : Que signifie le mot « péréquation » dans le contexte de cet article ?', NULL, NULL, '"[\"Un mécanisme de redistribution visant à réduire les inégalités\",\"Une augmentation des impôts locaux\",\"Une procédure de vote parlementaire\",\"Un système de nomination des fonctionnaires régionaux\"]"'::jsonb, 'Un mécanisme de redistribution visant à réduire les inégalités', 'La péréquation désigne un mécanisme de redistribution financière destiné à compenser les disparités économiques entre les territoires, comme le mentionne le texte à propos du fonds de solidarité.', 1, 3, '2026-07-15T02:09:15.727Z'),
('2dae67cf-a9bc-4a00-8174-05d74d1320c9', '1d213556-c650-4532-8fe2-973fe1e3e239', '📖 Texte :

Le débat sur la décentralisation refait surface dans l''hexagone, alors que le gouvernement vient de déposer un projet de loi visant à transférer de nouvelles compétences aux régions. Cette réforme, dont l''ambition affichée est de rapprocher les centres de décision des citoyens, suscite toutefois des réactions contrastées au sein de la classe politique.

Si les partisans de la mesure estiment qu''elle permettrait une gestion plus efficace des politiques publiques, notamment dans les domaines de l''éducation et des transports, ses détracteurs craignent qu''elle n''accentue les inégalités territoriales. « Il serait illusoire de croire que toutes les régions disposent des mêmes capacités financières pour assumer ces nouvelles responsabilités », a déclaré un élu de l''opposition, soulignant qu''il faudrait que l''État garantisse une péréquation équitable avant d''envisager un quelconque transfert de compétences.

Le texte prévoit également la création d''un fonds de solidarité destiné à compenser les disparités économiques entre les territoires. Les débats parlementaires devraient s''étendre sur plusieurs mois, et de nombreux amendements sont attendus de la part des sénateurs qui souhaitent que le rôle des collectivités locales soit renforcé dans la mise en œuvre de cette politique ambitieuse. Les citoyens, quant à eux, attendent des résultats concrets : une enquête récente révèle que 68% des Français se disent favorables à une décentralisation accrue, pourvu qu''elle s''accompagne de moyens financiers à la hauteur des enjeux.

---

Question : Quel est l''objectif principal de cet article ?', NULL, NULL, '"[\"Informer sur un projet de loi et les réactions qu''il suscite\",\"Critiquer ouvertement la politique du gouvernement\",\"Promouvoir une position politique particulière\",\"Annoncer les résultats d''une élection\"]"'::jsonb, 'Informer sur un projet de loi et les réactions qu''il suscite', 'L''article adopte un ton neutre et informatif, présentant à la fois les arguments des partisans et des détracteurs de la réforme, sans prendre parti.', 1, 4, '2026-07-15T02:09:15.727Z'),
('0d9235d7-1ab3-4703-a7f7-052196de60aa', 'bfff26c0-19c2-499d-b8b4-309bda249db3', '📖 Texte :

La transition énergétique représente à la fois un défi et une opportunité pour l''économie française. Alors que le gouvernement a fixé l''objectif ambitieux d''atteindre la neutralité carbone d''ici 2050, les entreprises doivent désormais repenser leurs modèles d''affaires pour s''adapter à cette nouvelle donne. Encore faudrait-il que les investissements nécessaires suivent le rythme des ambitions affichées.

Selon un rapport récent de l''Observatoire des investissements verts, les montants alloués aux énergies renouvelables ont augmenté de 35% au cours des deux dernières années, témoignant d''une prise de conscience collective. Néanmoins, certains secteurs industriels, notamment l''automobile et la sidérurgie, peinent à opérer leur mue écologique sans compromettre leur compétitivité sur le marché international. Le président d''un grand groupe industriel a récemment déclaré qu''il serait indispensable que l''Union européenne assouplisse temporairement certaines normes environnementales pour permettre une transition en douceur.

Les économistes s''interrogent sur la capacité de la France à concilier impératifs écologiques et croissance économique. « Il faudrait que les pouvoirs publics accompagnent davantage les PME dans cette transition, car elles représentent le tissu économique le plus vulnérable », souligne une étude de la Banque de France. Les prochaines années seront décisives pour déterminer si cette transformation structurelle portera ses fruits, d''autant que la facture énergétique des ménages continue d''augmenter, ce qui suscite des inquiétudes quant à l''acceptabilité sociale de ces réformes.

---

Question : Quel est le thème central de cet article ?', NULL, NULL, '"[\"Les défis économiques de la transition énergétique en France\",\"La fermeture des centrales nucléaires françaises\",\"Les nouvelles technologies de stockage d''énergie\",\"La concurrence commerciale entre la France et l''Allemagne\"]"'::jsonb, 'Les défis économiques de la transition énergétique en France', 'L''article examine comment l''économie française s''adapte à la transition énergétique, en abordant à la fois les opportunités et les difficultés rencontrées.', 1, 0, '2026-07-15T02:09:15.727Z'),
('43e8ee9a-0ad2-4864-9abf-2712fbf437c2', 'bfff26c0-19c2-499d-b8b4-309bda249db3', '📖 Texte :

La transition énergétique représente à la fois un défi et une opportunité pour l''économie française. Alors que le gouvernement a fixé l''objectif ambitieux d''atteindre la neutralité carbone d''ici 2050, les entreprises doivent désormais repenser leurs modèles d''affaires pour s''adapter à cette nouvelle donne. Encore faudrait-il que les investissements nécessaires suivent le rythme des ambitions affichées.

Selon un rapport récent de l''Observatoire des investissements verts, les montants alloués aux énergies renouvelables ont augmenté de 35% au cours des deux dernières années, témoignant d''une prise de conscience collective. Néanmoins, certains secteurs industriels, notamment l''automobile et la sidérurgie, peinent à opérer leur mue écologique sans compromettre leur compétitivité sur le marché international. Le président d''un grand groupe industriel a récemment déclaré qu''il serait indispensable que l''Union européenne assouplisse temporairement certaines normes environnementales pour permettre une transition en douceur.

Les économistes s''interrogent sur la capacité de la France à concilier impératifs écologiques et croissance économique. « Il faudrait que les pouvoirs publics accompagnent davantage les PME dans cette transition, car elles représentent le tissu économique le plus vulnérable », souligne une étude de la Banque de France. Les prochaines années seront décisives pour déterminer si cette transformation structurelle portera ses fruits, d''autant que la facture énergétique des ménages continue d''augmenter, ce qui suscite des inquiétudes quant à l''acceptabilité sociale de ces réformes.

---

Question : De quel pourcentage les investissements dans les énergies renouvelables ont-ils augmenté ?', NULL, NULL, '"[\"25%\",\"35%\",\"45%\",\"55%\"]"'::jsonb, '35%', 'Le rapport de l''Observatoire des investissements verts mentionne une augmentation de 35% des montants alloués aux énergies renouvelables.', 1, 1, '2026-07-15T02:09:15.727Z'),
('47288f4d-1d6c-4e5a-99a7-145dd652d521', 'bfff26c0-19c2-499d-b8b4-309bda249db3', '📖 Texte :

La transition énergétique représente à la fois un défi et une opportunité pour l''économie française. Alors que le gouvernement a fixé l''objectif ambitieux d''atteindre la neutralité carbone d''ici 2050, les entreprises doivent désormais repenser leurs modèles d''affaires pour s''adapter à cette nouvelle donne. Encore faudrait-il que les investissements nécessaires suivent le rythme des ambitions affichées.

Selon un rapport récent de l''Observatoire des investissements verts, les montants alloués aux énergies renouvelables ont augmenté de 35% au cours des deux dernières années, témoignant d''une prise de conscience collective. Néanmoins, certains secteurs industriels, notamment l''automobile et la sidérurgie, peinent à opérer leur mue écologique sans compromettre leur compétitivité sur le marché international. Le président d''un grand groupe industriel a récemment déclaré qu''il serait indispensable que l''Union européenne assouplisse temporairement certaines normes environnementales pour permettre une transition en douceur.

Les économistes s''interrogent sur la capacité de la France à concilier impératifs écologiques et croissance économique. « Il faudrait que les pouvoirs publics accompagnent davantage les PME dans cette transition, car elles représentent le tissu économique le plus vulnérable », souligne une étude de la Banque de France. Les prochaines années seront décisives pour déterminer si cette transformation structurelle portera ses fruits, d''autant que la facture énergétique des ménages continue d''augmenter, ce qui suscite des inquiétudes quant à l''acceptabilité sociale de ces réformes.

---

Question : Que peut-on déduire de la situation des PME dans cet article ?', NULL, NULL, '"[\"Elles sont particulièrement vulnérables et nécessitent un soutien accru\",\"Elles sont les principales bénéficiaires de la transition\",\"Elles ont déjà accompli leur transition écologique\",\"Elles s''opposent massivement aux réformes environnementales\"]"'::jsonb, 'Elles sont particulièrement vulnérables et nécessitent un soutien accru', 'L''étude de la Banque de France souligne que les PME constituent le tissu économique le plus vulnérable et qu''il faudrait que les pouvoirs publics les accompagnent davantage.', 1, 2, '2026-07-15T02:09:15.727Z'),
('2a264a87-452e-4e53-aca0-c912d7d1fdb9', 'bfff26c0-19c2-499d-b8b4-309bda249db3', '📖 Texte :

La transition énergétique représente à la fois un défi et une opportunité pour l''économie française. Alors que le gouvernement a fixé l''objectif ambitieux d''atteindre la neutralité carbone d''ici 2050, les entreprises doivent désormais repenser leurs modèles d''affaires pour s''adapter à cette nouvelle donne. Encore faudrait-il que les investissements nécessaires suivent le rythme des ambitions affichées.

Selon un rapport récent de l''Observatoire des investissements verts, les montants alloués aux énergies renouvelables ont augmenté de 35% au cours des deux dernières années, témoignant d''une prise de conscience collective. Néanmoins, certains secteurs industriels, notamment l''automobile et la sidérurgie, peinent à opérer leur mue écologique sans compromettre leur compétitivité sur le marché international. Le président d''un grand groupe industriel a récemment déclaré qu''il serait indispensable que l''Union européenne assouplisse temporairement certaines normes environnementales pour permettre une transition en douceur.

Les économistes s''interrogent sur la capacité de la France à concilier impératifs écologiques et croissance économique. « Il faudrait que les pouvoirs publics accompagnent davantage les PME dans cette transition, car elles représentent le tissu économique le plus vulnérable », souligne une étude de la Banque de France. Les prochaines années seront décisives pour déterminer si cette transformation structurelle portera ses fruits, d''autant que la facture énergétique des ménages continue d''augmenter, ce qui suscite des inquiétudes quant à l''acceptabilité sociale de ces réformes.

---

Question : Que signifie l''expression « mue écologique » dans le contexte ?', NULL, NULL, '"[\"La transformation profonde des processus industriels vers plus de durabilité\",\"Le changement de couleur des bâtiments pour des raisons environnementales\",\"La migration des entreprises vers des zones rurales\",\"L''abandon total des activités polluantes du jour au lendemain\"]"'::jsonb, 'La transformation profonde des processus industriels vers plus de durabilité', 'La « mue écologique » fait référence à la transformation nécessaire des secteurs industriels pour adopter des pratiques plus respectueuses de l''environnement.', 1, 3, '2026-07-15T02:09:15.727Z'),
('fb4797a1-e110-4230-af4a-30248e2e05ae', 'bfff26c0-19c2-499d-b8b4-309bda249db3', '📖 Texte :

La transition énergétique représente à la fois un défi et une opportunité pour l''économie française. Alors que le gouvernement a fixé l''objectif ambitieux d''atteindre la neutralité carbone d''ici 2050, les entreprises doivent désormais repenser leurs modèles d''affaires pour s''adapter à cette nouvelle donne. Encore faudrait-il que les investissements nécessaires suivent le rythme des ambitions affichées.

Selon un rapport récent de l''Observatoire des investissements verts, les montants alloués aux énergies renouvelables ont augmenté de 35% au cours des deux dernières années, témoignant d''une prise de conscience collective. Néanmoins, certains secteurs industriels, notamment l''automobile et la sidérurgie, peinent à opérer leur mue écologique sans compromettre leur compétitivité sur le marché international. Le président d''un grand groupe industriel a récemment déclaré qu''il serait indispensable que l''Union européenne assouplisse temporairement certaines normes environnementales pour permettre une transition en douceur.

Les économistes s''interrogent sur la capacité de la France à concilier impératifs écologiques et croissance économique. « Il faudrait que les pouvoirs publics accompagnent davantage les PME dans cette transition, car elles représentent le tissu économique le plus vulnérable », souligne une étude de la Banque de France. Les prochaines années seront décisives pour déterminer si cette transformation structurelle portera ses fruits, d''autant que la facture énergétique des ménages continue d''augmenter, ce qui suscite des inquiétudes quant à l''acceptabilité sociale de ces réformes.

---

Question : Quel est le ton général de cet article ?', NULL, NULL, '"[\"Neutre et informatif, présentant différents points de vue\",\"Alarmiste et catastrophiste sur l''avenir économique\",\"Optimiste et enthousiaste quant aux progrès réalisés\",\"Sarcastique et critique envers les politiques environnementales\"]"'::jsonb, 'Neutre et informatif, présentant différents points de vue', 'L''article maintient un ton neutre en présentant à la fois les progrès (augmentation des investissements verts) et les difficultés (vulnérabilité des PME, inquiétudes sociales).', 1, 4, '2026-07-15T02:09:15.727Z'),
('2794d31a-956f-4901-aa09-8970ff59f6dd', 'c865b70f-ef51-48d4-98f5-f5fe92e5d85e', '📖 Texte :

L''érosion de la biodiversité s''accélère à un rythme préoccupant, selon le dernier rapport du Groupe d''experts intergouvernemental sur l''évolution du climat (GIEC). Près d''un million d''espèces animales et végétales seraient menacées d''extinction à court terme, principalement en raison des activités humaines et du dérèglement climatique. Il est impératif que des mesures drastiques soient adoptées sans délai pour inverser cette tendance.

Face à ce constat alarmant, de nombreuses initiatives voient le jour tant au niveau local qu''international. La France a notamment annoncé le lancement d''un programme de restauration écologique portant sur 50 000 hectares de zones humides d''ici 2030. Ces écosystèmes, qui jouent un rôle crucial dans la régulation du climat et la filtration de l''eau, ont vu leur superficie diminuer de 67% au cours du siècle dernier. Il serait regrettable que les efforts ne soient pas à la hauteur de l''urgence.

Les scientifiques insistent sur la nécessité d''adopter une approche systémique. « Il ne suffit pas que nous protégions quelques espèces emblématiques ; il faut que nous préservions l''intégralité des écosystèmes dont dépend notre propre survie », explique une chercheuse du Muséum national d''histoire naturelle. Les décisions politiques prises dans les prochaines années seront déterminantes pour inverser cette tendance. Selon un sondage, 73% des citoyens européens considèrent que la protection de l''environnement devrait être une priorité absolue, ce qui témoigne d''une sensibilisation croissante de l''opinion publique.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"L''urgence de protéger la biodiversité face à l''effondrement des écosystèmes\",\"Les causes du réchauffement climatique\",\"Les bienfaits de l''agriculture intensive\",\"La pollution des océans par les plastiques\"]"'::jsonb, 'L''urgence de protéger la biodiversité face à l''effondrement des écosystèmes', 'L''article traite de l''érosion accélérée de la biodiversité et de la nécessité d''agir rapidement pour préserver les écosystèmes.', 1, 0, '2026-07-15T02:09:15.727Z'),
('86718617-474a-4945-8ef6-96d50da736dc', 'c865b70f-ef51-48d4-98f5-f5fe92e5d85e', '📖 Texte :

L''érosion de la biodiversité s''accélère à un rythme préoccupant, selon le dernier rapport du Groupe d''experts intergouvernemental sur l''évolution du climat (GIEC). Près d''un million d''espèces animales et végétales seraient menacées d''extinction à court terme, principalement en raison des activités humaines et du dérèglement climatique. Il est impératif que des mesures drastiques soient adoptées sans délai pour inverser cette tendance.

Face à ce constat alarmant, de nombreuses initiatives voient le jour tant au niveau local qu''international. La France a notamment annoncé le lancement d''un programme de restauration écologique portant sur 50 000 hectares de zones humides d''ici 2030. Ces écosystèmes, qui jouent un rôle crucial dans la régulation du climat et la filtration de l''eau, ont vu leur superficie diminuer de 67% au cours du siècle dernier. Il serait regrettable que les efforts ne soient pas à la hauteur de l''urgence.

Les scientifiques insistent sur la nécessité d''adopter une approche systémique. « Il ne suffit pas que nous protégions quelques espèces emblématiques ; il faut que nous préservions l''intégralité des écosystèmes dont dépend notre propre survie », explique une chercheuse du Muséum national d''histoire naturelle. Les décisions politiques prises dans les prochaines années seront déterminantes pour inverser cette tendance. Selon un sondage, 73% des citoyens européens considèrent que la protection de l''environnement devrait être une priorité absolue, ce qui témoigne d''une sensibilisation croissante de l''opinion publique.

---

Question : Quel est l''objectif du programme de restauration écologique annoncé par la France ?', NULL, NULL, '"[\"Restaurer 50 000 hectares de zones humides d''ici 2030\",\"Planter un million d''arbres d''ici 2025\",\"Réduire les émissions de CO2 de 40% d''ici 2030\",\"Créer 100 nouvelles réserves naturelles\"]"'::jsonb, 'Restaurer 50 000 hectares de zones humides d''ici 2030', 'Le texte mentionne que la France a annoncé un programme de restauration écologique portant sur 50 000 hectares de zones humides d''ici 2030.', 1, 1, '2026-07-15T02:09:15.727Z'),
('3a1c30ff-4485-41b2-a84e-629c70ba32ce', 'c865b70f-ef51-48d4-98f5-f5fe92e5d85e', '📖 Texte :

L''érosion de la biodiversité s''accélère à un rythme préoccupant, selon le dernier rapport du Groupe d''experts intergouvernemental sur l''évolution du climat (GIEC). Près d''un million d''espèces animales et végétales seraient menacées d''extinction à court terme, principalement en raison des activités humaines et du dérèglement climatique. Il est impératif que des mesures drastiques soient adoptées sans délai pour inverser cette tendance.

Face à ce constat alarmant, de nombreuses initiatives voient le jour tant au niveau local qu''international. La France a notamment annoncé le lancement d''un programme de restauration écologique portant sur 50 000 hectares de zones humides d''ici 2030. Ces écosystèmes, qui jouent un rôle crucial dans la régulation du climat et la filtration de l''eau, ont vu leur superficie diminuer de 67% au cours du siècle dernier. Il serait regrettable que les efforts ne soient pas à la hauteur de l''urgence.

Les scientifiques insistent sur la nécessité d''adopter une approche systémique. « Il ne suffit pas que nous protégions quelques espèces emblématiques ; il faut que nous préservions l''intégralité des écosystèmes dont dépend notre propre survie », explique une chercheuse du Muséum national d''histoire naturelle. Les décisions politiques prises dans les prochaines années seront déterminantes pour inverser cette tendance. Selon un sondage, 73% des citoyens européens considèrent que la protection de l''environnement devrait être une priorité absolue, ce qui témoigne d''une sensibilisation croissante de l''opinion publique.

---

Question : Que peut-on déduire de l''opinion des citoyens européens sur l''environnement ?', NULL, NULL, '"[\"Une majorité significative considère l''environnement comme une priorité\",\"Les citoyens européens sont indifférents aux questions environnementales\",\"Seule une minorité soutient les politiques environnementales\",\"Les jeunes sont les seuls à se préoccuper de l''environnement\"]"'::jsonb, 'Une majorité significative considère l''environnement comme une priorité', 'Le sondage mentionné révèle que 73% des citoyens européens considèrent la protection de l''environnement comme une priorité absolue, ce qui constitue une majorité significative.', 1, 2, '2026-07-15T02:09:15.727Z'),
('be987fe0-1df4-45e3-8b26-9b5b027892dd', 'c865b70f-ef51-48d4-98f5-f5fe92e5d85e', '📖 Texte :

L''érosion de la biodiversité s''accélère à un rythme préoccupant, selon le dernier rapport du Groupe d''experts intergouvernemental sur l''évolution du climat (GIEC). Près d''un million d''espèces animales et végétales seraient menacées d''extinction à court terme, principalement en raison des activités humaines et du dérèglement climatique. Il est impératif que des mesures drastiques soient adoptées sans délai pour inverser cette tendance.

Face à ce constat alarmant, de nombreuses initiatives voient le jour tant au niveau local qu''international. La France a notamment annoncé le lancement d''un programme de restauration écologique portant sur 50 000 hectares de zones humides d''ici 2030. Ces écosystèmes, qui jouent un rôle crucial dans la régulation du climat et la filtration de l''eau, ont vu leur superficie diminuer de 67% au cours du siècle dernier. Il serait regrettable que les efforts ne soient pas à la hauteur de l''urgence.

Les scientifiques insistent sur la nécessité d''adopter une approche systémique. « Il ne suffit pas que nous protégions quelques espèces emblématiques ; il faut que nous préservions l''intégralité des écosystèmes dont dépend notre propre survie », explique une chercheuse du Muséum national d''histoire naturelle. Les décisions politiques prises dans les prochaines années seront déterminantes pour inverser cette tendance. Selon un sondage, 73% des citoyens européens considèrent que la protection de l''environnement devrait être une priorité absolue, ce qui témoigne d''une sensibilisation croissante de l''opinion publique.

---

Question : Que signifie « approche systémique » dans le contexte de cet article ?', NULL, NULL, '"[\"Une méthode qui considère l''ensemble des interactions d''un écosystème\",\"Une classification des espèces par système informatique\",\"Un système de notation pour évaluer la biodiversité\",\"Une approche politique centralisée de l''environnement\"]"'::jsonb, 'Une méthode qui considère l''ensemble des interactions d''un écosystème', 'L''approche systémique consiste à considérer l''écosystème dans son ensemble et les interactions entre ses composantes, plutôt que de se focaliser sur quelques espèces isolées.', 1, 3, '2026-07-15T02:09:15.727Z'),
('a121b64b-c1e4-4c8d-b835-6443ca0c06a5', 'c865b70f-ef51-48d4-98f5-f5fe92e5d85e', '📖 Texte :

L''érosion de la biodiversité s''accélère à un rythme préoccupant, selon le dernier rapport du Groupe d''experts intergouvernemental sur l''évolution du climat (GIEC). Près d''un million d''espèces animales et végétales seraient menacées d''extinction à court terme, principalement en raison des activités humaines et du dérèglement climatique. Il est impératif que des mesures drastiques soient adoptées sans délai pour inverser cette tendance.

Face à ce constat alarmant, de nombreuses initiatives voient le jour tant au niveau local qu''international. La France a notamment annoncé le lancement d''un programme de restauration écologique portant sur 50 000 hectares de zones humides d''ici 2030. Ces écosystèmes, qui jouent un rôle crucial dans la régulation du climat et la filtration de l''eau, ont vu leur superficie diminuer de 67% au cours du siècle dernier. Il serait regrettable que les efforts ne soient pas à la hauteur de l''urgence.

Les scientifiques insistent sur la nécessité d''adopter une approche systémique. « Il ne suffit pas que nous protégions quelques espèces emblématiques ; il faut que nous préservions l''intégralité des écosystèmes dont dépend notre propre survie », explique une chercheuse du Muséum national d''histoire naturelle. Les décisions politiques prises dans les prochaines années seront déterminantes pour inverser cette tendance. Selon un sondage, 73% des citoyens européens considèrent que la protection de l''environnement devrait être une priorité absolue, ce qui témoigne d''une sensibilisation croissante de l''opinion publique.

---

Question : Quel est l''objectif de l''auteur en citant la chercheuse du Muséum ?', NULL, NULL, '"[\"Apporter une crédibilité scientifique à l''argumentation\",\"Donner une opinion personnelle déguisée\",\"Présenter une position minoritaire dans le débat\",\"Critiquer les politiques gouvernementales actuelles\"]"'::jsonb, 'Apporter une crédibilité scientifique à l''argumentation', 'L''auteur cite une experte reconnue pour renforcer son argumentation par une autorité scientifique crédible dans le domaine.', 1, 4, '2026-07-15T02:09:15.727Z'),
('08d535b1-d370-43ca-ba9d-57ef7cfd479d', 'c87e4e84-4353-4303-8101-412ed8de4bba', '📖 Texte :

L''intelligence artificielle générative bouleverse les codes établis du monde professionnel, suscitant à la fois enthousiasme et inquiétude. Selon une étude prospective du Ministère du Travail, près de 30% des métiers actuels pourraient être profondément transformés par ces technologies d''ici 2030, tandis que de nouvelles professions émergeraient simultanément. Il est essentiel que les travailleurs anticipent ces mutations pour ne pas être pris au dépourvu.

Les secteurs les plus impactés seraient ceux de la traduction, du journalisme, de la programmation informatique et des services juridiques. « L''IA ne remplacera pas les humains, mais il est probable que les professionnels qui sauront exploiter ces outils remplaceront ceux qui les ignorent », affirme un expert en transformation numérique interrogé par nos confrères du Monde. Cette citation illustre bien le paradoxe auquel sont confrontés les travailleurs : il faudrait qu''ils se forment aux nouvelles technologies tout en conservant leur expertise métier.

Parallèlement, le gouvernement a annoncé un plan d''investissement de deux milliards d''euros pour former les travailleurs aux compétences numériques de demain. Ce programme ambitieux comprend notamment la création de cinquante campus dédiés à l''intelligence artificielle sur l''ensemble du territoire. Les syndicats restent toutefois vigilants quant aux conditions de mise en œuvre de cette transition technologique, craignant qu''elle ne se traduise par une précarisation accrue de certains emplois. Une enquête récente indique que 62% des salariés français se disent préoccupés par l''impact de l''IA sur leur travail.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"L''impact de l''intelligence artificielle sur le marché du travail\",\"Les dernières avancées en robotique industrielle\",\"La création de nouveaux langages de programmation\",\"Les investissements dans les start-ups technologiques\"]"'::jsonb, 'L''impact de l''intelligence artificielle sur le marché du travail', 'L''article examine comment l''IA générative transforme les métiers, en présentant à la fois les opportunités et les inquiétudes que cela suscite.', 1, 0, '2026-07-15T02:09:15.727Z'),
('8d9f7ced-35e3-4e52-b5e0-05660859970e', 'c87e4e84-4353-4303-8101-412ed8de4bba', '📖 Texte :

L''intelligence artificielle générative bouleverse les codes établis du monde professionnel, suscitant à la fois enthousiasme et inquiétude. Selon une étude prospective du Ministère du Travail, près de 30% des métiers actuels pourraient être profondément transformés par ces technologies d''ici 2030, tandis que de nouvelles professions émergeraient simultanément. Il est essentiel que les travailleurs anticipent ces mutations pour ne pas être pris au dépourvu.

Les secteurs les plus impactés seraient ceux de la traduction, du journalisme, de la programmation informatique et des services juridiques. « L''IA ne remplacera pas les humains, mais il est probable que les professionnels qui sauront exploiter ces outils remplaceront ceux qui les ignorent », affirme un expert en transformation numérique interrogé par nos confrères du Monde. Cette citation illustre bien le paradoxe auquel sont confrontés les travailleurs : il faudrait qu''ils se forment aux nouvelles technologies tout en conservant leur expertise métier.

Parallèlement, le gouvernement a annoncé un plan d''investissement de deux milliards d''euros pour former les travailleurs aux compétences numériques de demain. Ce programme ambitieux comprend notamment la création de cinquante campus dédiés à l''intelligence artificielle sur l''ensemble du territoire. Les syndicats restent toutefois vigilants quant aux conditions de mise en œuvre de cette transition technologique, craignant qu''elle ne se traduise par une précarisation accrue de certains emplois. Une enquête récente indique que 62% des salariés français se disent préoccupés par l''impact de l''IA sur leur travail.

---

Question : Quel est le montant du plan d''investissement gouvernemental pour la formation numérique ?', NULL, NULL, '"[\"Un milliard d''euros\",\"Deux milliards d''euros\",\"Trois milliards d''euros\",\"Cinq cents millions d''euros\"]"'::jsonb, 'Deux milliards d''euros', 'Le texte mentionne un plan d''investissement de deux milliards d''euros pour former les travailleurs aux compétences numériques.', 1, 1, '2026-07-15T02:09:15.727Z'),
('f67d32ac-bc7e-4655-ae4c-5d7d1c0ab979', 'c87e4e84-4353-4303-8101-412ed8de4bba', '📖 Texte :

L''intelligence artificielle générative bouleverse les codes établis du monde professionnel, suscitant à la fois enthousiasme et inquiétude. Selon une étude prospective du Ministère du Travail, près de 30% des métiers actuels pourraient être profondément transformés par ces technologies d''ici 2030, tandis que de nouvelles professions émergeraient simultanément. Il est essentiel que les travailleurs anticipent ces mutations pour ne pas être pris au dépourvu.

Les secteurs les plus impactés seraient ceux de la traduction, du journalisme, de la programmation informatique et des services juridiques. « L''IA ne remplacera pas les humains, mais il est probable que les professionnels qui sauront exploiter ces outils remplaceront ceux qui les ignorent », affirme un expert en transformation numérique interrogé par nos confrères du Monde. Cette citation illustre bien le paradoxe auquel sont confrontés les travailleurs : il faudrait qu''ils se forment aux nouvelles technologies tout en conservant leur expertise métier.

Parallèlement, le gouvernement a annoncé un plan d''investissement de deux milliards d''euros pour former les travailleurs aux compétences numériques de demain. Ce programme ambitieux comprend notamment la création de cinquante campus dédiés à l''intelligence artificielle sur l''ensemble du territoire. Les syndicats restent toutefois vigilants quant aux conditions de mise en œuvre de cette transition technologique, craignant qu''elle ne se traduise par une précarisation accrue de certains emplois. Une enquête récente indique que 62% des salariés français se disent préoccupés par l''impact de l''IA sur leur travail.

---

Question : Quelle attitude les syndicats adoptent-ils face à cette transition technologique ?', NULL, NULL, '"[\"Ils sont vigilants et craignent une précarisation de certains emplois\",\"Ils s''opposent catégoriquement à toute introduction de l''IA\",\"Ils soutiennent sans réserve le plan gouvernemental\",\"Ils sont indifférents aux changements en cours\"]"'::jsonb, 'Ils sont vigilants et craignent une précarisation de certains emplois', 'Les syndicats restent vigilants et craignent que la transition ne se traduise par une précarisation accrue de certains emplois.', 1, 2, '2026-07-15T02:09:15.727Z'),
('55e15f02-8349-4877-8add-88210e4d01c7', 'c87e4e84-4353-4303-8101-412ed8de4bba', '📖 Texte :

L''intelligence artificielle générative bouleverse les codes établis du monde professionnel, suscitant à la fois enthousiasme et inquiétude. Selon une étude prospective du Ministère du Travail, près de 30% des métiers actuels pourraient être profondément transformés par ces technologies d''ici 2030, tandis que de nouvelles professions émergeraient simultanément. Il est essentiel que les travailleurs anticipent ces mutations pour ne pas être pris au dépourvu.

Les secteurs les plus impactés seraient ceux de la traduction, du journalisme, de la programmation informatique et des services juridiques. « L''IA ne remplacera pas les humains, mais il est probable que les professionnels qui sauront exploiter ces outils remplaceront ceux qui les ignorent », affirme un expert en transformation numérique interrogé par nos confrères du Monde. Cette citation illustre bien le paradoxe auquel sont confrontés les travailleurs : il faudrait qu''ils se forment aux nouvelles technologies tout en conservant leur expertise métier.

Parallèlement, le gouvernement a annoncé un plan d''investissement de deux milliards d''euros pour former les travailleurs aux compétences numériques de demain. Ce programme ambitieux comprend notamment la création de cinquante campus dédiés à l''intelligence artificielle sur l''ensemble du territoire. Les syndicats restent toutefois vigilants quant aux conditions de mise en œuvre de cette transition technologique, craignant qu''elle ne se traduise par une précarisation accrue de certains emplois. Une enquête récente indique que 62% des salariés français se disent préoccupés par l''impact de l''IA sur leur travail.

---

Question : Que signifie l''expression « précarisation accrue » dans le contexte ?', NULL, NULL, '"[\"Une augmentation de l''instabilité et de la vulnérabilité professionnelle\",\"Une amélioration des conditions de travail\",\"Une réduction du temps de travail hebdomadaire\",\"Une augmentation générale des salaires\"]"'::jsonb, 'Une augmentation de l''instabilité et de la vulnérabilité professionnelle', 'La précarisation fait référence à la dégradation des conditions de travail et à l''augmentation de l''instabilité professionnelle.', 1, 3, '2026-07-15T02:09:15.727Z'),
('c771bcf2-5024-41d1-bf03-896c7176d532', 'c87e4e84-4353-4303-8101-412ed8de4bba', '📖 Texte :

L''intelligence artificielle générative bouleverse les codes établis du monde professionnel, suscitant à la fois enthousiasme et inquiétude. Selon une étude prospective du Ministère du Travail, près de 30% des métiers actuels pourraient être profondément transformés par ces technologies d''ici 2030, tandis que de nouvelles professions émergeraient simultanément. Il est essentiel que les travailleurs anticipent ces mutations pour ne pas être pris au dépourvu.

Les secteurs les plus impactés seraient ceux de la traduction, du journalisme, de la programmation informatique et des services juridiques. « L''IA ne remplacera pas les humains, mais il est probable que les professionnels qui sauront exploiter ces outils remplaceront ceux qui les ignorent », affirme un expert en transformation numérique interrogé par nos confrères du Monde. Cette citation illustre bien le paradoxe auquel sont confrontés les travailleurs : il faudrait qu''ils se forment aux nouvelles technologies tout en conservant leur expertise métier.

Parallèlement, le gouvernement a annoncé un plan d''investissement de deux milliards d''euros pour former les travailleurs aux compétences numériques de demain. Ce programme ambitieux comprend notamment la création de cinquante campus dédiés à l''intelligence artificielle sur l''ensemble du territoire. Les syndicats restent toutefois vigilants quant aux conditions de mise en œuvre de cette transition technologique, craignant qu''elle ne se traduise par une précarisation accrue de certains emplois. Une enquête récente indique que 62% des salariés français se disent préoccupés par l''impact de l''IA sur leur travail.

---

Question : Pourquoi l''auteur cite-t-il l''expert en transformation numérique ?', NULL, NULL, '"[\"Pour illustrer le paradoxe auquel sont confrontés les travailleurs\",\"Pour donner son opinion personnelle de manière indirecte\",\"Pour contredire les affirmations du gouvernement\",\"Pour annoncer une nouvelle technologie révolutionnaire\"]"'::jsonb, 'Pour illustrer le paradoxe auquel sont confrontés les travailleurs', 'La citation de l''expert sert à illustrer le paradoxe où les travailleurs doivent se former aux nouvelles technologies tout en conservant leur expertise métier.', 1, 4, '2026-07-15T02:09:15.727Z'),
('62b933d7-808f-4d42-a1bb-c65819104768', 'd8f69719-4c9d-4d2f-a51c-fce6da6be3d0', '📖 Texte :

Le paysage culturel français connaît une mutation profonde sous l''effet des nouvelles technologies. Si les salles de cinéma et les théâtres ont vu leur fréquentation diminuer de 15% depuis la crise sanitaire, les plateformes numériques enregistrent une croissance exponentielle de leur audience, notamment chez les jeunes générations. Il serait pourtant regrettable que la culture en ligne se substitue entièrement à l''expérience physique du spectacle vivant.

Le ministère de la Culture a récemment dévoilé un plan de soutien à la création artistique doté de 300 millions d''euros, visant à accompagner les acteurs culturels dans leur transition numérique. « Il est impératif que notre patrimoine culturel demeure accessible au plus grand nombre, tout en s''adaptant aux nouveaux usages », a déclaré la ministre lors d''une conférence de presse. Ce plan prévoit notamment la numérisation de 500 000 œuvres issues des collections nationales, dont une large part n''avait jamais été accessible au public.

Les festivals, véritables institutions de la vie culturelle française, réinventent également leur modèle. Le Festival d''Avignon, plus grand rendez-vous de théâtre contemporain d''Europe, propose désormais une programmation hybride alliant représentations physiques et diffusions en ligne. Cette stratégie permet de toucher un public international tout en préservant l''essence même de l''expérience théâtrale. Selon une enquête, 58% des spectateurs estiment que le numérique enrichit leur expérience culturelle sans la remplacer.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"La transformation du secteur culturel à l''ère numérique\",\"La fermeture des salles de cinéma en France\",\"L''histoire du Festival d''Avignon\",\"Le budget du ministère de la Culture\"]"'::jsonb, 'La transformation du secteur culturel à l''ère numérique', 'L''article examine comment la culture française s''adapte au numérique, en présentant à la fois les défis et les opportunités de cette mutation.', 1, 0, '2026-07-15T02:09:15.727Z'),
('bb115981-2af8-49d5-b7fa-abad278cf548', 'd8f69719-4c9d-4d2f-a51c-fce6da6be3d0', '📖 Texte :

Le paysage culturel français connaît une mutation profonde sous l''effet des nouvelles technologies. Si les salles de cinéma et les théâtres ont vu leur fréquentation diminuer de 15% depuis la crise sanitaire, les plateformes numériques enregistrent une croissance exponentielle de leur audience, notamment chez les jeunes générations. Il serait pourtant regrettable que la culture en ligne se substitue entièrement à l''expérience physique du spectacle vivant.

Le ministère de la Culture a récemment dévoilé un plan de soutien à la création artistique doté de 300 millions d''euros, visant à accompagner les acteurs culturels dans leur transition numérique. « Il est impératif que notre patrimoine culturel demeure accessible au plus grand nombre, tout en s''adaptant aux nouveaux usages », a déclaré la ministre lors d''une conférence de presse. Ce plan prévoit notamment la numérisation de 500 000 œuvres issues des collections nationales, dont une large part n''avait jamais été accessible au public.

Les festivals, véritables institutions de la vie culturelle française, réinventent également leur modèle. Le Festival d''Avignon, plus grand rendez-vous de théâtre contemporain d''Europe, propose désormais une programmation hybride alliant représentations physiques et diffusions en ligne. Cette stratégie permet de toucher un public international tout en préservant l''essence même de l''expérience théâtrale. Selon une enquête, 58% des spectateurs estiment que le numérique enrichit leur expérience culturelle sans la remplacer.

---

Question : De combien la fréquentation des salles de cinéma et théâtres a-t-elle diminué ?', NULL, NULL, '"[\"5%\",\"10%\",\"15%\",\"20%\"]"'::jsonb, '15%', 'Le texte mentionne une diminution de 15% de la fréquentation des salles de cinéma et des théâtres depuis la crise sanitaire.', 1, 1, '2026-07-15T02:09:15.727Z'),
('1564fdfb-956e-4ced-a9b3-a5df3025f901', 'd8f69719-4c9d-4d2f-a51c-fce6da6be3d0', '📖 Texte :

Le paysage culturel français connaît une mutation profonde sous l''effet des nouvelles technologies. Si les salles de cinéma et les théâtres ont vu leur fréquentation diminuer de 15% depuis la crise sanitaire, les plateformes numériques enregistrent une croissance exponentielle de leur audience, notamment chez les jeunes générations. Il serait pourtant regrettable que la culture en ligne se substitue entièrement à l''expérience physique du spectacle vivant.

Le ministère de la Culture a récemment dévoilé un plan de soutien à la création artistique doté de 300 millions d''euros, visant à accompagner les acteurs culturels dans leur transition numérique. « Il est impératif que notre patrimoine culturel demeure accessible au plus grand nombre, tout en s''adaptant aux nouveaux usages », a déclaré la ministre lors d''une conférence de presse. Ce plan prévoit notamment la numérisation de 500 000 œuvres issues des collections nationales, dont une large part n''avait jamais été accessible au public.

Les festivals, véritables institutions de la vie culturelle française, réinventent également leur modèle. Le Festival d''Avignon, plus grand rendez-vous de théâtre contemporain d''Europe, propose désormais une programmation hybride alliant représentations physiques et diffusions en ligne. Cette stratégie permet de toucher un public international tout en préservant l''essence même de l''expérience théâtrale. Selon une enquête, 58% des spectateurs estiment que le numérique enrichit leur expérience culturelle sans la remplacer.

---

Question : Que peut-on déduire de l''attitude du ministère de la Culture ?', NULL, NULL, '"[\"Il cherche à concilier accessibilité numérique et préservation du patrimoine\",\"Il privilégie exclusivement les formes d''art traditionnelles\",\"Il réduit ses investissements dans le secteur culturel\",\"Il s''oppose à la numérisation des œuvres d''art\"]"'::jsonb, 'Il cherche à concilier accessibilité numérique et préservation du patrimoine', 'Le plan de soutien de 300 millions d''euros et la déclaration de la ministre montrent une volonté d''adapter le patrimoine culturel aux nouveaux usages numériques.', 1, 2, '2026-07-15T02:09:15.727Z'),
('b68afba2-e8ff-4b1a-b196-9e5c461fa0db', 'd8f69719-4c9d-4d2f-a51c-fce6da6be3d0', '📖 Texte :

Le paysage culturel français connaît une mutation profonde sous l''effet des nouvelles technologies. Si les salles de cinéma et les théâtres ont vu leur fréquentation diminuer de 15% depuis la crise sanitaire, les plateformes numériques enregistrent une croissance exponentielle de leur audience, notamment chez les jeunes générations. Il serait pourtant regrettable que la culture en ligne se substitue entièrement à l''expérience physique du spectacle vivant.

Le ministère de la Culture a récemment dévoilé un plan de soutien à la création artistique doté de 300 millions d''euros, visant à accompagner les acteurs culturels dans leur transition numérique. « Il est impératif que notre patrimoine culturel demeure accessible au plus grand nombre, tout en s''adaptant aux nouveaux usages », a déclaré la ministre lors d''une conférence de presse. Ce plan prévoit notamment la numérisation de 500 000 œuvres issues des collections nationales, dont une large part n''avait jamais été accessible au public.

Les festivals, véritables institutions de la vie culturelle française, réinventent également leur modèle. Le Festival d''Avignon, plus grand rendez-vous de théâtre contemporain d''Europe, propose désormais une programmation hybride alliant représentations physiques et diffusions en ligne. Cette stratégie permet de toucher un public international tout en préservant l''essence même de l''expérience théâtrale. Selon une enquête, 58% des spectateurs estiment que le numérique enrichit leur expérience culturelle sans la remplacer.

---

Question : Que signifie « programmation hybride » dans le contexte du Festival d''Avignon ?', NULL, NULL, '"[\"Un mélange de représentations physiques et de diffusions en ligne\",\"Une sélection d''œuvres mélangeant théâtre et danse\",\"Un programme organisé en collaboration avec plusieurs pays\",\"Un calendrier alternant spectacles gratuits et payants\"]"'::jsonb, 'Un mélange de représentations physiques et de diffusions en ligne', 'La programmation hybride du Festival d''Avignon combine des représentations en présentiel et des diffusions en ligne pour toucher un public plus large.', 1, 3, '2026-07-15T02:09:15.727Z'),
('27a880ed-c7cb-46b5-a517-0eafb680023d', 'd8f69719-4c9d-4d2f-a51c-fce6da6be3d0', '📖 Texte :

Le paysage culturel français connaît une mutation profonde sous l''effet des nouvelles technologies. Si les salles de cinéma et les théâtres ont vu leur fréquentation diminuer de 15% depuis la crise sanitaire, les plateformes numériques enregistrent une croissance exponentielle de leur audience, notamment chez les jeunes générations. Il serait pourtant regrettable que la culture en ligne se substitue entièrement à l''expérience physique du spectacle vivant.

Le ministère de la Culture a récemment dévoilé un plan de soutien à la création artistique doté de 300 millions d''euros, visant à accompagner les acteurs culturels dans leur transition numérique. « Il est impératif que notre patrimoine culturel demeure accessible au plus grand nombre, tout en s''adaptant aux nouveaux usages », a déclaré la ministre lors d''une conférence de presse. Ce plan prévoit notamment la numérisation de 500 000 œuvres issues des collections nationales, dont une large part n''avait jamais été accessible au public.

Les festivals, véritables institutions de la vie culturelle française, réinventent également leur modèle. Le Festival d''Avignon, plus grand rendez-vous de théâtre contemporain d''Europe, propose désormais une programmation hybride alliant représentations physiques et diffusions en ligne. Cette stratégie permet de toucher un public international tout en préservant l''essence même de l''expérience théâtrale. Selon une enquête, 58% des spectateurs estiment que le numérique enrichit leur expérience culturelle sans la remplacer.

---

Question : Quel est l''objectif de l''article en mentionnant le sondage sur les spectateurs ?', NULL, NULL, '"[\"Montrer que le numérique est perçu comme un enrichissement et non un remplacement\",\"Démontrer que les spectateurs préfèrent le numérique au spectacle vivant\",\"Prouver que la culture traditionnelle est en voie de disparition\",\"Illustrer le désintérêt des jeunes pour la culture\"]"'::jsonb, 'Montrer que le numérique est perçu comme un enrichissement et non un remplacement', 'Le sondage indique que 58% des spectateurs estiment que le numérique enrichit leur expérience culturelle sans la remplacer, ce qui soutient l''idée d''une complémentarité.', 1, 4, '2026-07-15T02:09:15.727Z'),
('29379ff8-f49c-434c-8e1f-593a63c958bb', '2aa02016-1de3-4c8d-b9aa-b656faf793d8', '📖 Texte :

Le Canada renforce sa politique d''immigration francophone en dehors du Québec, avec l''objectif ambitieux d''atteindre 12% d''immigrants francophones d''ici 2028 dans les provinces et territoires anglophones. Cette stratégie, qui s''inscrit dans le cadre de la Loi sur les langues officielles, vise à contrer le déclin du poids démographique des communautés francophones hors Québec. Il est essentiel que les nouveaux arrivants puissent s''intégrer pleinement dans la société canadienne.

« La maîtrise du français constitue un atout indéniable pour les candidats à l''immigration, leur permettant d''accumuler des points supplémentaires dans le système Entrée express », rappelle une conseillère en immigration basée à Toronto. Les données officielles indiquent que les candidats francophones obtiennent en moyenne des scores plus élevés et que leur dossier est traité plus rapidement. Le gouvernement fédéral souhaite que les provinces collaborent davantage à la mise en œuvre de cette stratégie linguistique.

Les nouveaux arrivants francophones bénéficient par ailleurs de programmes d''accompagnement spécifiques, notamment des services d''établissement et des cours de perfectionnement linguistique. Cependant, des défis persistent, particulièrement en ce qui concerne l''accès à l''emploi dans leur domaine de compétence. Des associations militent pour que les diplômes étrangers soient mieux reconnus et que l''accompagnement vers l''intégration professionnelle soit renforcé. Selon une étude récente, 71% des immigrants francophones trouvent un emploi dans leur domaine dans les deux ans suivant leur arrivée, un chiffre encourageant mais qui pourrait encore être amélioré.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"La politique d''immigration francophone au Canada et ses enjeux\",\"Les procédures de demande de visa pour le Canada\",\"La comparaison entre les systèmes d''immigration canadien et américain\",\"Les difficultés économiques du Québec\"]"'::jsonb, 'La politique d''immigration francophone au Canada et ses enjeux', 'L''article traite de la stratégie canadienne visant à augmenter l''immigration francophone hors Québec et des mesures d''accompagnement pour les immigrants.', 1, 0, '2026-07-15T02:09:15.727Z'),
('4ef5bc62-66fa-43ca-8691-6a0bd398f86d', '2aa02016-1de3-4c8d-b9aa-b656faf793d8', '📖 Texte :

Le Canada renforce sa politique d''immigration francophone en dehors du Québec, avec l''objectif ambitieux d''atteindre 12% d''immigrants francophones d''ici 2028 dans les provinces et territoires anglophones. Cette stratégie, qui s''inscrit dans le cadre de la Loi sur les langues officielles, vise à contrer le déclin du poids démographique des communautés francophones hors Québec. Il est essentiel que les nouveaux arrivants puissent s''intégrer pleinement dans la société canadienne.

« La maîtrise du français constitue un atout indéniable pour les candidats à l''immigration, leur permettant d''accumuler des points supplémentaires dans le système Entrée express », rappelle une conseillère en immigration basée à Toronto. Les données officielles indiquent que les candidats francophones obtiennent en moyenne des scores plus élevés et que leur dossier est traité plus rapidement. Le gouvernement fédéral souhaite que les provinces collaborent davantage à la mise en œuvre de cette stratégie linguistique.

Les nouveaux arrivants francophones bénéficient par ailleurs de programmes d''accompagnement spécifiques, notamment des services d''établissement et des cours de perfectionnement linguistique. Cependant, des défis persistent, particulièrement en ce qui concerne l''accès à l''emploi dans leur domaine de compétence. Des associations militent pour que les diplômes étrangers soient mieux reconnus et que l''accompagnement vers l''intégration professionnelle soit renforcé. Selon une étude récente, 71% des immigrants francophones trouvent un emploi dans leur domaine dans les deux ans suivant leur arrivée, un chiffre encourageant mais qui pourrait encore être amélioré.

---

Question : Quel est l''objectif chiffré concernant les immigrants francophones d''ici 2028 ?', NULL, NULL, '"[\"8%\",\"10%\",\"12%\",\"15%\"]"'::jsonb, '12%', 'Le Canada vise à atteindre 12% d''immigrants francophones d''ici 2028 dans les provinces et territoires anglophones.', 1, 1, '2026-07-15T02:09:15.727Z'),
('b8b38508-a578-4824-b272-f6d34ee89ad6', '2aa02016-1de3-4c8d-b9aa-b656faf793d8', '📖 Texte :

Le Canada renforce sa politique d''immigration francophone en dehors du Québec, avec l''objectif ambitieux d''atteindre 12% d''immigrants francophones d''ici 2028 dans les provinces et territoires anglophones. Cette stratégie, qui s''inscrit dans le cadre de la Loi sur les langues officielles, vise à contrer le déclin du poids démographique des communautés francophones hors Québec. Il est essentiel que les nouveaux arrivants puissent s''intégrer pleinement dans la société canadienne.

« La maîtrise du français constitue un atout indéniable pour les candidats à l''immigration, leur permettant d''accumuler des points supplémentaires dans le système Entrée express », rappelle une conseillère en immigration basée à Toronto. Les données officielles indiquent que les candidats francophones obtiennent en moyenne des scores plus élevés et que leur dossier est traité plus rapidement. Le gouvernement fédéral souhaite que les provinces collaborent davantage à la mise en œuvre de cette stratégie linguistique.

Les nouveaux arrivants francophones bénéficient par ailleurs de programmes d''accompagnement spécifiques, notamment des services d''établissement et des cours de perfectionnement linguistique. Cependant, des défis persistent, particulièrement en ce qui concerne l''accès à l''emploi dans leur domaine de compétence. Des associations militent pour que les diplômes étrangers soient mieux reconnus et que l''accompagnement vers l''intégration professionnelle soit renforcé. Selon une étude récente, 71% des immigrants francophones trouvent un emploi dans leur domaine dans les deux ans suivant leur arrivée, un chiffre encourageant mais qui pourrait encore être amélioré.

---

Question : Que peut-on déduire de l''avantage des candidats francophones dans le système Entrée express ?', NULL, NULL, '"[\"Le français offre un avantage concret dans le processus de sélection\",\"Le français n''a aucun impact sur le score des candidats\",\"Seuls les candidats bilingues sont acceptés\",\"L''anglais est le seul critère linguistique pris en compte\"]"'::jsonb, 'Le français offre un avantage concret dans le processus de sélection', 'Le texte indique que les candidats francophones obtiennent des points supplémentaires et que leur dossier est traité plus rapidement, confirmant l''avantage concret du français.', 1, 2, '2026-07-15T02:09:15.727Z'),
('a9b92494-90b8-4842-a801-2d1fe9310217', '2aa02016-1de3-4c8d-b9aa-b656faf793d8', '📖 Texte :

Le Canada renforce sa politique d''immigration francophone en dehors du Québec, avec l''objectif ambitieux d''atteindre 12% d''immigrants francophones d''ici 2028 dans les provinces et territoires anglophones. Cette stratégie, qui s''inscrit dans le cadre de la Loi sur les langues officielles, vise à contrer le déclin du poids démographique des communautés francophones hors Québec. Il est essentiel que les nouveaux arrivants puissent s''intégrer pleinement dans la société canadienne.

« La maîtrise du français constitue un atout indéniable pour les candidats à l''immigration, leur permettant d''accumuler des points supplémentaires dans le système Entrée express », rappelle une conseillère en immigration basée à Toronto. Les données officielles indiquent que les candidats francophones obtiennent en moyenne des scores plus élevés et que leur dossier est traité plus rapidement. Le gouvernement fédéral souhaite que les provinces collaborent davantage à la mise en œuvre de cette stratégie linguistique.

Les nouveaux arrivants francophones bénéficient par ailleurs de programmes d''accompagnement spécifiques, notamment des services d''établissement et des cours de perfectionnement linguistique. Cependant, des défis persistent, particulièrement en ce qui concerne l''accès à l''emploi dans leur domaine de compétence. Des associations militent pour que les diplômes étrangers soient mieux reconnus et que l''accompagnement vers l''intégration professionnelle soit renforcé. Selon une étude récente, 71% des immigrants francophones trouvent un emploi dans leur domaine dans les deux ans suivant leur arrivée, un chiffre encourageant mais qui pourrait encore être amélioré.

---

Question : Que signifie « vecteur d''intégration » dans le titre de l''article ?', NULL, NULL, '"[\"Un moyen qui facilite et accélère l''intégration dans la société\",\"Un obstacle qui complique l''installation des immigrants\",\"Une méthode de transport pour les nouveaux arrivants\",\"Un document administratif requis pour l''immigration\"]"'::jsonb, 'Un moyen qui facilite et accélère l''intégration dans la société', 'Un « vecteur d''intégration » est un élément qui facilite le processus d''intégration des immigrants dans leur nouveau pays.', 1, 3, '2026-07-15T02:09:15.727Z'),
('6125aa6b-4894-4749-96eb-41b7d0470baf', '2aa02016-1de3-4c8d-b9aa-b656faf793d8', '📖 Texte :

Le Canada renforce sa politique d''immigration francophone en dehors du Québec, avec l''objectif ambitieux d''atteindre 12% d''immigrants francophones d''ici 2028 dans les provinces et territoires anglophones. Cette stratégie, qui s''inscrit dans le cadre de la Loi sur les langues officielles, vise à contrer le déclin du poids démographique des communautés francophones hors Québec. Il est essentiel que les nouveaux arrivants puissent s''intégrer pleinement dans la société canadienne.

« La maîtrise du français constitue un atout indéniable pour les candidats à l''immigration, leur permettant d''accumuler des points supplémentaires dans le système Entrée express », rappelle une conseillère en immigration basée à Toronto. Les données officielles indiquent que les candidats francophones obtiennent en moyenne des scores plus élevés et que leur dossier est traité plus rapidement. Le gouvernement fédéral souhaite que les provinces collaborent davantage à la mise en œuvre de cette stratégie linguistique.

Les nouveaux arrivants francophones bénéficient par ailleurs de programmes d''accompagnement spécifiques, notamment des services d''établissement et des cours de perfectionnement linguistique. Cependant, des défis persistent, particulièrement en ce qui concerne l''accès à l''emploi dans leur domaine de compétence. Des associations militent pour que les diplômes étrangers soient mieux reconnus et que l''accompagnement vers l''intégration professionnelle soit renforcé. Selon une étude récente, 71% des immigrants francophones trouvent un emploi dans leur domaine dans les deux ans suivant leur arrivée, un chiffre encourageant mais qui pourrait encore être amélioré.

---

Question : Pourquoi l''auteur mentionne-t-il le chiffre de 71% d''emploi dans le domaine ?', NULL, NULL, '"[\"Pour montrer un résultat encourageant tout en suggérant des marges d''amélioration\",\"Pour prouver que l''intégration professionnelle est un échec\",\"Pour démontrer que le système actuel est parfait\",\"Pour critiquer les politiques d''immigration actuelles\"]"'::jsonb, 'Pour montrer un résultat encourageant tout en suggérant des marges d''amélioration', 'Le chiffre de 71% est présenté comme encourageant, mais l''auteur ajoute qu''il « pourrait encore être amélioré », ce qui montre une évaluation nuancée.', 1, 4, '2026-07-15T02:09:15.727Z'),
('35d67475-4e61-44b3-9bf6-8e0e5fef237d', '18995ead-9a60-4d56-b5aa-9b99dd5590f9', '📖 Texte :

Le système de santé français, longtemps considéré comme l''un des meilleurs au monde, traverse une période de turbulences sans précédent. La pénurie de personnel soignant, couplée au vieillissement de la population, exerce une pression croissante sur les hôpitaux publics. Selon un rapport du Haut Conseil de la santé publique, la France compterait 3,5 millions de personnes âgées dépendantes en 2030, soit une augmentation de 40% par rapport à 2020. Il est urgent que des mesures structurelles soient adoptées pour faire face à cette situation.

Face à cette situation, les pouvoirs publics misent sur la télémédecine et les innovations technologiques. « Les consultations à distance ont connu une augmentation de 500% depuis 2020, et cette tendance devrait se poursuivre », explique un chercheur en santé numérique. Le gouvernement a alloué une enveloppe de 500 millions d''euros pour moderniser les infrastructures hospitalières et développer les soins à domicile. Il faudrait que ces investissements soient pérennisés pour garantir leur efficacité à long terme.

Les professionnels de santé réclament quant à eux une revalorisation salariale et des conditions de travail plus attractives. « Il serait illusoire de vouloir réformer le système sans investir dans les ressources humaines », prévient un syndicat médical. La question du financement à long terme de la protection sociale demeure au cœur des débats politiques, d''autant que le vieillissement démographique devrait accroître les dépenses de santé de 1,5% par an en moyenne jusqu''en 2040, selon les projections de la Commission des comptes de la sécurité sociale.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"Les défis du système de santé face au vieillissement de la population\",\"Les nouvelles techniques chirurgicales\",\"La fabrication de médicaments en France\",\"La formation des étudiants en médecine\"]"'::jsonb, 'Les défis du système de santé face au vieillissement de la population', 'L''article examine les pressions exercées sur le système de santé français par le vieillissement démographique et la pénurie de personnel soignant.', 1, 0, '2026-07-15T02:09:15.727Z'),
('3c38907c-6282-4c8e-a40f-ae6dd7185b06', '18995ead-9a60-4d56-b5aa-9b99dd5590f9', '📖 Texte :

Le système de santé français, longtemps considéré comme l''un des meilleurs au monde, traverse une période de turbulences sans précédent. La pénurie de personnel soignant, couplée au vieillissement de la population, exerce une pression croissante sur les hôpitaux publics. Selon un rapport du Haut Conseil de la santé publique, la France compterait 3,5 millions de personnes âgées dépendantes en 2030, soit une augmentation de 40% par rapport à 2020. Il est urgent que des mesures structurelles soient adoptées pour faire face à cette situation.

Face à cette situation, les pouvoirs publics misent sur la télémédecine et les innovations technologiques. « Les consultations à distance ont connu une augmentation de 500% depuis 2020, et cette tendance devrait se poursuivre », explique un chercheur en santé numérique. Le gouvernement a alloué une enveloppe de 500 millions d''euros pour moderniser les infrastructures hospitalières et développer les soins à domicile. Il faudrait que ces investissements soient pérennisés pour garantir leur efficacité à long terme.

Les professionnels de santé réclament quant à eux une revalorisation salariale et des conditions de travail plus attractives. « Il serait illusoire de vouloir réformer le système sans investir dans les ressources humaines », prévient un syndicat médical. La question du financement à long terme de la protection sociale demeure au cœur des débats politiques, d''autant que le vieillissement démographique devrait accroître les dépenses de santé de 1,5% par an en moyenne jusqu''en 2040, selon les projections de la Commission des comptes de la sécurité sociale.

---

Question : Combien de personnes âgées dépendantes la France comptera-t-elle en 2030 ?', NULL, NULL, '"[\"2,5 millions\",\"3 millions\",\"3,5 millions\",\"4 millions\"]"'::jsonb, '3,5 millions', 'Selon le rapport du Haut Conseil de la santé publique, la France comptera 3,5 millions de personnes âgées dépendantes en 2030.', 1, 1, '2026-07-15T02:09:15.727Z'),
('b3e7f340-bc2e-4607-be03-2b35ec8fe9c3', '18995ead-9a60-4d56-b5aa-9b99dd5590f9', '📖 Texte :

Le système de santé français, longtemps considéré comme l''un des meilleurs au monde, traverse une période de turbulences sans précédent. La pénurie de personnel soignant, couplée au vieillissement de la population, exerce une pression croissante sur les hôpitaux publics. Selon un rapport du Haut Conseil de la santé publique, la France compterait 3,5 millions de personnes âgées dépendantes en 2030, soit une augmentation de 40% par rapport à 2020. Il est urgent que des mesures structurelles soient adoptées pour faire face à cette situation.

Face à cette situation, les pouvoirs publics misent sur la télémédecine et les innovations technologiques. « Les consultations à distance ont connu une augmentation de 500% depuis 2020, et cette tendance devrait se poursuivre », explique un chercheur en santé numérique. Le gouvernement a alloué une enveloppe de 500 millions d''euros pour moderniser les infrastructures hospitalières et développer les soins à domicile. Il faudrait que ces investissements soient pérennisés pour garantir leur efficacité à long terme.

Les professionnels de santé réclament quant à eux une revalorisation salariale et des conditions de travail plus attractives. « Il serait illusoire de vouloir réformer le système sans investir dans les ressources humaines », prévient un syndicat médical. La question du financement à long terme de la protection sociale demeure au cœur des débats politiques, d''autant que le vieillissement démographique devrait accroître les dépenses de santé de 1,5% par an en moyenne jusqu''en 2040, selon les projections de la Commission des comptes de la sécurité sociale.

---

Question : Quelle est l''attitude des professionnels de santé face aux réformes ?', NULL, NULL, '"[\"Ils estiment que les réformes doivent s''accompagner d''investissements humains\",\"Ils refusent toute forme de modernisation du système\",\"Ils sont satisfaits des conditions de travail actuelles\",\"Ils préfèrent que les réformes soient reportées\"]"'::jsonb, 'Ils estiment que les réformes doivent s''accompagner d''investissements humains', 'Le syndicat médical prévient qu''il est illusoire de réformer sans investir dans les ressources humaines, ce qui implique une revalorisation salariale et de meilleures conditions de travail.', 1, 2, '2026-07-15T02:09:15.727Z'),
('83eab736-35f8-4630-99aa-6c928cecea4c', '18995ead-9a60-4d56-b5aa-9b99dd5590f9', '📖 Texte :

Le système de santé français, longtemps considéré comme l''un des meilleurs au monde, traverse une période de turbulences sans précédent. La pénurie de personnel soignant, couplée au vieillissement de la population, exerce une pression croissante sur les hôpitaux publics. Selon un rapport du Haut Conseil de la santé publique, la France compterait 3,5 millions de personnes âgées dépendantes en 2030, soit une augmentation de 40% par rapport à 2020. Il est urgent que des mesures structurelles soient adoptées pour faire face à cette situation.

Face à cette situation, les pouvoirs publics misent sur la télémédecine et les innovations technologiques. « Les consultations à distance ont connu une augmentation de 500% depuis 2020, et cette tendance devrait se poursuivre », explique un chercheur en santé numérique. Le gouvernement a alloué une enveloppe de 500 millions d''euros pour moderniser les infrastructures hospitalières et développer les soins à domicile. Il faudrait que ces investissements soient pérennisés pour garantir leur efficacité à long terme.

Les professionnels de santé réclament quant à eux une revalorisation salariale et des conditions de travail plus attractives. « Il serait illusoire de vouloir réformer le système sans investir dans les ressources humaines », prévient un syndicat médical. La question du financement à long terme de la protection sociale demeure au cœur des débats politiques, d''autant que le vieillissement démographique devrait accroître les dépenses de santé de 1,5% par an en moyenne jusqu''en 2040, selon les projections de la Commission des comptes de la sécurité sociale.

---

Question : Que signifie « revalorisation salariale » dans le contexte ?', NULL, NULL, '"[\"Une augmentation des salaires et des avantages financiers\",\"Une diminution des primes et des bonus\",\"Un gel des salaires pour une durée déterminée\",\"Un changement de système de paie\"]"'::jsonb, 'Une augmentation des salaires et des avantages financiers', 'La revalorisation salariale fait référence à l''augmentation des rémunérations, que les professionnels de santé réclament pour rendre le métier plus attractif.', 1, 3, '2026-07-15T02:09:15.727Z'),
('6588f0cd-777e-4381-86dc-5269d6b7d373', '18995ead-9a60-4d56-b5aa-9b99dd5590f9', '📖 Texte :

Le système de santé français, longtemps considéré comme l''un des meilleurs au monde, traverse une période de turbulences sans précédent. La pénurie de personnel soignant, couplée au vieillissement de la population, exerce une pression croissante sur les hôpitaux publics. Selon un rapport du Haut Conseil de la santé publique, la France compterait 3,5 millions de personnes âgées dépendantes en 2030, soit une augmentation de 40% par rapport à 2020. Il est urgent que des mesures structurelles soient adoptées pour faire face à cette situation.

Face à cette situation, les pouvoirs publics misent sur la télémédecine et les innovations technologiques. « Les consultations à distance ont connu une augmentation de 500% depuis 2020, et cette tendance devrait se poursuivre », explique un chercheur en santé numérique. Le gouvernement a alloué une enveloppe de 500 millions d''euros pour moderniser les infrastructures hospitalières et développer les soins à domicile. Il faudrait que ces investissements soient pérennisés pour garantir leur efficacité à long terme.

Les professionnels de santé réclament quant à eux une revalorisation salariale et des conditions de travail plus attractives. « Il serait illusoire de vouloir réformer le système sans investir dans les ressources humaines », prévient un syndicat médical. La question du financement à long terme de la protection sociale demeure au cœur des débats politiques, d''autant que le vieillissement démographique devrait accroître les dépenses de santé de 1,5% par an en moyenne jusqu''en 2040, selon les projections de la Commission des comptes de la sécurité sociale.

---

Question : Quel est l''objectif de l''auteur en citant les projections de la Commission des comptes ?', NULL, NULL, '"[\"Souligner l''ampleur des défis financiers à venir pour la santé\",\"Annoncer une baisse prochaine des dépenses de santé\",\"Critiquer la gestion financière des hôpitaux\",\"Promouvoir un nouveau système d''assurance maladie\"]"'::jsonb, 'Souligner l''ampleur des défis financiers à venir pour la santé', 'Les projections d''une augmentation annuelle de 1,5% des dépenses de santé jusqu''en 2040 soulignent l''ampleur des défis financiers à long terme.', 1, 4, '2026-07-15T02:09:15.727Z'),
('de9dc5d0-72c8-4283-bfa8-0c658f50d639', '83f70f75-375d-41eb-95e2-eb427f79566d', '📖 Texte :

Le système éducatif français est engagé dans une vaste réforme visant à adapter l''enseignement aux enjeux contemporains. Au cœur de cette transformation, l''accent est mis sur l''apprentissage des langues étrangères, le développement des compétences numériques et l''éducation au développement durable. Il est indispensable que les élèves acquièrent les compétences qui leur permettront de s''épanouir dans un monde en constante évolution.

« Il convient que nos élèves soient préparés à évoluer dans un monde où les frontières professionnelles et géographiques sont de plus en plus poreuses », souligne un rapport de l''OCDE. Les résultats de la France aux évaluations internationales PISA, bien qu''en légère amélioration, demeurent inférieurs à la moyenne des pays comparables. Cette situation a motivé l''introduction de nouvelles méthodes pédagogiques, notamment l''enseignement par projet et l''évaluation par compétences. Il faudrait que les enseignants soient mieux formés à ces nouvelles approches pour qu''elles portent leurs fruits.

La réforme prévoit également la création de « cités éducatives » dans les quartiers prioritaires, visant à renforcer la coopération entre l''école, les familles et les acteurs locaux. Un budget supplémentaire de 800 millions d''euros a été débloqué pour réduire les effectifs dans les classes et améliorer l''équité territoriale. Le taux de décrochage scolaire, qui touche encore près de 8% des jeunes Français, est jugé préoccupant par les syndicats enseignants. Selon une enquête, 64% des parents estiment que l''école devrait accorder une place plus importante à l''éducation aux médias et à l''information.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"Les réformes du système éducatif français pour l''adapter au XXIe siècle\",\"Les résultats de la France aux évaluations internationales\",\"La construction de nouvelles écoles dans les quartiers prioritaires\",\"Le recrutement des enseignants en France\"]"'::jsonb, 'Les réformes du système éducatif français pour l''adapter au XXIe siècle', 'L''article présente les différentes mesures de la réforme éducative visant à adapter l''enseignement aux défis contemporains.', 1, 0, '2026-07-15T02:09:15.727Z'),
('e7135548-3d13-4e01-971b-755f1fd8420d', '83f70f75-375d-41eb-95e2-eb427f79566d', '📖 Texte :

Le système éducatif français est engagé dans une vaste réforme visant à adapter l''enseignement aux enjeux contemporains. Au cœur de cette transformation, l''accent est mis sur l''apprentissage des langues étrangères, le développement des compétences numériques et l''éducation au développement durable. Il est indispensable que les élèves acquièrent les compétences qui leur permettront de s''épanouir dans un monde en constante évolution.

« Il convient que nos élèves soient préparés à évoluer dans un monde où les frontières professionnelles et géographiques sont de plus en plus poreuses », souligne un rapport de l''OCDE. Les résultats de la France aux évaluations internationales PISA, bien qu''en légère amélioration, demeurent inférieurs à la moyenne des pays comparables. Cette situation a motivé l''introduction de nouvelles méthodes pédagogiques, notamment l''enseignement par projet et l''évaluation par compétences. Il faudrait que les enseignants soient mieux formés à ces nouvelles approches pour qu''elles portent leurs fruits.

La réforme prévoit également la création de « cités éducatives » dans les quartiers prioritaires, visant à renforcer la coopération entre l''école, les familles et les acteurs locaux. Un budget supplémentaire de 800 millions d''euros a été débloqué pour réduire les effectifs dans les classes et améliorer l''équité territoriale. Le taux de décrochage scolaire, qui touche encore près de 8% des jeunes Français, est jugé préoccupant par les syndicats enseignants. Selon une enquête, 64% des parents estiment que l''école devrait accorder une place plus importante à l''éducation aux médias et à l''information.

---

Question : Quel est le budget supplémentaire débloqué pour la réforme éducative ?', NULL, NULL, '"[\"500 millions d''euros\",\"600 millions d''euros\",\"800 millions d''euros\",\"1 milliard d''euros\"]"'::jsonb, '800 millions d''euros', 'Le texte mentionne un budget supplémentaire de 800 millions d''euros pour réduire les effectifs dans les classes et améliorer l''équité territoriale.', 1, 1, '2026-07-15T02:09:15.727Z'),
('2ff7b7ad-89a0-4b48-abce-6c74890ba9b7', '83f70f75-375d-41eb-95e2-eb427f79566d', '📖 Texte :

Le système éducatif français est engagé dans une vaste réforme visant à adapter l''enseignement aux enjeux contemporains. Au cœur de cette transformation, l''accent est mis sur l''apprentissage des langues étrangères, le développement des compétences numériques et l''éducation au développement durable. Il est indispensable que les élèves acquièrent les compétences qui leur permettront de s''épanouir dans un monde en constante évolution.

« Il convient que nos élèves soient préparés à évoluer dans un monde où les frontières professionnelles et géographiques sont de plus en plus poreuses », souligne un rapport de l''OCDE. Les résultats de la France aux évaluations internationales PISA, bien qu''en légère amélioration, demeurent inférieurs à la moyenne des pays comparables. Cette situation a motivé l''introduction de nouvelles méthodes pédagogiques, notamment l''enseignement par projet et l''évaluation par compétences. Il faudrait que les enseignants soient mieux formés à ces nouvelles approches pour qu''elles portent leurs fruits.

La réforme prévoit également la création de « cités éducatives » dans les quartiers prioritaires, visant à renforcer la coopération entre l''école, les familles et les acteurs locaux. Un budget supplémentaire de 800 millions d''euros a été débloqué pour réduire les effectifs dans les classes et améliorer l''équité territoriale. Le taux de décrochage scolaire, qui touche encore près de 8% des jeunes Français, est jugé préoccupant par les syndicats enseignants. Selon une enquête, 64% des parents estiment que l''école devrait accorder une place plus importante à l''éducation aux médias et à l''information.

---

Question : Que peut-on déduire des résultats de la France aux évaluations PISA ?', NULL, NULL, '"[\"Ils sont en progrès mais insuffisants par rapport aux pays comparables\",\"La France est classée première mondialement\",\"Les résultats sont en baisse constante depuis dix ans\",\"La France a refusé de participer aux évaluations\"]"'::jsonb, 'Ils sont en progrès mais insuffisants par rapport aux pays comparables', 'Le texte indique que les résultats sont « en légère amélioration » mais « demeurent inférieurs à la moyenne des pays comparables », ce qui suggère des progrès insuffisants.', 1, 2, '2026-07-15T02:09:15.727Z'),
('36c4045a-fb5e-445e-8df9-3f226d856140', '83f70f75-375d-41eb-95e2-eb427f79566d', '📖 Texte :

Le système éducatif français est engagé dans une vaste réforme visant à adapter l''enseignement aux enjeux contemporains. Au cœur de cette transformation, l''accent est mis sur l''apprentissage des langues étrangères, le développement des compétences numériques et l''éducation au développement durable. Il est indispensable que les élèves acquièrent les compétences qui leur permettront de s''épanouir dans un monde en constante évolution.

« Il convient que nos élèves soient préparés à évoluer dans un monde où les frontières professionnelles et géographiques sont de plus en plus poreuses », souligne un rapport de l''OCDE. Les résultats de la France aux évaluations internationales PISA, bien qu''en légère amélioration, demeurent inférieurs à la moyenne des pays comparables. Cette situation a motivé l''introduction de nouvelles méthodes pédagogiques, notamment l''enseignement par projet et l''évaluation par compétences. Il faudrait que les enseignants soient mieux formés à ces nouvelles approches pour qu''elles portent leurs fruits.

La réforme prévoit également la création de « cités éducatives » dans les quartiers prioritaires, visant à renforcer la coopération entre l''école, les familles et les acteurs locaux. Un budget supplémentaire de 800 millions d''euros a été débloqué pour réduire les effectifs dans les classes et améliorer l''équité territoriale. Le taux de décrochage scolaire, qui touche encore près de 8% des jeunes Français, est jugé préoccupant par les syndicats enseignants. Selon une enquête, 64% des parents estiment que l''école devrait accorder une place plus importante à l''éducation aux médias et à l''information.

---

Question : Que signifie « équité territoriale » dans le contexte de l''éducation ?', NULL, NULL, '"[\"Une répartition équitable des moyens éducatifs sur l''ensemble du territoire\",\"Une division du territoire en zones scolaires égales\",\"Un système de transport scolaire gratuit pour tous\",\"Une uniformisation des programmes dans toutes les régions\"]"'::jsonb, 'Une répartition équitable des moyens éducatifs sur l''ensemble du territoire', 'L''équité territoriale vise à garantir que tous les élèves, quel que soit leur lieu de résidence, bénéficient de moyens éducatifs comparables.', 1, 3, '2026-07-15T02:09:15.727Z'),
('e8902555-9fba-43e3-be28-d1c32954020b', '83f70f75-375d-41eb-95e2-eb427f79566d', '📖 Texte :

Le système éducatif français est engagé dans une vaste réforme visant à adapter l''enseignement aux enjeux contemporains. Au cœur de cette transformation, l''accent est mis sur l''apprentissage des langues étrangères, le développement des compétences numériques et l''éducation au développement durable. Il est indispensable que les élèves acquièrent les compétences qui leur permettront de s''épanouir dans un monde en constante évolution.

« Il convient que nos élèves soient préparés à évoluer dans un monde où les frontières professionnelles et géographiques sont de plus en plus poreuses », souligne un rapport de l''OCDE. Les résultats de la France aux évaluations internationales PISA, bien qu''en légère amélioration, demeurent inférieurs à la moyenne des pays comparables. Cette situation a motivé l''introduction de nouvelles méthodes pédagogiques, notamment l''enseignement par projet et l''évaluation par compétences. Il faudrait que les enseignants soient mieux formés à ces nouvelles approches pour qu''elles portent leurs fruits.

La réforme prévoit également la création de « cités éducatives » dans les quartiers prioritaires, visant à renforcer la coopération entre l''école, les familles et les acteurs locaux. Un budget supplémentaire de 800 millions d''euros a été débloqué pour réduire les effectifs dans les classes et améliorer l''équité territoriale. Le taux de décrochage scolaire, qui touche encore près de 8% des jeunes Français, est jugé préoccupant par les syndicats enseignants. Selon une enquête, 64% des parents estiment que l''école devrait accorder une place plus importante à l''éducation aux médias et à l''information.

---

Question : Pourquoi l''auteur mentionne-t-il l''enquête sur les parents concernant l''éducation aux médias ?', NULL, NULL, '"[\"Pour montrer une demande sociale en faveur de nouvelles compétences éducatives\",\"Pour démontrer que les parents sont satisfaits du système actuel\",\"Pour prouver que l''éducation aux médias est déjà bien enseignée\",\"Pour critiquer l''absence totale de formation des enseignants\"]"'::jsonb, 'Pour montrer une demande sociale en faveur de nouvelles compétences éducatives', 'Le fait que 64% des parents souhaitent plus d''éducation aux médias illustre une demande sociale qui justifie les orientations de la réforme.', 1, 4, '2026-07-15T02:09:15.727Z'),
('a05d4fca-9d70-4f4f-94ad-92eef4bcb311', '9e3bf377-f7a4-45d5-9c10-2f23e5027f6a', '📖 Texte :

Les relations internationales connaissent actuellement des bouleversements majeurs, marqués par l''affirmation de nouvelles puissances et la remise en cause des équilibres établis depuis la fin de la guerre froide. L''essor économique de la Chine, le retour de la Russie sur la scène diplomatique et l''émergence du G20 comme forum de concertation privilégié redessinent la carte du pouvoir mondial. Il est probable que cette recomposition géopolitique s''accélère dans les années à venir.

« Nous assistons à une transition historique vers un monde multipolaire, où les alliances traditionnelles sont réévaluées », analyse une chercheuse en relations internationales de Sciences Po. Les organisations internationales, notamment l''ONU et l''OMC, peinent à s''adapter à cette nouvelle configuration, ce qui suscite des interrogations sur leur capacité à réguler les conflits et les échanges mondiaux. Il faudrait que ces institutions soient réformées en profondeur pour rester pertinentes.

La France, forte de son réseau diplomatique et de sa présence au Conseil de sécurité, cherche à maintenir son influence tout en nouant de nouveaux partenariats stratégiques. Le président a récemment plaidé pour une « autonomie stratégique européenne » lors d''un sommet à Bruxelles, appelant les États membres à renforcer leur coopération en matière de défense et de politique étrangère. Selon un sondage réalisé dans six pays européens, 58% des citoyens se déclarent favorables à une politique étrangère commune, bien que les divergences entre États membres restent importantes.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"La recomposition des relations internationales vers un monde multipolaire\",\"Les conflits armés au Moyen-Orient\",\"L''histoire de la guerre froide\",\"Les échanges commerciaux entre l''Europe et l''Asie\"]"'::jsonb, 'La recomposition des relations internationales vers un monde multipolaire', 'L''article examine les bouleversements géopolitiques actuels et l''émergence d''un nouvel ordre international multipolaire.', 1, 0, '2026-07-15T02:09:15.727Z'),
('fbb338e4-498e-443f-98c2-6d0faea835e0', '9e3bf377-f7a4-45d5-9c10-2f23e5027f6a', '📖 Texte :

Les relations internationales connaissent actuellement des bouleversements majeurs, marqués par l''affirmation de nouvelles puissances et la remise en cause des équilibres établis depuis la fin de la guerre froide. L''essor économique de la Chine, le retour de la Russie sur la scène diplomatique et l''émergence du G20 comme forum de concertation privilégié redessinent la carte du pouvoir mondial. Il est probable que cette recomposition géopolitique s''accélère dans les années à venir.

« Nous assistons à une transition historique vers un monde multipolaire, où les alliances traditionnelles sont réévaluées », analyse une chercheuse en relations internationales de Sciences Po. Les organisations internationales, notamment l''ONU et l''OMC, peinent à s''adapter à cette nouvelle configuration, ce qui suscite des interrogations sur leur capacité à réguler les conflits et les échanges mondiaux. Il faudrait que ces institutions soient réformées en profondeur pour rester pertinentes.

La France, forte de son réseau diplomatique et de sa présence au Conseil de sécurité, cherche à maintenir son influence tout en nouant de nouveaux partenariats stratégiques. Le président a récemment plaidé pour une « autonomie stratégique européenne » lors d''un sommet à Bruxelles, appelant les États membres à renforcer leur coopération en matière de défense et de politique étrangère. Selon un sondage réalisé dans six pays européens, 58% des citoyens se déclarent favorables à une politique étrangère commune, bien que les divergences entre États membres restent importantes.

---

Question : Quel est le pourcentage de citoyens européens favorables à une politique étrangère commune ?', NULL, NULL, '"[\"48%\",\"52%\",\"58%\",\"62%\"]"'::jsonb, '58%', 'Le sondage mentionné révèle que 58% des citoyens européens se déclarent favorables à une politique étrangère commune.', 1, 1, '2026-07-15T02:09:15.727Z'),
('f4d236af-a9e4-477b-839d-61b762651c78', '9e3bf377-f7a4-45d5-9c10-2f23e5027f6a', '📖 Texte :

Les relations internationales connaissent actuellement des bouleversements majeurs, marqués par l''affirmation de nouvelles puissances et la remise en cause des équilibres établis depuis la fin de la guerre froide. L''essor économique de la Chine, le retour de la Russie sur la scène diplomatique et l''émergence du G20 comme forum de concertation privilégié redessinent la carte du pouvoir mondial. Il est probable que cette recomposition géopolitique s''accélère dans les années à venir.

« Nous assistons à une transition historique vers un monde multipolaire, où les alliances traditionnelles sont réévaluées », analyse une chercheuse en relations internationales de Sciences Po. Les organisations internationales, notamment l''ONU et l''OMC, peinent à s''adapter à cette nouvelle configuration, ce qui suscite des interrogations sur leur capacité à réguler les conflits et les échanges mondiaux. Il faudrait que ces institutions soient réformées en profondeur pour rester pertinentes.

La France, forte de son réseau diplomatique et de sa présence au Conseil de sécurité, cherche à maintenir son influence tout en nouant de nouveaux partenariats stratégiques. Le président a récemment plaidé pour une « autonomie stratégique européenne » lors d''un sommet à Bruxelles, appelant les États membres à renforcer leur coopération en matière de défense et de politique étrangère. Selon un sondage réalisé dans six pays européens, 58% des citoyens se déclarent favorables à une politique étrangère commune, bien que les divergences entre États membres restent importantes.

---

Question : Quelle est la position de la France dans ce nouvel ordre mondial ?', NULL, NULL, '"[\"Elle cherche à maintenir son influence tout en s''adaptant aux changements\",\"Elle a perdu toute influence sur la scène internationale\",\"Elle s''oppose systématiquement à l''émergence de nouvelles puissances\",\"Elle se retire de toutes les organisations internationales\"]"'::jsonb, 'Elle cherche à maintenir son influence tout en s''adaptant aux changements', 'Le texte indique que la France « cherche à maintenir son influence tout en nouant de nouveaux partenariats stratégiques », ce qui montre une stratégie d''adaptation.', 1, 2, '2026-07-15T02:09:15.727Z'),
('633e23bc-61e3-46d1-96e3-eaf49df78ea2', '9e3bf377-f7a4-45d5-9c10-2f23e5027f6a', '📖 Texte :

Les relations internationales connaissent actuellement des bouleversements majeurs, marqués par l''affirmation de nouvelles puissances et la remise en cause des équilibres établis depuis la fin de la guerre froide. L''essor économique de la Chine, le retour de la Russie sur la scène diplomatique et l''émergence du G20 comme forum de concertation privilégié redessinent la carte du pouvoir mondial. Il est probable que cette recomposition géopolitique s''accélère dans les années à venir.

« Nous assistons à une transition historique vers un monde multipolaire, où les alliances traditionnelles sont réévaluées », analyse une chercheuse en relations internationales de Sciences Po. Les organisations internationales, notamment l''ONU et l''OMC, peinent à s''adapter à cette nouvelle configuration, ce qui suscite des interrogations sur leur capacité à réguler les conflits et les échanges mondiaux. Il faudrait que ces institutions soient réformées en profondeur pour rester pertinentes.

La France, forte de son réseau diplomatique et de sa présence au Conseil de sécurité, cherche à maintenir son influence tout en nouant de nouveaux partenariats stratégiques. Le président a récemment plaidé pour une « autonomie stratégique européenne » lors d''un sommet à Bruxelles, appelant les États membres à renforcer leur coopération en matière de défense et de politique étrangère. Selon un sondage réalisé dans six pays européens, 58% des citoyens se déclarent favorables à une politique étrangère commune, bien que les divergences entre États membres restent importantes.

---

Question : Que signifie « autonomie stratégique européenne » dans le contexte ?', NULL, NULL, '"[\"La capacité de l''Europe à agir indépendamment sur la scène internationale\",\"L''indépendance énergétique totale de l''Europe\",\"La fermeture des frontières européennes\",\"Le retrait de l''Europe de l''OTAN\"]"'::jsonb, 'La capacité de l''Europe à agir indépendamment sur la scène internationale', 'L''autonomie stratégique européenne fait référence à la capacité de l''Union européenne à définir et mener sa propre politique de défense et étrangère.', 1, 3, '2026-07-15T02:09:15.727Z'),
('de52b5ec-c25f-4a7c-aa3e-351c54eb3746', '9e3bf377-f7a4-45d5-9c10-2f23e5027f6a', '📖 Texte :

Les relations internationales connaissent actuellement des bouleversements majeurs, marqués par l''affirmation de nouvelles puissances et la remise en cause des équilibres établis depuis la fin de la guerre froide. L''essor économique de la Chine, le retour de la Russie sur la scène diplomatique et l''émergence du G20 comme forum de concertation privilégié redessinent la carte du pouvoir mondial. Il est probable que cette recomposition géopolitique s''accélère dans les années à venir.

« Nous assistons à une transition historique vers un monde multipolaire, où les alliances traditionnelles sont réévaluées », analyse une chercheuse en relations internationales de Sciences Po. Les organisations internationales, notamment l''ONU et l''OMC, peinent à s''adapter à cette nouvelle configuration, ce qui suscite des interrogations sur leur capacité à réguler les conflits et les échanges mondiaux. Il faudrait que ces institutions soient réformées en profondeur pour rester pertinentes.

La France, forte de son réseau diplomatique et de sa présence au Conseil de sécurité, cherche à maintenir son influence tout en nouant de nouveaux partenariats stratégiques. Le président a récemment plaidé pour une « autonomie stratégique européenne » lors d''un sommet à Bruxelles, appelant les États membres à renforcer leur coopération en matière de défense et de politique étrangère. Selon un sondage réalisé dans six pays européens, 58% des citoyens se déclarent favorables à une politique étrangère commune, bien que les divergences entre États membres restent importantes.

---

Question : Pourquoi l''auteur cite-t-il la chercheuse de Sciences Po ?', NULL, NULL, '"[\"Pour apporter une analyse experte sur la transition vers un monde multipolaire\",\"Pour donner un avis personnel sous couvert d''expertise\",\"Pour contredire les affirmations du gouvernement français\",\"Pour annoncer une nouvelle alliance militaire\"]"'::jsonb, 'Pour apporter une analyse experte sur la transition vers un monde multipolaire', 'La citation de la chercheuse apporte une crédibilité académique à l''analyse de la transition vers un monde multipolaire.', 1, 4, '2026-07-15T02:09:15.727Z'),
('65e27784-4faa-4f07-9c80-82f86d46beb6', '55e29422-fba7-4c12-9b12-f35607f75a49', '📖 Texte :

La société française contemporaine est traversée par des tensions qui interrogent la cohésion nationale. Entre individualisme croissant et fragmentation sociale, de nouvelles formes de solidarité émergent pourtant, témoignant d''une capacité de résilience collective. Les associations et les initiatives citoyennes se multiplient, notamment dans les domaines de l''aide alimentaire, du soutien scolaire et de l''accompagnement des personnes isolées. Il est remarquable que l''engagement citoyen se renouvelle malgré un contexte de défiance envers les institutions.

« On observe une véritable renaissance de l''engagement citoyen, particulièrement chez les jeunes générations », explique une sociologue spécialiste des mouvements associatifs. Selon une enquête récente, 62% des 18-35 ans déclarent avoir participé à au moins une action bénévole au cours des douze derniers mois, un chiffre en hausse constante depuis cinq ans. Il serait intéressant que les pouvoirs publics s''appuient davantage sur cet élan pour renforcer les politiques de cohésion sociale.

Les plateformes numériques jouent un rôle catalyseur dans cette recomposition du lien social, en facilitant la mise en relation des volontaires et des personnes dans le besoin. Cependant, des voix s''élèvent pour mettre en garde contre une « ubérisation » de la solidarité qui affaiblirait les services publics. Le débat sur le rôle de l''État et de la société civile dans la protection sociale reste plus que jamais d''actualité. Une enquête d''opinion révèle que 76% des Français estiment que la solidarité est une valeur fondamentale qui devrait être davantage encouragée par les politiques publiques.

---

Question : Quel est le sujet principal de cet article ?', NULL, NULL, '"[\"Les nouvelles formes de solidarité et d''engagement citoyen en France\",\"La crise économique et ses conséquences sociales\",\"Les réformes du système de protection sociale\",\"L''impact des réseaux sociaux sur la santé mentale\"]"'::jsonb, 'Les nouvelles formes de solidarité et d''engagement citoyen en France', 'L''article examine comment de nouvelles formes de solidarité émergent dans la société française contemporaine, malgré les tensions et la fragmentation sociale.', 1, 0, '2026-07-15T02:09:15.727Z'),
('bfc3d055-407e-43b5-a049-581f08f2d27f', '55e29422-fba7-4c12-9b12-f35607f75a49', '📖 Texte :

La société française contemporaine est traversée par des tensions qui interrogent la cohésion nationale. Entre individualisme croissant et fragmentation sociale, de nouvelles formes de solidarité émergent pourtant, témoignant d''une capacité de résilience collective. Les associations et les initiatives citoyennes se multiplient, notamment dans les domaines de l''aide alimentaire, du soutien scolaire et de l''accompagnement des personnes isolées. Il est remarquable que l''engagement citoyen se renouvelle malgré un contexte de défiance envers les institutions.

« On observe une véritable renaissance de l''engagement citoyen, particulièrement chez les jeunes générations », explique une sociologue spécialiste des mouvements associatifs. Selon une enquête récente, 62% des 18-35 ans déclarent avoir participé à au moins une action bénévole au cours des douze derniers mois, un chiffre en hausse constante depuis cinq ans. Il serait intéressant que les pouvoirs publics s''appuient davantage sur cet élan pour renforcer les politiques de cohésion sociale.

Les plateformes numériques jouent un rôle catalyseur dans cette recomposition du lien social, en facilitant la mise en relation des volontaires et des personnes dans le besoin. Cependant, des voix s''élèvent pour mettre en garde contre une « ubérisation » de la solidarité qui affaiblirait les services publics. Le débat sur le rôle de l''État et de la société civile dans la protection sociale reste plus que jamais d''actualité. Une enquête d''opinion révèle que 76% des Français estiment que la solidarité est une valeur fondamentale qui devrait être davantage encouragée par les politiques publiques.

---

Question : Quel pourcentage de jeunes de 18-35 ans a participé à une action bénévole ?', NULL, NULL, '"[\"52%\",\"58%\",\"62%\",\"68%\"]"'::jsonb, '62%', 'Le texte mentionne que 62% des 18-35 ans déclarent avoir participé à au moins une action bénévole au cours des douze derniers mois.', 1, 1, '2026-07-15T02:09:15.727Z'),
('3d3b0e31-ed6c-49c7-bfdc-208f0b429655', '55e29422-fba7-4c12-9b12-f35607f75a49', '📖 Texte :

La société française contemporaine est traversée par des tensions qui interrogent la cohésion nationale. Entre individualisme croissant et fragmentation sociale, de nouvelles formes de solidarité émergent pourtant, témoignant d''une capacité de résilience collective. Les associations et les initiatives citoyennes se multiplient, notamment dans les domaines de l''aide alimentaire, du soutien scolaire et de l''accompagnement des personnes isolées. Il est remarquable que l''engagement citoyen se renouvelle malgré un contexte de défiance envers les institutions.

« On observe une véritable renaissance de l''engagement citoyen, particulièrement chez les jeunes générations », explique une sociologue spécialiste des mouvements associatifs. Selon une enquête récente, 62% des 18-35 ans déclarent avoir participé à au moins une action bénévole au cours des douze derniers mois, un chiffre en hausse constante depuis cinq ans. Il serait intéressant que les pouvoirs publics s''appuient davantage sur cet élan pour renforcer les politiques de cohésion sociale.

Les plateformes numériques jouent un rôle catalyseur dans cette recomposition du lien social, en facilitant la mise en relation des volontaires et des personnes dans le besoin. Cependant, des voix s''élèvent pour mettre en garde contre une « ubérisation » de la solidarité qui affaiblirait les services publics. Le débat sur le rôle de l''État et de la société civile dans la protection sociale reste plus que jamais d''actualité. Une enquête d''opinion révèle que 76% des Français estiment que la solidarité est une valeur fondamentale qui devrait être davantage encouragée par les politiques publiques.

---

Question : Quelle est l''attitude des jeunes générations vis-à-vis de l''engagement citoyen ?', NULL, NULL, '"[\"Elles sont de plus en plus engagées, avec une hausse constante du bénévolat\",\"Elles se désintéressent complètement de l''engagement associatif\",\"Elles préfèrent les engagements politiques traditionnels\",\"Elles sont moins engagées que les générations précédentes\"]"'::jsonb, 'Elles sont de plus en plus engagées, avec une hausse constante du bénévolat', 'Le chiffre de 62% est en hausse constante depuis cinq ans, ce qui témoigne d''un engagement croissant des jeunes générations.', 1, 2, '2026-07-15T02:09:15.727Z'),
('a8665603-590f-4772-93fe-af23b01e2008', '55e29422-fba7-4c12-9b12-f35607f75a49', '📖 Texte :

La société française contemporaine est traversée par des tensions qui interrogent la cohésion nationale. Entre individualisme croissant et fragmentation sociale, de nouvelles formes de solidarité émergent pourtant, témoignant d''une capacité de résilience collective. Les associations et les initiatives citoyennes se multiplient, notamment dans les domaines de l''aide alimentaire, du soutien scolaire et de l''accompagnement des personnes isolées. Il est remarquable que l''engagement citoyen se renouvelle malgré un contexte de défiance envers les institutions.

« On observe une véritable renaissance de l''engagement citoyen, particulièrement chez les jeunes générations », explique une sociologue spécialiste des mouvements associatifs. Selon une enquête récente, 62% des 18-35 ans déclarent avoir participé à au moins une action bénévole au cours des douze derniers mois, un chiffre en hausse constante depuis cinq ans. Il serait intéressant que les pouvoirs publics s''appuient davantage sur cet élan pour renforcer les politiques de cohésion sociale.

Les plateformes numériques jouent un rôle catalyseur dans cette recomposition du lien social, en facilitant la mise en relation des volontaires et des personnes dans le besoin. Cependant, des voix s''élèvent pour mettre en garde contre une « ubérisation » de la solidarité qui affaiblirait les services publics. Le débat sur le rôle de l''État et de la société civile dans la protection sociale reste plus que jamais d''actualité. Une enquête d''opinion révèle que 76% des Français estiment que la solidarité est une valeur fondamentale qui devrait être davantage encouragée par les politiques publiques.

---

Question : Que signifie « ubérisation de la solidarité » dans le contexte ?', NULL, NULL, '"[\"La transformation de l''aide sociale en services marchands via des plateformes\",\"La généralisation des services de livraison à domicile\",\"La création d''une application de covoiturage solidaire\",\"La privatisation complète des services d''aide sociale\"]"'::jsonb, 'La transformation de l''aide sociale en services marchands via des plateformes', 'L''« ubérisation » de la solidarité fait référence à la crainte que les plateformes numériques transforment l''aide sociale en services marchands, au détriment des services publics traditionnels.', 1, 3, '2026-07-15T02:09:15.727Z'),
('c6566344-fcbc-466f-90b1-a37115cf3c54', '55e29422-fba7-4c12-9b12-f35607f75a49', '📖 Texte :

La société française contemporaine est traversée par des tensions qui interrogent la cohésion nationale. Entre individualisme croissant et fragmentation sociale, de nouvelles formes de solidarité émergent pourtant, témoignant d''une capacité de résilience collective. Les associations et les initiatives citoyennes se multiplient, notamment dans les domaines de l''aide alimentaire, du soutien scolaire et de l''accompagnement des personnes isolées. Il est remarquable que l''engagement citoyen se renouvelle malgré un contexte de défiance envers les institutions.

« On observe une véritable renaissance de l''engagement citoyen, particulièrement chez les jeunes générations », explique une sociologue spécialiste des mouvements associatifs. Selon une enquête récente, 62% des 18-35 ans déclarent avoir participé à au moins une action bénévole au cours des douze derniers mois, un chiffre en hausse constante depuis cinq ans. Il serait intéressant que les pouvoirs publics s''appuient davantage sur cet élan pour renforcer les politiques de cohésion sociale.

Les plateformes numériques jouent un rôle catalyseur dans cette recomposition du lien social, en facilitant la mise en relation des volontaires et des personnes dans le besoin. Cependant, des voix s''élèvent pour mettre en garde contre une « ubérisation » de la solidarité qui affaiblirait les services publics. Le débat sur le rôle de l''État et de la société civile dans la protection sociale reste plus que jamais d''actualité. Une enquête d''opinion révèle que 76% des Français estiment que la solidarité est une valeur fondamentale qui devrait être davantage encouragée par les politiques publiques.

---

Question : Quel est l''objectif de l''auteur en mentionnant que 76% des Français valorisent la solidarité ?', NULL, NULL, '"[\"Souligner le décalage entre les valeurs affirmées et les politiques menées\",\"Démontrer que la solidarité est une valeur en déclin\",\"Prouver que les Français sont égoïstes\",\"Annoncer une nouvelle loi sur la solidarité\"]"'::jsonb, 'Souligner le décalage entre les valeurs affirmées et les politiques menées', 'Le fait que 76% des Français considèrent la solidarité comme une valeur fondamentale suggère un décalage entre cette aspiration et les politiques publiques actuelles.', 1, 4, '2026-07-15T02:09:15.727Z');

COMMIT;

-- 10 reading passages inserted
-- 50 comprehension questions inserted
