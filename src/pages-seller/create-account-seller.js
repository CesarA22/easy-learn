import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-seller/create-account-seller.css';

function CreateAccountSeller() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePassword = () => {
        const conditions = [
            { text: 'Pelo menos 8 caracteres', valid: formData.password.length >= 8 },
            { text: 'Pelo menos 1 caractere especial', valid: /[!@#$%^&*]/.test(formData.password) },
            { text: 'Pelo menos 1 número', valid: /\d/.test(formData.password) },
            { text: 'Pelo menos 1 letra minúscula', valid: /[a-z]/.test(formData.password) },
            { text: 'Pelo menos 1 letra maiúscula', valid: /[A-Z]/.test(formData.password) },
            { text: 'As senhas digitadas conferem', valid: formData.password === formData.confirmPassword },
        ];

        return conditions;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar senha
        const conditions = validatePassword();
        const valid = conditions.every((condition) => condition.valid);

        if (!valid) {
            setError('Por favor, verifique os requisitos da senha.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/seller/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/user-screen-seller');
            } else {
                setError(data.error || 'Erro ao criar conta.');
            }
        } catch (err) {
            setError('Erro ao criar conta. Por favor, tente novamente.');
            console.error('Registration error:', err);
        }
    };

    const passwordConditions = validatePassword();

    return (
        <div className="create-account-container">
            <div className="create-account-box">
                <h1>Criar conta</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Seu e-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="cpf"
                        placeholder="Seu CPF"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Seu telefone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Sua senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Repita sua senha"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="password-conditions">
                        {passwordConditions.map((condition, index) => (
                            <p key={index} className={condition.valid ? 'valid' : 'invalid'}>
                                {condition.valid ? '✔️' : '❌'} {condition.text}
                            </p>
                        ))}
                    </div>
                    <button type="submit">Criar conta grátis</button>
                </form>
                <div className="login-link">
                    <p>
                        Já tem uma conta? <span onClick={() => navigate('/login-seller')}>Faça login</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountSeller;