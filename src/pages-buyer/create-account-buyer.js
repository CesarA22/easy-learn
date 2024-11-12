import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-buyer/create-account-buyer.css';

function CreateAccountBuyer() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name' || name === 'email') {
            setFormData((prev) => ({
                ...prev,
                [name]: value.toLowerCase(),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validatePassword = () => {
        const conditions = [
            { text: 'Pelo menos 8 caracteres', valid: formData.password.length >= 8 },
            {
                text: 'Pelo menos 1 caractere especial',
                valid: /[!@#$%^&*]/.test(formData.password),
            },
            { text: 'Pelo menos 1 número', valid: /\d/.test(formData.password) },
            { text: 'Pelo menos 1 letra minúscula', valid: /[a-z]/.test(formData.password) },
            { text: 'Pelo menos 1 letra maiúscula', valid: /[A-Z]/.test(formData.password) },
            {
                text: 'As senhas digitadas conferem',
                valid: formData.password === formData.confirmPassword,
            },
        ];

        return conditions;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const conditions = validatePassword();
        const valid = conditions.every((condition) => condition.valid);

        if (!valid) {
            setError('Por favor, verifique os requisitos da senha.');
            setLoading(false);
            return;
        }

        const formattedCPF = formData.cpf.replace(/\D/g, '');

        const formattedPhone = formData.phone.replace(/\D/g, '');

        const dataToSend = {
            name: formData.name.toLowerCase(),
            email: formData.email.toLowerCase(),
            cpf: formattedCPF,
            phone: formattedPhone,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        };

        try {
            console.log('Sending data:', dataToSend);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/buyer/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                navigate('/user-screen-buyer');
            } else {
                throw new Error(data.error || data.invalidField || 'Erro ao criar conta.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Erro ao criar conta. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const passwordConditions = validatePassword();

    return (
        <div className="create-account-comprador-container">
            <div className="create-account-comprador-box">
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
                        minLength={2}
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
                        placeholder="Seu CPF (apenas números)"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        required
                        maxLength={14}
                        minLength={10}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Seu telefone (apenas números)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        minLength={11}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Sua senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Repita sua senha"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                    />
                    <div className="password-conditions">
                        {passwordConditions.map((condition, index) => (
                            <p key={index} className={condition.valid ? 'valid' : 'invalid'}>
                                {condition.valid ? '✔️' : '❌'} {condition.text}
                            </p>
                        ))}
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Criando conta...' : 'Criar conta grátis'}
                    </button>
                </form>
                <div className="login-comprador-link">
                    <p>
                        Já tem uma conta?{' '}
                        <span onClick={() => navigate('/login-buyer')}>Faça login</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountBuyer;
