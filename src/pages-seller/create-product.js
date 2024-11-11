import React, { useContext, useState, useEffect } from 'react';
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
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                const uniqueCategories = [...new Set(data.products.map(product => 
                    product.category.name.toLowerCase()
                ))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

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

        if (!thumbnail) {
            setError('Por favor, selecione uma imagem para a thumbnail.');
            setLoading(false);
            return;
        }

        if (!productFile) {
            setError('Por favor, selecione um arquivo PDF para o conteúdo do produto.');
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();

        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        formDataToSend.append('image', thumbnail, thumbnail.name);
        formDataToSend.append('pdf', productFile, productFile.name);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao cadastrar produto');
            }

            setSuccess('Produto cadastrado com sucesso!');
            
            // Limpar formulário
            setFormData({
                title: '',
                category: '',
                description: '',
                price: '',
                content: ''
            });
            setThumbnail(null);
            setProductFile(null);

            // Timer para redirecionar após mostrar a mensagem de sucesso
            setTimeout(() => {
                navigate('/products');
            }, 2000);
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
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
                                    placeholder="Adicione um título"
                                    required
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
                                    list="categories"
                                    placeholder="Adicione uma categoria"
                                    required
                                />
                                <datalist id="categories">
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDescription">Descrição do produto:</label>
                                <textarea
                                    id="productDescription"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Adicione uma descrição para o produto"
                                    required
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
                                    placeholder="Adicione um preço para o produto"
                                    required
                                />
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
                            placeholder="Descreva o conteúdo do produto"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
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