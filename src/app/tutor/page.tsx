"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import Link from "next/link"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "How do I improve my French listening comprehension?",
  "What&apos;s the difference between TCF and TEF for Express Entry?",
  "Can you correct this sentence: Je suis allé à le magasin?",
  "Tips for the speaking section pronunciation?",
  "How many CRS points can I get with CLB 7 in French?",
  "Practice: Conjugate 'venir' in passé composé",
]

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Bonjour! 👋 I'm your FrancaisPass AI Tutor. I can help you prepare for TEF Canada and TCF Canada exams. Ask me about grammar, vocabulary, exam strategies, or practice specific skills. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! For TCF Canada listening comprehension, focus on understanding main ideas before details. Try listening to French radio like France Info or RFI at 0.75x speed first, then gradually increase. Would you like a practice exercise?",
        "Excellent point! The key difference is: TCF Canada has 39 listening questions vs TEF's 60. TCF results come in 5-7 days vs TEF's 4-6 weeks. Both are valid for Express Entry. Choose based on your test center availability.",
        "The correct sentence is: 'Je suis allé **au** magasin.' Because 'le magasin' is masculine singular, 'à + le' contracts to 'au'. Remember: à + le = au, à + la = à la, à + l' = à l', à + les = aux.",
        "For speaking pronunciation, practice the French 'r' sound (guttural, from the back of your throat). Record yourself reading sentences and compare with native speakers. Focus on nasal vowels: an, in, on, un.",
        "With CLB 7 in French (NCLC 7), you can earn up to 50 additional CRS points under the French language proficiency bonus. Combined with English, this can significantly boost your Express Entry score!",
        "Here's the conjugation of 'venir' in passé composé:\n• Je suis venu(e)\n• Tu es venu(e)\n• Il/Elle est venu(e)\n• Nous sommes venu(e)s\n• Vous êtes venu(e)(s)\n• Ils/Elles sont venu(e)s\n\nRemember: 'venir' uses 'être' as auxiliary!",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">AI Tutor</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="accent" size="sm">⚡ Online</Badge>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">← Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 section-container py-6 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2 scrollbar-hide">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-primary-600 text-white rounded-br-md"
                      : "bg-white dark:bg-surface-dark-muted border border-surface-border dark:border-surface-dark-border rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-[10px] font-bold">
                        AI
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">FrancaisPass Tutor</span>
                    </div>
                  )}
                  <p className={`text-sm whitespace-pre-wrap ${msg.role === "user" ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
                    {msg.content}
                  </p>
                  <p className={`text-xs mt-2 ${msg.role === "user" ? "text-primary-200" : "text-gray-400"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white dark:bg-surface-dark-muted border border-surface-border dark:border-surface-dark-border rounded-2xl rounded-bl-md p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-[10px] font-bold">
                      AI
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Tutor is typing...</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Suggested questions</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q)
                    }}
                    className="px-3 py-1.5 rounded-full text-xs bg-white dark:bg-surface-dark-muted border border-surface-border dark:border-surface-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-surface-dark-border transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="glass rounded-2xl border border-surface-border dark:border-surface-dark-border p-2">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask your French tutor anything..."
                rows={1}
                className="flex-1 bg-transparent border-0 outline-none resize-none px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 max-h-32"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="h-10 w-10 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">
            AI responses are for practice purposes. Always verify with official exam materials.
          </p>
        </div>
      </main>
    </div>
  )
}