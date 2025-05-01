import { BrowserRouter,Routes,Route } from "react-router-dom"
import React from "react"

import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
import { Button } from "./components/ui/button"

function App() {

  return(
    
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LogInPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
