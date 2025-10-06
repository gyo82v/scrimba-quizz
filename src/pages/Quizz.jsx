import {useState, useEffect} from "react"
import {useLoaderData} from "react-router-dom"

export const loader = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    if(!res.ok){throw new Response("error fetching data GET", {status : res.status})}
    const data = await res.json()
    return data.results
}

export default function Quizz(){
    const container = `flex flex-col items-center p-4 border border-red-500`
    const section1 = `flex flex-col items-center border border-green-500 w-11/12`
    const section2 = `border border-violet-500 w-full`
    const section3 = `border border-yellow-500`
    const btn = `px-4 py-2 rounded-lg shadow-lg shadow-slate-700/30 text-lg font-bold
                 bg-gradient-to-br from-slate-600 to-slate-400 text-slate-100
                 transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-400 hover:to-slate-600`
    
    const questions = useLoaderData()
    console.log("questions: ", questions)

    const questionsArr = questions.map(q => (
        <section key={q.question}>
            <h2>{q.question}</h2>
        </section>
    ))

    console.log("questions array: ", questionsArr)
    
    return(
        <main className={container}>
            <section className={section1}>
                <section className={section2}>
                    {questionsArr}
                </section>
                <section className={section3}>
                    <button className={btn}>Check answers</button>
                </section>
            </section>
        </main>
    )
}