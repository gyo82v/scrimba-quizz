import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Home from "./pages/Home"
import Quizz from "./pages/Quizz"


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/"  element={<Home />} />
      <Route path="quizz" element={<Quizz />} />
    </>
  ))
 
  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
