import { useState, useMemo, useEffect } from "react"
import { focusEffects, transitionBase } from "../styles/patterns"
import { questionStyle } from "../styles/ui"
import he from "he"

export default function Question({
  question,
  correct_answer,
  incorrect_answers,
  index,
  onSelect,
  showResults,
}) {
  const decodedCorrect = useMemo(() => he.decode(correct_answer), [correct_answer])
  const decodedQuestion = useMemo(() => he.decode(question), [question])

  const shuffledAnswers = useMemo(() => {
    return shuffleArray([...incorrect_answers, correct_answer].map((a) => he.decode(a)))
  }, [question, incorrect_answers, correct_answer])

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    setSelectedAnswer(null)
    setIsLocked(false)
  }, [question, correct_answer, incorrect_answers])

  const handleSelect = (answer) => {
    if (isLocked || showResults) return
    setSelectedAnswer(answer)
    setIsLocked(true)
    onSelect?.(index, answer)
  }

  function shuffleArray(array) {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  const answerArray = shuffledAnswers.map((a, i) => {
    const isSelected = selectedAnswer === a
    let conditional = isSelected
      ? "from-rose-300 to-rose-200"
      : "from-slate-300 to-slate-200"

    if (showResults) {
      if (a === decodedCorrect && selectedAnswer !== decodedCorrect) {
        conditional = "from-lime-300 to-lime-200"
      } else if (isSelected && a !== decodedCorrect) {
        conditional = "from-rose-300 to-rose-200"
      } else if (isLocked && a === decodedCorrect) {
        conditional = "from-lime-300 to-lime-200"
      } else {
        conditional = "from-slate-300 to-slate-200"
      }
    }

    return (
      <button
        type="button"
        key={`${a}-${i}`}
        className={`${questionStyle} ${focusEffects} ${transitionBase} ${conditional}`}
        disabled={isLocked || showResults}
        aria-pressed={selectedAnswer === a}
        onClick={() => handleSelect(a)}
      >
        {a}
      </button>
    )
  })

  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-lg shadow-slate-700/10 md:p-6">
      <h2 className="text-lg font-bold leading-snug text-slate-700 md:text-xl">
        {decodedQuestion}
      </h2>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {answerArray}
      </section>
    </section>
  )
}
