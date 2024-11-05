import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import '../styles-seller/product-details.css';

function ProductDetails() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/item/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setProduct(data);
                    setTitle(data.title);
                    setPrice(data.price);
                    setDescription(data.description);
                    setContent(data.content);
                    setCategory(data.category);
                } else {
                    console.error('Erro ao buscar detalhes do produto:', data.error);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes do produto:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/products/item/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    content,
                    category,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
                setIsEditing(false);
            } else {
                console.error('Erro ao salvar as alterações do produto');
            }
        } catch (error) {
            console.error('Erro ao salvar as alterações do produto:', error);
        }
    };

    if (!product) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="product-details-container">
            <aside className="sidebar">
                <div className="logo" onClick={() => navigate('/login-seller')}>
                    Easy Learn
                </div>
                <nav className="menu">
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                        <li onClick={() => navigate('/products')}>Produtos</li>
                        <li>Vendas</li>
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
            <main className="main-content">
                <header>
                    <h1>{isEditing ? 'Editar Produto' : product.title}</h1>
                    {isEditing ? (
                        <button onClick={handleSave} className="edit-button">
                            Salvar
                        </button>
                    ) : (
                        <button onClick={handleEdit} className="edit-button">
                            Editar
                        </button>
                    )}
                </header>
                <section className="product-details">
                    {isEditing ? (
                        <div className="edit-product-form">
                            <label>
                                Título:
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                Preço:
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </label>
                            <label>
                                Descrição:
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                            <label>
                                Conteúdo:
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </label>
                            <label>
                                Categoria:
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </label>
                        </div>
                    ) : (
                        <>
                            <div className="product-images">
                                {product.images && product.images.length > 0 ? (
                                    product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:3000${image}`}
                                            alt={`Imagem ${index + 1}`}
                                        />
                                    ))
                                ) : (
                                    <p>Sem imagens disponíveis</p>
                                )}
                            </div>
                            <div className="product-info">
                                <p>
                                    <strong>Autor:</strong> {product.author}
                                </p>
                                <p>
                                    <strong>Categoria:</strong> {product.category}
                                </p>
                                <p>
                                    <strong>Descrição:</strong> {product.description}
                                </p>
                                <p>
                                    <strong>Conteúdo:</strong> {product.content}
                                </p>
                                <p>
                                    <strong>Preço:</strong> R$ {product.price}
                                </p>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}

export default ProductDetails;
