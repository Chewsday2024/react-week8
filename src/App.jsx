import { Outlet } from "react-router-dom"
import Header from "./layout/Header"
import Footer from "./layout/Footer"


function App() {
  
  return (
    <>
      <Header />

      <Outlet />
      
      <Footer />
    </>
  )
}

export default App
