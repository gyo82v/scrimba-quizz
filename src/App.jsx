import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Home from "./pages/Home"
import Quizz, {loader as questionsLoader} from "./pages/Quizz"


function App() {
 
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/"  element={<Home/>} />
      <Route path="quizz" element={<Quizz />} loader={questionsLoader} />
    </>
  ))
 
  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} hydrateFallbackElement={<div aria-hidden="true" />} />
    </div>
  )
}

export default App
