import { Link } from "react-router-dom"
import { linkStyle } from "../styles/ui"
import { transitionBase, focusEffects } from "../styles/patterns"

export default function Home() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 px-4">
      <section className="mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center text-center">
        <div className="w-full rounded-2xl border border-slate-200 bg-slate-100/80 p-6 shadow-lg shadow-slate-700/10 backdrop-blur md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Welcome to
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-700 sm:text-5xl md:text-6xl">
            Quizzical
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            Can you nail five correct answers?  
            Test your knowledge across random questions and see how sharp you are.
          </p>

          <Link
            to="quizz"
            className={`${linkStyle} ${transitionBase} ${focusEffects} mt-8 w-full md:w-auto`}
          >
            Start Quiz
          </Link>
        </div>
      </section>
    </main>
  )
}


/*
import {Link} from "react-router-dom"
import {linkStyle} from "../styles/ui"
import {transitionBase, focusEffects} from "../styles/patterns"

export default function Home(){
    return(
        <main className="text-slate-600 flex flex-col items-center mt-30 min-h-screen">
            <section className="flex flex-col items-center">
                <h1 className="font-bold text-4xl mb-3">Quizzical</h1>
                <p className="font-semibold text-slate-600">
                    Can you nail five correct answers? Let’s find out!
                </p>
                <Link 
                  className={`${linkStyle} ${transitionBase} ${focusEffects} mt-8`} 
                  to="quizz"
                >Start Quizz
                </Link>
            </section>
        </main>
    )
}

*/