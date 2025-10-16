import { useState, useMemo, useEffect } from "react"
import he from "he"

export default function Question({question, correct_answer, incorrect_answers, index, onSelect, showResults}){
    const container = `text-slate-600 w-full flex flex-col gap-2 shadow-lg bg-slate-100 
                       p-3 xl:p-6`
    const btn = `flex-1 bg-gradient-to-br 
                 py-1 px-4 rounded-lg shadow-lg shadow-slate-700/30 font-semibold 
                 transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-200 hover:to-slate-300
                 disabled:pointer-events-none`
        
    const decodedCorrect = useMemo(() => he.decode(correct_answer), [correct_answer])
    const decodedQuestion = useMemo(() => he.decode(question), [question])

    const shuffledAnswers = useMemo(() => {
      return shuffleArray([...incorrect_answers, correct_answer].map(a => he.decode(a)))
    },[question, incorrect_answers, correct_answer])

    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [isLocked, setIsLocked] = useState(false)

    useEffect(() => {
      setSelectedAnswer(null)
      setIsLocked(false)
    }, [question, correct_answer, incorrect_answers])

    const handleSelect = answer => {
        if(isLocked || showResults) return
        setSelectedAnswer(answer)
        setIsLocked(true)
        onSelect?.(index, answer)
    }

    function shuffleArray(array) {
      const arr = [...array]; // copy to avoid mutating original
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
      }
      return arr;
    }

    const answerArray = shuffledAnswers.map((a, i) => {
        const isSelected = selectedAnswer === a 
        let conditional = isSelected ? "from-rose-300 to-rose-200" :
                                         "from-slate-300 to-slate-200"

        if (showResults) {
            if (a === decodedCorrect && selectedAnswer !== decodedCorrect) {
              // correct answer that user missed -> green
              conditional = "from-lime-300 to-lime-200"
            } else if (isSelected && a !== decodedCorrect) {
              // selected but wrong -> keep red-ish (show user their wrong pick)
              conditional = "from-rose-300 to-rose-200"
            } else if(isLocked && a === decodedCorrect){
              //selected and correct
              conditional = "from-lime-300 to-lime-200"
            } else {
              // otherwise remain neutral
              conditional = "from-slate-300 to-slate-200"
            }
          }

        return(
          <button 
            key={`${a}-${i}`} 
            className={`${btn} ${conditional}`} 
            disabled={isLocked || showResults}
            aria-disabled={isLocked || showResults}
            aria-pressed={selectedAnswer === a}
            onClick={() => handleSelect(a)}
          >
            {a}
          </button>
        )
        
})

    return(
        <section className={container}>
            <h1 className="font-bold text-lg xl:text-xl xl:mb-3">{decodedQuestion}</h1>
            <section className="flex flex-wrap gap-3 w-full">
                {answerArray}
            </section>
        </section>
    )
}