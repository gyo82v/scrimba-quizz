import {Link} from "react-router-dom"

export default function Home(){
    const btn = `mt-8 px-4 py-2 rounded-lg shadow-lg shadow-slate-700/30 text-lg font-bold
                 bg-gradient-to-br from-slate-600 to-slate-400 text-slate-100
                 transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-400 hover:to-slate-600`
    return(
        <main className="text-slate-600 flex flex-col items-center mt-30 min-h-screen">
            <section className="flex flex-col items-center">
                <h1 className="font-bold text-4xl mb-3">Quizzical</h1>
                <p className="font-semibold text-slate-600">
                    Can you nail five correct answers? Let’s find out!
                </p>
                <button className={btn}><Link to="quizz">Start Quizz</Link></button>
            </section>
        </main>
    )
}