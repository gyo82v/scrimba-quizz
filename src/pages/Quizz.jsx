import { useState } from "react"
import { useLoaderData, useRevalidator } from "react-router-dom"
import Confetti from "react-confetti"
import he from "he"
import Question from "../components/Question"
import { linkStyle } from "../styles/ui"
import { transitionBase, focusEffects } from "../styles/patterns"

export default function Quizz() {
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const questions = useLoaderData()
  const revalidator = useRevalidator()

  const handleAnswers = (index, answer) =>
    setUserAnswers((a) => ({ ...a, [index]: answer }))

  const allAnswered = Object.keys(userAnswers).length === questions.length

  const handleCheckAnswers = () => {
    let score = 0
    for (let i = 0; i < questions.length; i++) {
      const userAns = userAnswers[i]
      const correct = he.decode(questions[i].correct_answer)
      if (userAns === correct) score += 1
    }
    setShowResults(true)
    setScore(score)
  }

  const handleNewGame = async () => {
    setShowResults(false)
    setScore(0)
    setUserAnswers({})
    await revalidator.revalidate()
  }

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 px-4 py-6 md:px-6 md:py-10">
      {score === 5 && <Confetti />}

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="rounded-2xl border border-slate-200 bg-slate-100/80 p-4 shadow-lg shadow-slate-700/10 backdrop-blur md:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Quiz time
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-700 md:text-3xl">
            Test your knowledge
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Answer five random questions, check your score, then try again for a new set.
          </p>
        </header>

        <section className="flex w-full flex-col gap-4 md:gap-6">
          {questions.map((q, i) => (
            <Question
              key={i}
              index={i}
              {...q}
              onSelect={handleAnswers}
              showResults={showResults}
            />
          ))}
        </section>

        <section className="flex w-full justify-center pt-2 md:pt-4">
          {showResults ? (
            <div className="flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-200 to-slate-100 p-4 shadow-lg shadow-slate-700/20 md:flex-row md:items-center md:justify-between md:p-5">
              <p className="text-center text-xl font-bold text-slate-700 md:text-left">
                {`Your Score: ${score}/5`}
              </p>

              <button
                type="button"
                onClick={handleNewGame}
                className={`${linkStyle} ${transitionBase} ${focusEffects} w-full md:w-auto`}
              >
                New Quiz
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCheckAnswers}
              disabled={!allAnswered}
              className={`${linkStyle} ${transitionBase} ${focusEffects} w-full md:w-auto`}
            >
              Check answers
            </button>
          )}
        </section>
      </section>
    </main>
  )
}
