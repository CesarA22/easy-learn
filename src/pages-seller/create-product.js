import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles-seller/create-product.css';

const CreateProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        content: ''
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [productFile, setProductFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setThumbnail(file);
                setError('');
            } else {
                setError('Por favor, selecione apenas arquivos de imagem para a thumbnail.');
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                setProductFile(file);
                setError('');
            } else {
                setError('Por favor, selecione apenas arquivos PDF para o conteúdo do produto.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!formData.title || !formData.category || !formData.description || !formData.price || !formData.content) {
            setError('Por favor, preencha todos os campos obrigatórios');
            setLoading(false);
            return;
        }

        if (!thumbnail) {
            setError('Por favor, selecione uma imagem para o produto');
            setLoading(false);
            return;
        }

        if (!productFile) {
            setError('Por favor, selecione um arquivo PDF para o produto');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const formDataToSend = new FormData();

            formDataToSend.append('title', formData.title.trim());
            formDataToSend.append('category', formData.category.trim());
            formDataToSend.append('description', formData.description.trim());
            formDataToSend.append('price', formData.price);
            formDataToSend.append('content', formData.content.trim());
            formDataToSend.append('image', thumbnail);
            formDataToSend.append('pdf', productFile);

            console.log('Dados sendo enviados:', {
                title: formData.title.trim(),
                category: formData.category.trim(),
                description: formData.description.trim(),
                price: formData.price,
                content: formData.content.trim(),
                image: thumbnail.name,
                pdf: productFile.name
            });

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            const responseData = await response.json();
            console.log('Resposta do servidor:', responseData);

            if (!response.ok) {
                throw new Error(responseData.error || 'Erro ao cadastrar produto');
            }

            setSuccess('Produto cadastrado com sucesso!');
            
            setFormData({
                title: '',
                category: '',
                description: '',
                price: '',
                content: ''
            });
            setThumbnail(null);
            setProductFile(null);

            setTimeout(() => {
                navigate('/products');
            }, 2000);

        } catch (error) {
            console.error('Erro detalhado:', error);
            setError(error.message || 'Erro ao cadastrar produto. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form-container">
            <aside className="sidebar">
                <div className="logo">Easy Learn</div>
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
            <main className="create-product__main-content">
                <header>
                    <h1>Cadastrar Produto</h1>
                </header>

                {error && (
                    <div className="message error-message">
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="message success-message">
                        <p>{success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="product-form__wrapper">
                    <div className="product-form dashboard__main-content__col--1">
                        <div className="product-details">
                            <div className="form-group">
                                <label htmlFor="productTitle">Título do produto:</label>
                                <input
                                    type="text"
                                    id="productTitle"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Mínimo 5 caracteres"
                                    required
                                    minLength={5}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productCategory">Categoria do produto:</label>
                                <input
                                    type="text"
                                    id="productCategory"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    placeholder="Digite a categoria do produto"
                                    required
                                />
                                <small className="helper-text">
                                    Digite qualquer categoria para seu produto
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDescription">Descrição do produto:</label>
                                <textarea
                                    id="productDescription"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Descreva seu produto detalhadamente"
                                    required
                                    minLength={10}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productPrice">Preço do produto:</label>
                                <input
                                    type="text"
                                    id="productPrice"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="Digite apenas números"
                                    required
                                />
                                <small className="helper-text">
                                    Digite apenas números, sem pontos ou vírgulas
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard__main-content__col--2">
                        <div className="product-upload">
                            <p>Imagem do produto (thumbnail):</p>
                            <div className="upload-box">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                    className="upload-input"
                                    required
                                />
                                {thumbnail && (
                                    <div className="preview">
                                        <img 
                                            src={URL.createObjectURL(thumbnail)} 
                                            alt="Preview" 
                                            style={{ maxWidth: '200px' }} 
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="product-upload">
                            <p>Arquivo do produto (PDF):</p>
                            <div className="upload-box">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="upload-input"
                                    required
                                />
                                {productFile && (
                                    <div className="file-info">
                                        Arquivo selecionado: {productFile.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="product-content form-group">
                        <p>Conteúdo do produto:</p>
                        <textarea
                            name="content"
                            placeholder="Descreva o conteúdo do seu produto"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            minLength={10}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="edit-button" 
                        disabled={loading}
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateProduct;