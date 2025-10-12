import { useState, useMemo, useEffect } from "react"

export default function Question({question, correct_answer, incorrect_answers, index, onSelect}){
    const container = `text-slate-600 w-full flex flex-col gap-2 shadow-lg bg-slate-100 
                       p-3`
    const h1 = `font-bold text-lg`
    const section = `flex flex-wrap gap-3 w-full`
    const btn = `flex-1 bg-gradient-to-br 
                 py-1 px-4 rounded-lg shadow-lg shadow-slate-700/30 
                 font-semibold 
                 transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-200 hover:to-slate-300 `

    const shuffledAnswers = useMemo(() => {
      return shuffleArray([...incorrect_answers, correct_answer])
    },[question, incorrect_answers, correct_answer])

    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [isLocked, setIsLocked] = useState(false)

    useEffect(() => {
      setSelectedAnswer(null)
      setIsLocked(false)
    }, [question, correct_answer, incorrect_answers])

    const handleSelect = answer => {
        if(isLocked) return
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
        const conditional = isSelected ? "from-rose-300 to-rose-200" :
                                         "from-slate-300 to-slate-200"

        return(
            <button 
          key={i} 
          className={`${btn} ${conditional}`} 
          disabled={isLocked}
          aria-disabled={isLocked}
          aria-pressed={selectedAnswer === a}
          onClick={() => handleSelect(a)}
        >
          {a}
        </button>
        )
        
   
})

    return(
        <section className={container}>
            <h1 className={h1}>{question}</h1>
            <section className={section}>
                {answerArray}
            </section>
        </section>
    )
}