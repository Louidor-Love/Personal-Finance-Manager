import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />} >
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                

                <Route index element={<HomePage />} />


            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
