import {useState} from "react"
import {useLoaderData, useRevalidator} from "react-router-dom"
import he from "he"
import Question from "../components/Question"

export const loader = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    if(!res.ok){throw new Response("error fetching data GET", {status : res.status})}
    const data = await res.json()
    return data.results
}

export default function Quizz(){
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)
    const [userAnswers, setUserAnswers] = useState({})
    const questions = useLoaderData()
    const revalidator = useRevalidator()

    const flex = `flex flex-col`
  
    const btn = `px-4 py-2 rounded-lg shadow-lg shadow-slate-700/30 text-lg font-bold
                 bg-gradient-to-br from-slate-600 to-slate-400 text-slate-100
                 transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-400 hover:to-slate-600`
    const result = `flex items-center justify-between w-full
                    p-4 rounded-lg shadow-lg shadow-slate-700/30
                    bg-gradient-to-br from-slate-200 to-slate-100`
    
    const handleAnswers = (index, answer) => {
        setUserAnswers(a => ({...a, [index] : answer}))
    }

    const allAnswered = Object.keys(userAnswers).length === questions.length

    const handleCheckAnswers = () => {
        let score = 0
        for(let i = 0; i < questions.length; i++){
            const userAns = userAnswers[i]
            const correct = he.decode(questions[i].correct_answer)
            if(userAns === correct) score += 1
        }
        setShowResults(true)
        setScore(score)
        console.log(`Score: ${score}/${questions.length}`)
    }

    const handleNewGame = async () => {
        setShowResults(false)
        setScore(0)
        setUserAnswers({})
        await revalidator.revalidate()
    }
  
    const questionsArr = questions.map((q, i) => (
        <Question key={i} index={i} {...q} onSelect={handleAnswers} showResults={showResults} />
    ))

    return(
        <main className={`${flex} items-center p-4 `}>
            <section className={`${flex} items-center  w-11/12`}>
                <section className={`${flex} gap-5 w-full`}>
                    {questionsArr}
                </section>
                <section className="mt-10 flex items-center justify-center  w-full">
                  {showResults ? 
                    <div className={result}>
                      <p className="font-bold text-xl  text-slate-700">{`Your Score: ${score}/5`}</p>
                      <button
                        className={btn}
                        onClick={handleNewGame}
                      >
                          New Quizz
                      </button>
                    </div> :
                    <button 
                      onClick={handleCheckAnswers} 
                      className={`${btn} mx-auto`} 
                      disabled={!allAnswered}
                      aria-disabled={!allAnswered}
                    >
                      Check answers
                    </button>
                  }
                </section>
            </section>
        </main>
    )
}