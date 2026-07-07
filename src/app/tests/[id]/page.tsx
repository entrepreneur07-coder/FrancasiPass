"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge, Button, Card, CardContent } from "@/components/ui"
import { useRouter, useParams } from "next/navigation"

// Mock test data — replaces API call to /api/tests/[id]
interface ListeningQuestionData {
  id: number;
  question: string;
  audioContent: string;
  options?: string[];
  type: string;
}

interface TestData {
  name: string;
  exam: string;
  module: string;
  duration: number;
  questions: (ListeningQuestionData | { id: number; question: string; options?: string[]; type: string })[];
}

const mockTestData: Record<number, TestData> = {
  // 1 - TCF Full Simulation (Listening module)
  1: {
    name: "TCF Canada — Full Simulation",
    exam: "TCF Canada",
    module: "listening",
    duration: 170,
    questions: [
      { id: 1, question: "Que fait le client ?", audioContent: "Bonjour madame, je voudrais un menu du jour, s'il vous plaît. Et comme boisson, un verre d'eau minérale.", options: ["Il commande un repas", "Il se plaint du service", "Il demande l'addition", "Il réserve une table"], type: "mcq" },
      { id: 2, question: "Quel temps fera-t-il demain ?", audioContent: "Bonjour à tous. Voici la météo. Demain, le soleil brillera sur toute la région avec des températures atteignant 25 degrés. Aucune pluie prévue.", options: ["Ensoleillé", "Pluvieux", "Neigeux", "Nuageux"], type: "mcq" },
      { id: 3, question: "Quelle est la qualité principale du candidat ?", audioContent: "Alors, dites-moi, pourquoi devrions-nous vous embaucher ? Je pense que ma plus grande force est ma capacité à m'adapter rapidement aux nouvelles situations.", options: ["Son expérience", "Sa flexibilité", "Son diplôme", "Sa motivation"], type: "mcq" },
      { id: 4, question: "Où se trouve la pharmacie ?", audioContent: "Excusez-moi, je cherche une pharmacie. Continuez tout droit, puis prenez la deuxième rue à gauche. Vous la verrez en face de la banque.", options: ["À côté de la banque", "En face de la banque", "Derrière la poste", "À droite du supermarché"], type: "mcq" },
      { id: 5, question: "Quel est le sujet de la conversation ?", audioContent: "Allô, c'est Mme Martin. Je ne peux pas venir à la réunion de demain car j'ai un rendez-vous médical. Est-ce que je peux participer par visioconférence ?", options: ["Un rendez-vous médical", "Une réunion à reporter", "Une participation à distance", "Une annulation de réunion"], type: "mcq" },
      { id: 6, question: "À quelle heure part le train ?", audioContent: "Bonjour, je voudrais un billet pour Lyon. Le prochain train part à 14h30, quai numéro 5. Il arrive à 16h45. C'est un train direct.", options: ["14h00", "14h30", "15h00", "16h45"], type: "mcq" },
      { id: 7, question: "Que propose l'agent immobilier ?", audioContent: "Cet appartement de trois pièces est situé dans le centre-ville. Il dispose d'une cuisine équipée, d'un salon lumineux et d'une chambre avec balcon. Le loyer est de 950 euros par mois.", options: ["Un studio", "Un deux-pièces", "Un trois-pièces", "Une maison"], type: "mcq" },
      { id: 8, question: "Pourquoi l'homme appelle-t-il le service client ?", audioContent: "Bonjour, j'ai reçu ma facture d'électricité et le montant me semble trop élevé. Pouvez-vous vérifier s'il n'y a pas une erreur ? Je paie habituellement 80 euros par mois et là c'est 150 euros.", options: ["Pour se plaindre du service", "Pour changer de fournisseur", "Pour contester une facture", "Pour demander un devis"], type: "mcq" },
      { id: 9, question: "Quel est le programme de la soirée ?", audioContent: "Ce soir, le musée du Louvre organise une nocturne exceptionnelle. Les portes ouvriront à 18 heures et l'entrée sera gratuite à partir de 19 heures. Une conférence sur la Renaissance italienne est prévue à 20 heures.", options: ["Un concert", "Une nocturne au musée", "Un spectacle de danse", "Une projection de film"], type: "mcq" },
      { id: 10, question: "Que décident les interlocuteurs ?", audioContent: "On pourrait aller au cinéma ce week-end ? Bonne idée ! Qu'est-ce qui joue ? Il y a un nouveau film français qui a l'air intéressant. D'accord, samedi après-midi ça te va ? Parfait.", options: ["Aller au restaurant", "Aller au cinéma", "Aller au théâtre", "Rester à la maison"], type: "mcq" },
    ],
  },
  // 2 - TEF Full Simulation (Listening module)
  2: {
    name: "TEF Canada — Full Simulation",
    exam: "TEF Canada",
    module: "listening",
    duration: 175,
    questions: [
      { id: 1, question: "Que demande le client ?", audioContent: "Bonjour, j'aimerais ouvrir un compte bancaire. Quels sont les documents nécessaires ? Il vous faut une pièce d'identité, un justificatif de domicile et un justificatif de revenus.", options: ["Un prêt bancaire", "Un compte bancaire", "Une carte de crédit", "Un chéquier"], type: "mcq" },
      { id: 2, question: "Où se déroule la conversation ?", audioContent: "Je voudrais un aller simple pour Marseille, s'il vous plaît. En première ou deuxième classe ? Deuxième classe. Cela fera 85 euros. Vous payez par carte ou en espèces ?", options: ["Dans un restaurant", "À la gare", "Dans un hôtel", "Dans un magasin"], type: "mcq" },
      { id: 3, question: "Quel est le problème signalé ?", audioContent: "Allô, les pompiers ? Il y a un incendie dans l'immeuble voisin, au 15 rue de la République. Je vois de la fumée qui sort du troisième étage. Dépêchez-vous s'il vous plaît !", options: ["Un cambriolage", "Un incendie", "Un accident de voiture", "Une inondation"], type: "mcq" },
      { id: 4, question: "Que prévoit la météo pour ce week-end ?", audioContent: "Bonjour à tous. Voici la météo du week-end. Samedi, le temps sera nuageux avec des averses éparses. Dimanche, le ciel se dégagera et les températures atteindront 20 degrés.", options: ["Beau temps tout le week-end", "Pluie samedi puis amélioration", "Pluie tout le week-end", "Neige en montagne"], type: "mcq" },
      { id: 5, question: "Quelle est la profession de la femme ?", audioContent: "Je suis médecin généraliste. Je travaille à l'hôpital Saint-Joseph du lundi au vendredi. Le week-end, je fais des gardes aux urgences une fois par mois.", options: ["Infirmière", "Médecin", "Pharmacienne", "Chercheuse"], type: "mcq" },
      { id: 6, question: "Que propose l'offre d'emploi ?", audioContent: "Notre entreprise recherche un développeur web expérimenté. Le poste est en CDI à temps plein. Le salaire est de 45 000 euros annuels avec des avantages tels qu'un abonnement sportif et des tickets restaurant.", options: ["Un CDD en freelance", "Un CDI avec avantages", "Un stage", "Un contrat à temps partiel"], type: "mcq" },
      { id: 7, question: "Quel est l'avis de la cliente ?", audioContent: "J'ai acheté ce téléphone la semaine dernière et je suis très déçue. La batterie ne tient pas la journée et l'écran est trop petit. Je voudrais le retourner et être remboursée.", options: ["Satisfaite", "Déçue", "Neutre", "Impressonnée"], type: "mcq" },
      { id: 8, question: "Que doivent faire les étudiants ?", audioContent: "Pour l'examen de français, vous devez réviser les chapitres 5 à 8. L'examen aura lieu le 15 juin dans l'amphithéâtre A. Vous aurez deux heures. N'oubliez pas vos dictionnaires.", options: ["Rendre un devoir", "Préparer un examen", "Acheter un livre", "S'inscrire à un cours"], type: "mcq" },
      { id: 9, question: "Où la conversation a-t-elle lieu ?", audioContent: "Je cherche un cadeau pour l'anniversaire de ma femme. Qu'est-ce que vous me conseillez ? Cette robe en soie est très élégante et elle est en promotion cette semaine.", options: ["Dans une librairie", "Dans un magasin de vêtements", "Dans une bijouterie", "Dans un restaurant"], type: "mcq" },
      { id: 10, question: "Que comprennent les services de l'hôtel ?", audioContent: "Bienvenue à l'Hôtel Plaza. Votre chambre est au quatrième étage. Le petit-déjeuner est servi de 7h à 10h. La piscine et le sauna sont accessibles jusqu'à 22 heures. Le wifi est gratuit.", options: ["Petit-déjeuner et piscine", "Parking et spa", "Restaurant et bar", "Blanchisserie et navette"], type: "mcq" },
    ],
  },
  // 3 - TCF Listening Comp. Intensive
  3: {
    name: "TCF — Listening Comp. Intensive",
    exam: "TCF Canada",
    module: "listening",
    duration: 35,
    questions: [
      { id: 1, question: "Que fait le client ?", audioContent: "Bonjour, je recherche un livre de cuisine française. Est-ce que vous avez des suggestions ? Oui, bien sûr, suivez-moi dans la section gastronomie.", options: ["Il commande un repas", "Il achète un livre", "Il demande l'addition", "Il réserve une table"], type: "mcq" },
      { id: 2, question: "Quel temps fera-t-il demain ?", audioContent: "Voici les prévisions météo. Demain, attendez-vous à des averses et des températures fraîches autour de 12 degrés. Sortez vos parapluies.", options: ["Ensoleillé", "Pluvieux", "Neigeux", "Nuageux"], type: "mcq" },
      { id: 3, question: "Quelle est la qualité principale du candidat ?", audioContent: "Pouvez-vous décrire votre expérience professionnelle ? J'ai travaillé pendant cinq ans dans le domaine de la finance. Mon expérience m'a permis de développer une expertise solide en analyse financière.", options: ["Son expérience", "Sa flexibilité", "Son diplôme", "Sa motivation"], type: "mcq" },
      { id: 4, question: "Où se trouve le bureau de poste ?", audioContent: "Excusez-moi madame, je cherche le bureau de poste. Il est situé rue de la Paix, entre la boulangerie et la librairie. Vous ne pouvez pas le manquer.", options: ["En face de la banque", "Entre la boulangerie et la librairie", "À côté de la gare", "Derrière le supermarché"], type: "mcq" },
      { id: 5, question: "Que propose l'annonce ?", audioContent: "Studio meublé à louer, 35 mètres carrés, proche du métro et des commerces. Loyer 650 euros par mois, charges comprises. Disponible à partir du premier septembre.", options: ["Une maison à vendre", "Un studio à louer", "Un bureau à partager", "Un parking à louer"], type: "mcq" },
      { id: 6, question: "Quel est le motif de l'appel ?", audioContent: "Allô, docteur ? Mon fils a de la fièvre depuis hier soir et il tousse beaucoup. Est-ce que je peux avoir un rendez-vous aujourd'hui ?", options: ["Pour annuler un rendez-vous", "Pour demander un rendez-vous", "Pour commander des médicaments", "Pour un résultat d'analyse"], type: "mcq" },
      { id: 7, question: "Que pense l'homme du film ?", audioContent: "Alors, ce film t'a plu ? Franchement, je m'attendais à mieux. L'histoire était prévisible et les acteurs n'étaient pas convaincants. La photographie était belle mais ça n'a pas suffi.", options: ["Il a adoré", "Il a été déçu", "Il n'a pas d'avis", "Il veut le revoir"], type: "mcq" },
      { id: 8, question: "Quel est l'objectif de l'association ?", audioContent: "Notre association a été créée en 2015. Nous organisons des ateliers de jardinage urbain et des collectes de déchets dans les parcs. Notre objectif est de sensibiliser les citadins à l'environnement.", options: ["Le jardinage commercial", "La protection de l'environnement", "L'enseignement du jardinage", "La vente de plantes"], type: "mcq" },
    ],
  },
  // 4 - TEF Listening Comp. Intensive
  4: {
    name: "TEF — Listening Comp. Intensive",
    exam: "TEF Canada",
    module: "listening",
    duration: 40,
    questions: [
      { id: 1, question: "Que commande le client au restaurant ?", audioContent: "Bonjour, comme entrée je prendrai une salade de chèvre chaud, et en plat principal le steak-frites, cuit à point s'il vous plaît.", options: ["Poisson et légumes", "Salade et steak-frites", "Soupe et salade", "Pâtes et pizza"], type: "mcq" },
      { id: 2, question: "Que dit le message téléphonique ?", audioContent: "Bonjour, ici la clinique Dentaire. Nous vous rappelons votre rendez-vous du jeudi 12 mars à 10h30. Merci de confirmer votre présence en appuyant sur la touche 1.", options: ["Un rendez-vous annulé", "Un rappel de rendez-vous", "Une facture à payer", "Une invitation"], type: "mcq" },
      { id: 3, question: "Quel est le sujet de l'émission radio ?", audioContent: "Aujourd'hui dans notre émission, nous recevons un chef cuisinier étoilé qui nous parle de son nouveau livre de recettes. Il nous expliquera comment cuisiner des plats gastronomiques à la maison.", options: ["La cuisine gastronomique", "Les restaurants parisiens", "Les régimes alimentaires", "L'agriculture biologique"], type: "mcq" },
      { id: 4, question: "Où se déroule la scène ?", audioContent: "Votre passeport et votre billet, s'il vous plaît. Avez-vous des bagages à enregistrer ? Un seule valise. Et voici votre carte d'embarquement. Porte d'embarquement numéro 12.", options: ["Dans un train", "Dans un avion", "Dans un bus", "Dans un hôtel"], type: "mcq" },
      { id: 5, question: "Que propose la municipalité ?", audioContent: "La ville lance un programme de compostage collectif. Les habitants peuvent déposer leurs déchets organiques dans des bacs spécialement installés dans chaque quartier. Le compost sera utilisé pour les espaces verts.", options: ["Le recyclage du verre", "Le compostage collectif", "La collecte des encombrants", "Le nettoyage des rues"], type: "mcq" },
      { id: 6, question: "Quel est le problème de la cliente ?", audioContent: "Bonjour, j'ai commandé un ordinateur sur votre site il y a une semaine et je ne l'ai toujours pas reçu. Le numéro de commande est le 45872. Pouvez-vous vérifier ce qui se passe ?", options: ["Un produit défectueux", "Une commande non livrée", "Un mauvais article", "Un problème de paiement"], type: "mcq" },
      { id: 7, question: "Que conseille le médecin ?", audioContent: "Vous avez une grippe. Je vous prescris des médicaments pour faire baisser la fièvre. Buvez beaucoup d'eau et reposez-vous pendant au moins trois jours. Évitez les lieux publics.", options: ["Faire du sport", "Prendre des antibiotiques", "Se reposer et boire de l'eau", "Aller à l'hôpital"], type: "mcq" },
      { id: 8, question: "Quel est le sujet de la conférence ?", audioContent: "La conférence de ce soir portera sur l'impact de l'intelligence artificielle sur le marché du travail. Interviendront trois experts du secteur qui débattront des opportunités et des risques.", options: ["La technologie et l'emploi", "L'histoire de l'informatique", "Les réseaux sociaux", "La cybersécurité"], type: "mcq" },
    ],
  },
  // 5 - TCF Reading Comprehension
  5: {
    name: "TCF — Reading Comprehension",
    exam: "TCF Canada",
    module: "reading",
    duration: 60,
    questions: [
      { id: 1, question: "Selon le texte, quelle est la principale cause du réchauffement climatique ?", options: ["Les activités humaines", "Les volcans", "Les cycles solaires", "La déforestation"], type: "mcq" },
      { id: 2, question: "Que signifie l'expression 'mettre en œuvre' dans le contexte ?", options: ["Expliquer", "Implémenter", "Ignorer", "Retarder"], type: "mcq" },
      { id: 3, question: "Quel est le ton général de l'article ?", options: ["Neutre et informatif", "Critique et alarmiste", "Optimiste et encourageant", "Sarcastique"], type: "mcq" },
      { id: 4, question: "D'après le texte, quel est l'impact principal des réseaux sociaux sur la société ?", options: ["Ils isolent les individus", "Ils facilitent les échanges", "Ils réduisent le temps de travail", "Ils augmentent la productivité"], type: "mcq" },
      { id: 5, question: "Que signifie 'cependant' dans le second paragraphe ?", options: ["En conclusion", "Néanmoins", "De plus", "Ainsi"], type: "mcq" },
      { id: 6, question: "Quel est le pourcentage de personnes interrogées qui soutiennent la mesure ?", options: ["25%", "50%", "67%", "75%"], type: "mcq" },
      { id: 7, question: "Selon l'auteur, quelle est la solution la plus efficace ?", options: ["La réglementation gouvernementale", "La sensibilisation du public", "Les innovations technologiques", "Les accords internationaux"], type: "mcq" },
      { id: 8, question: "Quel est le thème central du texte ?", options: ["L'économie mondiale", "L'éducation nationale", "La transition écologique", "La santé publique"], type: "mcq" },
    ],
  },
  // 6 - TEF Reading Comprehension
  6: {
    name: "TEF — Reading Comprehension",
    exam: "TEF Canada",
    module: "reading",
    duration: 60,
    questions: [
      { id: 1, question: "Quel est le sujet principal de l'article ?", options: ["Les nouvelles technologies", "L'immigration au Canada", "Le système de santé", "L'éducation"], type: "mcq" },
      { id: 2, question: "Combien de personnes ont participé à l'étude mentionnée ?", options: ["500", "1000", "2000", "5000"], type: "mcq" },
      { id: 3, question: "Que signifie l'expression 'prendre en compte' ?", options: ["Ignorer", "Considérer", "Rejeter", "Oublier"], type: "mcq" },
      { id: 4, question: "Quel est l'objectif du programme décrit ?", options: ["Former des ingénieurs", "Intégrer les nouveaux arrivants", "Réduire les impôts", "Construire des logements"], type: "mcq" },
      { id: 5, question: "D'après le texte, quelle est la principale difficulté rencontrée ?", options: ["Le financement", "Le manque de personnel", "La barrière linguistique", "La bureaucratie"], type: "mcq" },
      { id: 6, question: "Quel synonyme de 'toutefois' trouve-t-on dans le texte ?", options: ["Cependant", "Donc", "Parce que", "Ainsi"], type: "mcq" },
      { id: 7, question: "Quelle est la conclusion de l'auteur ?", options: ["Il faut abandonner le projet", "Le projet est prometteur", "Le projet est trop coûteux", "Le projet est inutile"], type: "mcq" },
      { id: 8, question: "À qui s'adresse principalement ce texte ?", options: ["Aux étudiants", "Aux décideurs politiques", "Aux retraités", "Aux touristes"], type: "mcq" },
    ],
  },
  // 7 - TCF Writing Tasks
  7: {
    name: "TCF — Writing Tasks",
    exam: "TCF Canada",
    module: "writing",
    duration: 60,
    questions: [
      { id: 1, question: "Écrivez un courriel à votre maire pour proposer une initiative écologique dans votre quartier (120-150 mots).", type: "essay" },
      { id: 2, question: "Rédigez un article argumentatif sur les avantages et les inconvénients du télétravail (200-250 mots).", type: "essay" },
      { id: 3, question: "Vous avez participé à un programme d'échange culturel. Écrivez une lettre à votre correspondant pour le remercier et partager vos impressions (150-180 mots).", type: "essay" },
    ],
  },
  // 8 - TEF Writing Tasks
  8: {
    name: "TEF — Writing Tasks",
    exam: "TEF Canada",
    module: "writing",
    duration: 60,
    questions: [
      { id: 1, question: "Rédigez un message à votre voisin pour lui signaler un problème de bruit et lui proposer une solution (80-100 mots).", type: "essay" },
      { id: 2, question: "Rédigez un article de blog sur l'importance de l'apprentissage des langues étrangères dans le monde professionnel (200-250 mots).", type: "essay" },
      { id: 3, question: "Écrivez une lettre de motivation pour un emploi dans le domaine de l'enseignement du français à l'étranger (150-200 mots).", type: "essay" },
    ],
  },
  // 9 - TCF Speaking Simulation
  9: {
    name: "TCF — Speaking Simulation",
    exam: "TCF Canada",
    module: "speaking",
    duration: 15,
    questions: [
      { id: 1, question: "Parlez de votre expérience professionnelle pendant 2 minutes.", type: "speaking" },
      { id: 2, question: "Donnez votre opinion sur l'impact des réseaux sociaux. Justifiez votre réponse.", type: "speaking" },
      { id: 3, question: "Décrivez votre ville idéale. Quels services et infrastructures devrait-elle avoir ?", type: "speaking" },
    ],
  },
  // 10 - TEF Speaking Simulation
  10: {
    name: "TEF — Speaking Simulation",
    exam: "TEF Canada",
    module: "speaking",
    duration: 15,
    questions: [
      { id: 1, question: "Présentez-vous et parlez de vos projets d'avenir au Canada.", type: "speaking" },
      { id: 2, question: "Que pensez-vous de l'importance de la protection de l'environnement ? Donnez des exemples concrets.", type: "speaking" },
      { id: 3, question: "Parlez d'une expérience qui a changé votre vie. Comment cela vous a-t-il affecté ?", type: "speaking" },
    ],
  },
  // 11 - TCF Grammar & Vocabulary
  11: {
    name: "TCF — Grammar & Vocabulary",
    exam: "TCF Canada",
    module: "reading",
    duration: 30,
    questions: [
      { id: 1, question: "Choisissez la forme correcte : 'Si j'___ le temps, j'irais au cinéma.'", options: ["ai", "avais", "aurais", "avais eu"], type: "mcq" },
      { id: 2, question: "Complétez la phrase : 'Il faut que tu ___ tes devoirs avant de sortir.'", options: ["fais", "fasses", "feras", "as fait"], type: "mcq" },
      { id: 3, question: "Quel est le synonyme de 'cependant' ?", options: ["Donc", "Néanmoins", "Parce que", "Alors"], type: "mcq" },
      { id: 4, question: "Choisissez la bonne préposition : 'Je suis intéressé ___ l'informatique.'", options: ["à", "de", "par", "sur"], type: "mcq" },
      { id: 5, question: "Conjuguez le verbe : 'Demain, nous ___ (aller) à la plage.'", options: ["allons", "irons", "allions", "sommes allés"], type: "mcq" },
      { id: 6, question: "Quel est le contraire de 'augmenter' ?", options: ["Croître", "Diminuer", "Progresser", "Développer"], type: "mcq" },
      { id: 7, question: "Complétez : 'Elle est la femme ___ je t'ai parlé.'", options: ["que", "dont", "qui", "où"], type: "mcq" },
      { id: 8, question: "Choisissez la forme correcte : 'Il pleut ___ trois jours.'", options: ["depuis", "pendant", "il y a", "dans"], type: "mcq" },
    ],
  },
  // 12 - TEF Grammar & Vocabulary
  12: {
    name: "TEF — Grammar & Vocabulary",
    exam: "TEF Canada",
    module: "reading",
    duration: 30,
    questions: [
      { id: 1, question: "Quel mot complète la phrase : 'Je cherche un ___ pour ouvrir cette bouteille.'", options: ["couteau", "tire-bouchon", "marteau", "ciseaux"], type: "mcq" },
      { id: 2, question: "Choisissez la forme correcte : 'Bien qu'il ___ malade, il est venu travailler.'", options: ["est", "soit", "était", "serait"], type: "mcq" },
      { id: 3, question: "Que signifie 'à l'avance' ?", options: ["En retard", "Par avance", "Soudainement", "Finalement"], type: "mcq" },
      { id: 4, question: "Complétez : 'Nous ___ (pouvoir) venir si nous finissons à temps.'", options: ["pouvons", "pourrons", "pouvions", "pourrions"], type: "mcq" },
      { id: 5, question: "Quel est le nom correspondant au verbe 'habiter' ?", options: ["Habitat", "Habitation", "Habitude", "Habillement"], type: "mcq" },
      { id: 6, question: "Choisissez la bonne préposition : 'Il est né ___ 15 mai 1990.'", options: ["le", "au", "en", "du"], type: "mcq" },
      { id: 7, question: "Trouvez l'intrus :", options: ["Rouge", "Bleu", "Joyeux", "Vert"], type: "mcq" },
      { id: 8, question: "Conjuguez : 'Il faut que vous ___ (faire) attention.'", options: ["faites", "fassiez", "ferez", "avez fait"], type: "mcq" },
    ],
  },
}

export default function TestTakingPage() {
  const params = useParams()
  const router = useRouter()
  const testId = Number(params.id)
  const test = mockTestData[testId]

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark">
        <div className="text-center">
          <h2 className="text-heading font-bold mb-2 text-gray-900 dark:text-white">Test not found</h2>
          <p className="text-body-sm text-gray-500 dark:text-gray-400 mb-4">This test doesn&apos;t exist or hasn&apos;t been created yet.</p>
          <Button href="/tests" variant="primary">← Back to Test Library</Button>
        </div>
      </div>
    )
  }

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(test.duration * 60)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const totalQuestions = test.questions.length
  const isMcq = test.module === "listening" || test.module === "reading"
  const isWriting = test.module === "writing"
  const isSpeaking = test.module === "speaking"

  // Countdown timer
  useEffect(() => {
    if (submitted) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [submitted])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const progress = ((currentQ + 1) / totalQuestions) * 100
  const answeredCount = Object.keys(answers).length

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
    // Auto-advance after a brief delay
    if (currentQ < totalQuestions - 1) {
      setTimeout(() => setCurrentQ((p) => p + 1), 400)
    }
  }

  const handleTextChange = (questionId: number, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }))
  }

  // Speaking recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const reader = new FileReader()
        reader.onloadend = () => {
          setAnswers((prev) => ({ ...prev, [test.questions[currentQ].id]: reader.result as string }))
        }
        reader.readAsDataURL(blob)
        stream.getTracks().forEach((t) => t.stop())
      }

      recorder.start()
      setIsListening(true)
    } catch (err) {
      console.error("Mic access denied:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
    setIsListening(false)
  }

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    // Simulate API call to POST /api/tests/submit
    await new Promise((r) => setTimeout(r, 1500))
    const attemptId = Math.floor(Math.random() * 10000)
    setSubmitted(true)
    router.push(`/results/${attemptId}?testId=${testId}`)
  }, [router, testId])

  // If already submitted, don't render the test
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-success-light dark:bg-success-dark/30 flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-heading font-bold mb-2">Test Submitted!</h2>
          <p className="text-body-sm text-gray-500 dark:text-gray-400 mb-4">Redirecting to results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark flex flex-col">
      {/* Top Bar */}
      <header className="glass border-b border-surface-border dark:border-surface-dark-border sticky top-0 z-50">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-gray-900 dark:text-white truncate max-w-[200px]">{test.name}</span>
            <Badge variant="outline" size="sm" className="hidden sm:inline-flex">{test.module}</Badge>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="h-1.5 w-24 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
              </div>
              <span>{answeredCount}/{totalQuestions}</span>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-1.5 font-mono text-sm font-semibold px-3 py-1 rounded-lg ${
              timeLeft < 300 ? "bg-error-light text-error dark:bg-error-dark/30 dark:text-error-light animate-pulse-soft" : "bg-gray-100 dark:bg-surface-dark-muted text-gray-700 dark:text-gray-300"
            }`}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {formatTime(timeLeft)}
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              loading={submitting}
              disabled={answeredCount === 0}
            >
              Submit
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Question Navigation Sidebar */}
        <aside className="hidden md:flex flex-col w-20 lg:w-24 bg-white dark:bg-surface-dark-muted border-r border-surface-border dark:border-surface-dark-border p-3 overflow-y-auto">
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3 text-center">Questions</p>
          <div className="flex flex-col gap-1.5">
            {test.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQ(idx)}
                className={`h-9 w-full rounded-lg text-xs font-medium transition-all ${
                  idx === currentQ
                    ? "bg-primary-600 text-white shadow-soft"
                    : answers[q.id]
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                    : "bg-gray-50 dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-border"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Mini progress */}
          <div className="mt-auto pt-3 border-t border-surface-border dark:border-surface-dark-border">
            <div className="text-[10px] text-center text-gray-400">
              <div className="font-medium">{answeredCount}/{totalQuestions}</div>
              <div className="text-[9px]">done</div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 md:p-8">
            {/* Mobile progress bar */}
            <div className="md:hidden flex items-center gap-3 mb-4">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-surface-dark-muted flex items-center justify-center disabled:opacity-30"
              >
                ←
              </button>
              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <button
                onClick={() => setCurrentQ(Math.min(totalQuestions - 1, currentQ + 1))}
                disabled={currentQ === totalQuestions - 1}
                className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-surface-dark-muted flex items-center justify-center disabled:opacity-30"
              >
                →
              </button>
            </div>

            {/* Question Counter */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Question {currentQ + 1} of {totalQuestions}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
              >
                {test.module === "listening" && (
                  <ListeningQuestion
                    question={test.questions[currentQ]}
                    selected={answers[test.questions[currentQ].id]}
                    onSelect={handleOptionSelect}
                  />
                )}
                {test.module === "reading" && (
                  <ReadingQuestion
                    question={test.questions[currentQ]}
                    selected={answers[test.questions[currentQ].id]}
                    onSelect={handleOptionSelect}
                    passage="Le réchauffement climatique est l'un des plus grands défis de notre époque. Selon le Groupe d'experts intergouvernemental sur l'évolution du climat (GIEC), les activités humaines sont la cause principale de l'augmentation des températures mondiales depuis le début de l'ère industrielle. Les émissions de gaz à effet de serre, notamment le dioxyde de carbone et le méthane, ont atteint des niveaux sans précédent..."
                  />
                )}
                {test.module === "writing" && (
                  <WritingQuestion
                    question={test.questions[currentQ]}
                    value={answers[test.questions[currentQ].id] || ""}
                    onChange={handleTextChange}
                  />
                )}
                {test.module === "speaking" && (
                  <SpeakingQuestion
                    question={test.questions[currentQ]}
                    recorded={!!answers[test.questions[currentQ].id]}
                    isRecording={isListening}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
              >
                ← Previous
              </Button>

              {currentQ < totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  onClick={() => setCurrentQ((p) => p + 1)}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  Submit Test
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/* ---- Module-Specific Question Components ---- */

function ListeningQuestion({
  question,
  selected,
  onSelect,
}: {
  question: { id: number; question: string; audioContent?: string; options?: string[] }
  selected?: string
  onSelect: (id: number, option: string) => void
}) {
  const [playing, setPlaying] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const handlePlay = () => {
    if (playing) {
      window.speechSynthesis.cancel()
      setPlaying(false)
      return
    }

    // Play the audio content (the actual French conversation/dialogue)
    const text = question.audioContent || question.question.replace(/^Audio:\s*/i, "")

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "fr-FR"
    utterance.rate = 0.85
    utterance.pitch = 1.0

    utterance.onend = () => setPlaying(false)
    utterance.onerror = () => setPlaying(false)

    utteranceRef.current = utterance
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setPlaying(true)
  }

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [question.id])

  return (
    <Card glass>
      <CardContent className="p-6">
        {/* Audio Player */}
        <div className="mb-6">
          <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-950/40 rounded-xl border border-primary-100 dark:border-primary-900">
            <button
              onClick={handlePlay}
              className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700 transition-colors shrink-0"
            >
              {playing ? (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <div className="h-1.5 bg-primary-200 dark:bg-primary-800 rounded-full overflow-hidden">
                <div className={`h-full bg-primary-500 rounded-full transition-all duration-300 ${playing ? "w-full animate-pulse" : "w-0"}`} />
              </div>
              <div className="flex justify-between mt-1 text-xs text-primary-600 dark:text-primary-400">
                <span>{playing ? "Playing French dialogue..." : "Click to hear the conversation"}</span>
                <span>{playing ? "●" : "▶"}</span>
              </div>
            </div>
            <Badge variant="default" size="sm">A2 Level</Badge>
          </div>
          <p className="text-xs text-primary-500 dark:text-primary-400 mt-2 text-center">
            {playing ? "🔊 Listen carefully, then answer the question below" : "▶ Press play to hear the audio"}
          </p>
        </div>

        {/* Question */}
        <h3 className="text-body font-medium text-gray-900 dark:text-white mb-4">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5">
          {question.options?.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(question.id, opt)}
              className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                selected === opt
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium"
                  : "border-surface-border dark:border-surface-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-dark-muted"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selected === opt ? "border-primary-500" : "border-gray-300 dark:border-gray-600"
                }`}>
                  {selected === opt && <div className="h-2 w-2 rounded-full bg-primary-500" />}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ReadingQuestion({
  question,
  selected,
  onSelect,
  passage,
}: {
  question: { id: number; question: string; options?: string[] }
  selected?: string
  onSelect: (id: number, option: string) => void
  passage: string
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Passage Panel */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" size="sm">Extrait</Badge>
            <span className="text-xs text-gray-400">Document A</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{passage}</p>
        </CardContent>
      </Card>

      {/* Question Panel */}
      <Card glass>
        <CardContent className="p-5">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">{question.question}</h3>
          <div className="space-y-2">
            {question.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => onSelect(question.id, opt)}
                className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                  selected === opt
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium"
                    : "border-surface-border dark:border-surface-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-dark-muted"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selected === opt ? "border-primary-500" : "border-gray-300 dark:border-gray-600"
                  }`}>
                    {selected === opt && <div className="h-2 w-2 rounded-full bg-primary-500" />}
                  </div>
                  <span className="text-xs">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WritingQuestion({
  question,
  value,
  onChange,
}: {
  question: { id: number; question: string }
  value: string
  onChange: (id: number, text: string) => void
}) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0

  return (
    <Card glass>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-body font-medium text-gray-900 dark:text-white">{question.question}</h3>
          <Badge variant="outline" size="sm">{wordCount} words</Badge>
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder="Écrivez votre réponse ici..."
          rows={12}
          className="w-full p-4 rounded-xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm leading-relaxed"
        />

        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Minimum 120 words recommended
          </p>
          <div className="h-1 w-32 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                wordCount >= 120 ? "bg-success" : wordCount >= 60 ? "bg-warning" : "bg-gray-300 dark:bg-gray-600"
              }`}
              style={{ width: `${Math.min(100, (wordCount / 120) * 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SpeakingQuestion({
  question,
  recorded,
  isRecording,
  onStartRecording,
  onStopRecording,
}: {
  question: { id: number; question: string }
  recorded: boolean
  isRecording: boolean
  onStartRecording: () => void
  onStopRecording: () => void
}) {
  return (
    <Card glass>
      <CardContent className="p-6 text-center">
        <div className="mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <h3 className="text-body font-medium text-gray-900 dark:text-white mb-2">
            {question.question}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You will have 2 minutes to record your response
          </p>
        </div>

        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-4">
          {isRecording ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-error animate-pulse" />
                <span className="text-sm font-medium text-error">Recording...</span>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={onStopRecording}
                className="border-error text-error hover:bg-error-light/20"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                Stop Recording
              </Button>
            </div>
          ) : recorded ? (
            <div className="flex flex-col items-center gap-3">
              <Badge variant="success" size="lg">✓ Recorded</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={onStartRecording}
              >
                Re-record
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={onStartRecording}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" />
              </svg>
              Start Recording
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}