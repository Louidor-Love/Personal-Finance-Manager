import { Link, useNavigate, Navigate } from "react-router-dom";
import { registerRequest } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import logo from '../assets/logo.png';

const RegisterPage = () => {

    const navigate = useNavigate();
    const { isAuth } = useAuthStore();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRePassword] = useState("");

    const registerMutation = useMutation({
        mutationFn: () => registerRequest(email, password, name),
        onSuccess: () => {
            toast.success("Registro exitoso! Hace login!")
            navigate("/login")
        },
        onError: () => {
            toast.error("Hubo un error, intenta devuelta")
        }
    })

    const handleMatch = () => {
        if (password !== re_password) {
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (password !== re_password) {
            toast.error("Las passwords deben coincidir")
        } else {
            registerMutation.mutate()
        }
    }

    if (registerMutation.isLoading) return <p>Loading...</p>
    if (isAuth) return (<Navigate to="/"/>)

    return (

      <body className="bg-secondary container-fluid d-flex flex-column align-items-center justify-content-center vh-100 vw-100"  >
        <div className="bg-secondary container d-flex flex-column align-items-center justify-content-center py-5 " >
          
          <Link to="" className="d-flex align-items-center mb-4 text-2xl font-weight-bold text-dark">
              <img className="img-fluid  img-size-24" src={logo} alt="logo"  style={{ width: '64px', height: 'auto' }}/>
          </Link>
          <h1 style={{ color: 'white' }}>Finance Manager</h1>
          <h2 style={{ color: 'white' }}>Create a new account</h2>
        
          <div className="w-100 max-w-md bg-light rounded-lg shadow-sm" style={{ background: '#454d55' }}>
              <div className="p-4" style={{ background: '#454d55' }}>
                <form  onSubmit={handleSubmit}>
                    <div className="mb-3" style={{ background: '#454d55' }}>
                        <label htmlFor="email" className="form-label mb-2" style={{ color: 'white' }}>email</label>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            required
                            name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                    </div>

                    <div className="mb-3" style={{ background: '#454d55' }}>
                         <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                         <input 
                             value={password}
                             required
                             onChange={(e) => setPassword(e.target.value)}
                             type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>

                    <div className="mb-3" style={{ background: '#454d55' }}>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input 
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                          type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"/>
                    </div>

                    <div className="mb-3" style={{ background: '#454d55' }}>
                      <label htmlFor="re-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                      <input 
                          value={re_password}
                          required
                          onChange={(e) => setRePassword(e.target.value)}
                          type="password" name="re-password" id="re-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>

            {handleMatch() ? false : <p className="text-sm font-medium text-red-500">Passwords must match</p>}

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
              </p>
            </form>
              </div>
          </div>
        </div>
      </body>
    )
    
}
export default RegisterPage;