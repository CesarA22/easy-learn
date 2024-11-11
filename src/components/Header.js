import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
    const { user, userType, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getNavigationItems = () => {
        if (userType === 'buyer') {
            return [
                { label: 'Available Products', path: '/available-products' },
                { label: 'My Purchases', path: '/bought-products' },
                { label: 'Profile', path: '/user-screen-buyer' }
            ];
        } else if (userType === 'seller') {
            return [
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'My Products', path: '/products' },
                { label: 'Profile', path: '/user-screen-seller' }
            ];
        }
        return [];
    };

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div 
                            className="font-bold text-xl cursor-pointer" 
                            onClick={() => navigate('/')}
                        >
                            Easy Learn
                        </div>
                        
                        {user && (
                            <nav className="ml-8">
                                <ul className="flex space-x-4">
                                    {getNavigationItems().map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => navigate(item.path)}
                                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm"
                                            >
                                                {item.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>

                    {user && (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-300">
                                Welcome, {user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}