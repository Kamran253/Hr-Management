// src/Pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Make sure your styles are correctly set up

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    // Handle login form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", {
                email: loginEmail,
                password: loginPassword,
            });
            if (response.data.success) {
                localStorage.setItem('isAuthenticated', 'true'); // Save authentication status
                alert("Login successful!");
                window.location.href = "/Home"; // Redirect to home page
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed!");
        }
    };

    // Handle signup form submission
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signup", {
                email: signupEmail,
                password: signupPassword,
            });
            if (response.data.success) {
                alert("Signup successful! You can now login.");
                setIsLogin(true); // Automatically switch to login after successful signup
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed!");
        }
    };

    // Toggle between login and signup
    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-container">
            <div className="form-container">
                {isLogin ? (
                    <>
                        <h2>Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="input-box">
                                <input
                                    type="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <button type="submit" className="button1">Login</button>
                        </form>
                        <p>
                            Don't have an account?{' '}
                            <span onClick={toggleAuthMode} className="toggle-link">
                                Signup here
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Signup</h2>
                        <form onSubmit={handleSignupSubmit}>
                            <div className="input-box">
                                <input
                                    type="email"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    required
                                />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <button type="submit" className="button1">Signup</button>
                        </form>
                        <p>
                            Already have an account?{' '}
                            <span onClick={toggleAuthMode} className="toggle-link">
                                Login here
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
