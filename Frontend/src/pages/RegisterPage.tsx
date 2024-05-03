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
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
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

      <body className="bg-secondary container-fluid d-flex flex-column align-items-center justify-content-center vh-50 vw-50">
        <div className="bg-secondary container d-flex flex-column align-items-center justify-content-center py-5 ">
          
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
                            name="email" id="email" className="form-control" placeholder="name@company.com"/>
                    </div>

                    <div className="mb-3" style={{ background: '#454d55' }}>
                         <label htmlFor="password" className="form-label mb-2" style={{ color: 'white' }}>Password</label>
                         <input 
                             value={password}
                             required
                             onChange={(e) => setPassword(e.target.value)}
                             type="password" name="password" id="password" placeholder="Password" className="form-control"/>
                    </div>

                    <div className="mb-3" style={{ background: '#454d55' }}>
                      <label htmlFor="name" className="form-label mb-2" style={{ color: 'white' }}>Name</label>
                      <input 
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                          type="name" name="name" id="name" className="form-control" placeholder="Name"/>
                    </div>

                    <div className="mb-3" style={{ background: '#454d55' }}>
                      <label htmlFor="re-password" className="form-label mb-2" style={{ color: 'white' }}>Confirm Password</label>
                      <input 
                          value={re_password}
                          required
                          onChange={(e) => setRePassword(e.target.value)}
                          type="password" name="re-password" id="re-password" placeholder="Password" className="form-control" />
                    </div>
    

                    {handleMatch() ? false : <p className="text-sm font-medium text-red-500">Passwords must match</p>}

                    <button type="submit" className="btn btn-primary w-100 mb-3" style={{ color: 'white' }}>Sign up</button>
                    <p className="text-sm text-gray-500">
                         Have an account? <Link to={'/login'} className="font-weight-bold text-primary">Sign in</Link>
                    </p>
                </form>
              </div>
          </div>
        </div>
      </body>
    )
    
}
export default RegisterPage;