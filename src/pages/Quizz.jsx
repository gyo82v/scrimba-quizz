import {useState} from "react"
import {useLoaderData} from "react-router-dom"
import Question from "../components/Question"

export const loader = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    if(!res.ok){throw new Response("error fetching data GET", {status : res.status})}
    const data = await res.json()
    return data.results
}

export default function Quizz(){
    const [showResults, setShowResults] = useState(false)
  
    const container = `flex flex-col items-center p-4 `
    const section1 = `flex flex-col items-center  w-11/12`
    const section2 = ` w-full flex flex-col gap-5 w-full`
    const section3 = `mt-4`
    const btn = `px-4 py-2 rounded-lg shadow-lg shadow-slate-700/30 text-lg font-bold
                 bg-gradient-to-br from-slate-600 to-slate-400 text-slate-100
                 transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-400 hover:to-slate-600`
    
    const questions = useLoaderData()
    const [userAnswers, setUserAnswers] = useState({})

    const handleAnswers = (index, answer) => {
        setUserAnswers(a => ({...a, [index] : answer}))
    }

    const allAnswered = Object.keys(userAnswers).length === questions.length

    const handleCheckAnswers = () => {
        let score = 0
        for(let i = 0; i < questions.length; i++){
            const userAns = userAnswers[i]
            const correct = questions[i].correct_answer
            if(userAns === correct) score += 1
        }
        console.log(`Score: ${score}/${questions.length}`)
    }
  
    const questionsArr = questions.map((q, i) => (
        <Question key={i} index={i} {...q} onSelect={handleAnswers} />
    ))

    return(
        <main className={container}>
            <section className={section1}>
                <section className={section2}>
                    {questionsArr}
                </section>
                <section className={section3}>
                    <button 
                      onClick={handleCheckAnswers} 
                      className={btn} 
                      disabled={!allAnswered}
                      aria-disabled={!allAnswered}
                    >
                        Check answers
                    </button>
                </section>
            </section>
        </main>
    )
}