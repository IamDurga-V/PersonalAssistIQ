import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./index.css";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!name || !email || !password) {
            alert("Fill All Details");
            return;
        }

        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                if (result.data === "Already Registered") {
                    alert("Already Registered");
                } else {
                    console.log(result);
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
                alert("Registration failed. Please try again.");
            });
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        autoComplete="off"
                        placeholder='Enter your name...'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    );
}

export default SignUp;
