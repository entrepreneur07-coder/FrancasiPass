"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge, Button, Card, CardContent } from "@/components/ui"
import Link from "next/link"

// Mock vocabulary data — will be replaced with API call to /api/vocabulary
const vocabularyWords = [
  { word: "citoyenneté", definition: "citizenship", sentence: "La cérémonie de citoyenneté est un moment émouvant.", level: "A1", category: "immigration" },
  { word: "résidence", definition: "residence", sentence: "Il a obtenu sa résidence permanente l'année dernière.", level: "A1", category: "immigration" },
  { word: "visa", definition: "visa", sentence: "N'oubliez pas de renouveler votre visa de visiteur.", level: "A1", category: "immigration" },
  { word: "intégration", definition: "integration", sentence: "L'intégration passe par l'apprentissage de la langue.", level: "A1", category: "immigration" },
  { word: "naturalisation", definition: "naturalization", sentence: "Le dossier de naturalisation est complexe.", level: "A1", category: "immigration" },
  { word: "parrainage", definition: "sponsorship", sentence: "Le parrainage d'un conjoint peut prendre plusieurs mois.", level: "A1", category: "immigration" },
  { word: "embauche", definition: "hiring", sentence: "Cette entreprise prévoit l'embauche de dix nouveaux employés.", level: "A1", category: "work" },
  { word: "salaire", definition: "salary", sentence: "Le salaire minimum varie selon la province.", level: "A1", category: "work" },
  { word: "compétence", definition: "skill", sentence: "Il possède les compétences nécessaires pour ce poste.", level: "A1", category: "work" },
  { word: "entretien", definition: "interview", sentence: "Mon entretien d'embauche s'est bien passé.", level: "A1", category: "work" },
  { word: "diplôme", definition: "degree/diploma", sentence: "Elle a obtenu son diplôme universitaire en juin.", level: "A1", category: "education" },
  { word: "bourse", definition: "scholarship", sentence: "Il a reçu une bourse pour ses études.", level: "A1", category: "education" },
  { word: "examen", definition: "exam", sentence: "L'examen final aura lieu dans le gymnase.", level: "A1", category: "education" },
  { word: "apprentissage", definition: "learning", sentence: "L'apprentissage d'une langue demande de la patience.", level: "A1", category: "education" },
  { word: "loyer", definition: "rent", sentence: "Le loyer est dû le premier du mois.", level: "A1", category: "housing" },
  { word: "appartement", definition: "apartment", sentence: "Je cherche un appartement de deux chambres.", level: "A1", category: "housing" },
  { word: "déménagement", definition: "moving", sentence: "Le déménagement est prévu pour samedi.", level: "A1", category: "housing" },
  { word: "rendez-vous", definition: "appointment", sentence: "J'ai un rendez-vous chez le médecin à 14h.", level: "A1", category: "daily" },
  { word: "ordonnance", definition: "prescription", sentence: "Le médecin m'a donné une ordonnance.", level: "A1", category: "health" },
  { word: "remboursement", definition: "reimbursement", sentence: "Le remboursement des soins est couvert par l'assurance.", level: "A2", category: "health" },
  { word: "impôt", definition: "tax", sentence: "Je dois déclarer mes impôts avant le 30 avril.", level: "A2", category: "finance" },
  { word: "épargne", definition: "savings", sentence: "Il est important d'avoir une épargne de précaution.", level: "A2", category: "finance" },
  { word: "hypothèque", definition: "mortgage", sentence: "Nous avons contracté une hypothèque pour acheter notre maison.", level: "B1", category: "housing" },
  { word: "caution", definition: "deposit/guarantee", sentence: "Le propriétaire demande un dépôt de caution.", level: "B1", category: "housing" },
  { word: "préavis", definition: "notice period", sentence: "Je dois donner un préavis de deux mois.", level: "B1", category: "work" },
  { word: "délai", definition: "deadline", sentence: "Le délai de soumission est vendredi prochain.", level: "A2", category: "daily" },
  { word: "convention", definition: "agreement", sentence: "Nous avons signé une convention de stage.", level: "B1", category: "work" },
  { word: "déduction", definition: "deduction", sentence: "Vous pouvez bénéficier d'une déduction fiscale.", level: "B1", category: "finance" },
  { word: "cotisation", definition: "contribution", sentence: "Les cotisations sociales sont prélevées sur le salaire.", level: "B1", category: "finance" },
  { word: "prestation", definition: "benefit", sentence: "Les prestations familiales sont versées mensuellement.", level: "B1", category: "finance" },
]

type Category = "all" | "immigration" | "work" | "education" | "housing" | "daily" | "health" | "finance"
type Level = "all" | "A1" | "A2" | "B1" | "C1"

export default function VocabularyPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<Category>("all")
  const [level, setLevel] = useState<Level>("all")
  const [flippedId, setFlippedId] = useState<number | null>(null)

  const filtered = vocabularyWords.filter((w) => {
    if (category !== "all" && w.category !== category) return false
    if (level !== "all" && w.level !== level) return false
    if (search && !w.word.toLowerCase().includes(search.toLowerCase()) && !w.definition.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">Vocabulary</span>
          </Link>
          <Button href="/dashboard" variant="ghost" size="sm">← Back to Dashboard</Button>
        </div>
      </header>

      <main className="section-container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-heading-xl font-bold mb-1">French Vocabulary</h1>
              <p className="text-body-sm text-gray-500 dark:text-gray-400">
                {vocabularyWords.length} words · Spaced repetition · Click to flip
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search a word..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="h-10 px-4 rounded-xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="immigration">Immigration</option>
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="housing">Housing</option>
              <option value="daily">Daily Life</option>
              <option value="health">Health</option>
              <option value="finance">Finance</option>
            </select>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="h-10 px-4 rounded-xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Levels</option>
              <option value="A1">A1 (Beginner)</option>
              <option value="A2">A2 (Elementary)</option>
              <option value="B1">B1 (Intermediate)</option>
              <option value="C1">C1 (Advanced)</option>
            </select>
          </div>

          {/* Word Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((word, i) => {
              const isFlipped = flippedId === i
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card
                    hover
                    onClick={() => setFlippedId(isFlipped ? null : i)}
                    className="h-full cursor-pointer min-h-[160px]"
                  >
                    <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                      {isFlipped ? (
                        <>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">English</p>
                          <p className="text-heading font-bold text-accent-600 dark:text-accent-400 mb-3">
                            {word.definition}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                            "{word.sentence}"
                          </p>
                          <p className="text-xs text-gray-400 mt-2">Click to see French</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Français</p>
                          <p className="text-heading font-bold text-primary-600 dark:text-primary-400 mb-3">
                            {word.word}
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline" size="sm">{word.level}</Badge>
                            <Badge variant="default" size="sm">{word.category}</Badge>
                          </div>
                          <p className="text-xs text-gray-400 mt-3">Click to reveal translation</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 dark:text-gray-500">No words match your search. Try different filters.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}