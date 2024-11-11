import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null); // 'seller' ou 'buyer'

    // Carregar dados do usuário do localStorage ao iniciar
    useEffect(() => {
        const loadStoredUser = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUserType = localStorage.getItem('userType');
                const storedUserData = localStorage.getItem('userData');

                if (storedToken && storedUserType && storedUserData) {
                    setUser(JSON.parse(storedUserData));
                    setUserType(storedUserType);
                }
            } catch (error) {
                console.error('Error loading stored user:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStoredUser();
    }, []);

    // Verificar token e atualizar dados do usuário
    useEffect(() => {
        const validateAndUpdateUser = async () => {
            const token = localStorage.getItem('token');
            const type = localStorage.getItem('userType');

            if (!token || !type) return;

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${type}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.result);
                    localStorage.setItem('userData', JSON.stringify(data.result));
                } else {
                    // Se o token for inválido, fazer logout
                    handleLogout();
                }
            } catch (error) {
                console.error('Error validating token:', error);
            }
        };

        validateAndUpdateUser();
    }, []);

    const login = async (userData, type) => {
        setUser(userData);
        setUserType(type);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userType', type);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        setUserType(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                userType,
                loading,
                login,
                logout: handleLogout,
                isAuthenticated: !!user,
                isSeller: userType === 'seller',
                isBuyer: userType === 'buyer'
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};