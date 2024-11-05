import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import '../styles-seller/create-product.css';

const CreateProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/products/add', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/products');
            } else {
                console.error('Failed to add product:', data.error);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="product-form-container">
            <aside className="sidebar">
                <div className="logo">Easy Learn</div>
                <nav className="menu">
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                        <li>Vendas</li>
                        <li onClick={() => navigate('/products')}>Produtos</li>
                        <li>Finanças</li>
                    </ul>
                </nav>
                <div className="settings">
                    <p>Configurações</p>
                    <p onClick={() => navigate('/user-screen-seller')}>
                        {user ? user.name : 'Nome do perfil'}
                    </p>
                </div>
            </aside>
            <main className="create-product__main-content">
                <header>
                    <h1>Cadastrar Produto</h1>
                </header>

                <form onSubmit={handleSubmit} className="product-form__wrapper">
                    <div className="product-form dashboard__main-content__col--1">
                        <div className="product-details">
                            <div className="form-group">
                                <label htmlFor="productTitle">Título do produto:</label>
                                <input
                                    type="text"
                                    id="productTitle"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Adicione um título"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productCategory">Categoria do produto:</label>
                                <input
                                    type="text"
                                    id="productCategory"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Adicione uma categoria"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDescription">Descrição do produto:</label>
                                <textarea
                                    id="productDescription"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Adicione uma descrição para o produto"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productPrice">Preço do produto:</label>
                                <input
                                    type="number"
                                    id="productPrice"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Adicione um preço para o produto"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard__main-content__col--2">
                        <div className="product-upload">
                            <p>Seu produto:</p>
                            <div className="upload-box">
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="upload-input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="product-content form-group">
                        <p>Conteúdo do produto:</p>
                        <textarea
                            placeholder="Adicione o conteúdo do produto"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="edit-button">
                        Cadastrar Produto
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateProduct;
