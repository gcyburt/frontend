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
        const endpoint = isRegistering ? `${apiUrl}/user/register` : `${apiUrl}/user/login`;
        const body = isRegistering 
            ? { username, password, email, name, surname, accessRole: 'office' } 
            : { username, password };

        console.log(isRegistering ? '📝 Registering user:' : '🔑 Logging in user:', username);

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            console.log('✅ Login/Register successful for user:', username);
            onLogin(username);
            navigate('/dashboard');
        } else {
            const error = await response.json();
            console.error('❌ Error during login/register:', error);
            alert(t('error'));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit(event as unknown as React.FormEvent);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form" onKeyDown={handleKeyDown}>
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