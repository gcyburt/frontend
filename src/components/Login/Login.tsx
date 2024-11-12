import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useTranslation } from 'react-i18next';

interface LoginProps {
    onLogin: (newUsername: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
        const endpoint = isRegistering ? `${apiUrl}/register` : `${apiUrl}/login`;
        const body = isRegistering 
            ? { username, password, email, name, surname, accessRole: 'office' } 
            : { username, password };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            onLogin(username);
            // Redirect to the dashboard on successful login
            navigate('/dashboard');
        } else {
            // Handle errors
            console.error('Error:', await response.json());
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>{isRegistering ? t('register') : t('login')}</h2>
                {isRegistering && (
                    <>
                        <div className="form-group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="login-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder="Surname"
                                className="login-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="login-input"
                            />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="login-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login-input"
                    />
                </div>
                <button type="submit" className="login-button">
                    {isRegistering ? t('register') : t('login')}
                </button>
                <button
                    type="button"
                    className="toggle-button"
                    onClick={() => setIsRegistering(!isRegistering)}
                >
                    {isRegistering ? t('alreadyHaveAccount') : t('needAccount')}
                </button>
            </form>
        </div>
    );
};

export default Login;