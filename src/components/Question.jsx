import { useState } from "react"

export default function Question({question, correct_answer, incorrect_answers}){
    const container = `text-slate-600 w-full flex flex-col gap-2 shadow-lg bg-slate-100 
                       p-3`
    const h1 = `font-bold text-lg`
    const section = `flex flex-wrap gap-3 w-full`
    const btn = `flex-1 bg-gradient-to-br from-slate-300 to-slate-200 
                 py-1 px-4 rounded-lg shadow-lg shadow-slate-700/30 
                 font-semibold 
                 transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-200 hover:to-slate-300 `
    const [shuffledAnswers] = useState(() => shuffleArray([...incorrect_answers, correct_answer]))

    function shuffleArray(array) {
      const arr = [...array]; // copy to avoid mutating original
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
      }
      return arr;
    }

    const answerArray = shuffledAnswers.map((a, i) => (
        <button key={i} className={btn}>{a}</button>
    ))

    return(
        <section className={container}>
            <h1 className={h1}>{question}</h1>
            <section className={section}>
                {answerArray}
            </section>
        </section>
    )
}