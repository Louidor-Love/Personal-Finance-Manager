import { Link, useNavigate, Navigate } from "react-router-dom";
import { loginRequest } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import logo from '../assets/logo.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuthStore();
    const setToken = useAuthStore((state) => state.setToken);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useMutation({
        mutationFn: () => loginRequest(email, password),
        onSuccess: (response) => {
            setToken(response.data.access, response.data.refresh)
            toast.success("Login exitoso!")
            navigate("/")
        },
        onError: () => {
            toast.error("Hubo un error, intenta devuelta")
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginMutation.mutate()
    }

    if (loginMutation.isLoading) return <p>Loading...</p>
    if (isAuth) return (<Navigate to="/"/>)

    return (
      
      
        <body className="bg-secondary container-fluid d-flex flex-column align-items-center justify-content-center vh-100 vw-100"  >
          <div className="bg-secondary container d-flex flex-column align-items-center justify-content-center py-5 " >

            <Link to="" className="d-flex align-items-center mb-4 text-2xl font-weight-bold text-dark">
                <img className="img-fluid  img-size-24" src={logo} alt="logo"  style={{ width: '64px', height: 'auto' }}/>
            </Link>
            <h1 style={{ color: 'white' }}>Finance Manager</h1>

            <div className="w-100 max-w-md bg-light rounded-lg shadow-sm" style={{ background: '#454d55' }}>
                <div className="p-4" style={{ background: '#454d55' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3" style={{ background: '#454d55' }}>
                            <label htmlFor="email" className="form-label mb-2" style={{ color: 'white' }}>email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" name="email" id="email" className="form-control" placeholder="name@company.com" />
                        </div>
                        <div className="mb-3" style={{ background: '#454d55' }}>
                            <label htmlFor="password" className="form-label mb-2" style={{ color: 'white' }}>Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" name="password" id="password" className="form-control" placeholder="password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3" style={{ color: 'white' }}>Sign in</button>
                        <p className="text-sm text-gray-500">
                            Don't have an account? <Link to="/register" className="font-weight-bold text-primary">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
          </div>
        </body>
    )
}

export default LoginPage;
