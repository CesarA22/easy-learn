import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-seller/products.css';
import { AuthContext } from '../context/AuthContext';

const EditModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        content: product.content || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const updatedData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                content: formData.content.trim(),
                price: parseInt(formData.price),
            };

            console.log('Enviando dados:', {
                id: product.id,
                data: updatedData,
            });

            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/products/${product.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                },
            );

            const responseData = await response.json();
            console.log('Resposta:', responseData);

            if (!response.ok) {
                throw new Error(responseData.error || 'Falha ao atualizar produto');
            }

            onSave(responseData);
            onClose();
        } catch (err) {
            console.error('Erro ao atualizar:', err);
            setError(err.message || 'Erro ao atualizar produto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Editar Produto</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                {error && <div className="modal-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Título:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descrição:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Preço:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    }))
                                }
                                required
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Conteúdo:</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        content: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="save-button" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ProductCard = ({ product, onEdit }) => {
<<<<<<< HEAD
    const [imageError, setImageError] = useState(false);
    
    const getImageUrl = (imageName) => {
        if (!imageName) return null;
        // Alterando o caminho para acessar diretamente a pasta public
        return `${process.env.REACT_APP_BACKEND_URL}/public/files/${imageName}`;
    };

    const handleImageError = () => {
        setImageError(true);
        console.error('Erro ao carregar imagem:', product.image);
    };
=======
    const imageUrl = product.image
        ? `${process.env.REACT_APP_BACKEND_URL}/public/images/${product.image}`
        : null;
>>>>>>> 504ba36b910c9a43cd9f70786180bb58971dc285

    return (
        <div className="product-card">
            <div className="product-image">
                {!imageError && product.image ? (
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.title}
                        onError={handleImageError}
                        className="product-thumbnail"
                    />
                ) : (
                    <div className="placeholder-image">
                        <span>Imagem não disponível</span>
                    </div>
                )}
            </div>
            <div className="product-info">
                <h3>{product.title}</h3>
<<<<<<< HEAD
=======
                {product.category && (
                    <span className="product-category">{product.category.name}</span>
                )}
>>>>>>> 504ba36b910c9a43cd9f70786180bb58971dc285
                <p className="product-description">
                    {product.description && product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                </p>
                <div className="product-price">
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(product.price)}
                </div>
                <div className="product-actions">
<<<<<<< HEAD
                    <button 
                        className="edit-button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEdit(product);
                        }}
                    >
=======
                    {/* Botão de ver detalhes comentado para implementação futura
                    <button 
                        className="view-button"
                        onClick={() => onView(product.id)}
                    >
                        Ver Detalhes
                    </button>
                    */}
                    <button className="edit-button" onClick={() => onEdit(product)}>
>>>>>>> 504ba36b910c9a43cd9f70786180bb58971dc285
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

function Products() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login-seller');
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/seller/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Falha ao buscar produtos');

            const data = await response.json();
            if (data.result?.Products) {
                setProducts(data.result.Products);
            }
        } catch (err) {
            setError('Erro ao carregar produtos');
            console.error('Erro:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [navigate]);

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleSaveEdit = async (updatedProduct) => {
        try {
            // Atualizar o produto na lista local
            setProducts((currentProducts) =>
                currentProducts.map((prod) =>
                    prod.id === updatedProduct.id ? updatedProduct : prod,
                ),
            );

            // Fechar o modal
            setEditingProduct(null);

            // Recarregar a lista de produtos para garantir sincronização
            await fetchProducts();
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    if (loading) {
        return (
            <div className="products-container">
                <div className="loading-wrapper">
                    <div className="loading-spinner" />
                </div>
            </div>
        );
    }

    return (
        <div className="products-container">
            <aside className="sidebar">
                <div className="logo">Easy Learn</div>
                <nav className="menu">
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                        <li className="active">Produtos</li>
                        <li>Vendas</li>
                        <li>Finanças</li>
                    </ul>
                </nav>
                <div className="settings">
                    <p>Configurações</p>
                    <p onClick={() => navigate('/user-screen-seller')}>
                        {user?.name || 'Nome do perfil'}
                    </p>
                </div>
            </aside>

            <main className="main-content">
                <section className="header-section">
                    <h1>Seus Produtos</h1>
                    <button
                        className="add-product-button"
                        onClick={() => navigate('/create-product')}
                    >
                        Adicionar Novo Produto
                    </button>
                </section>

                {error ? (
                    <div className="error-container">{error}</div>
                ) : (
                    <section className="products-section">
                        {products.length === 0 ? (
                            <div className="no-products">
                                <h2>Nenhum produto cadastrado</h2>
                                <p>Comece adicionando seu primeiro produto</p>
                                <button
                                    onClick={() => navigate('/create-product')}
                                    className="create-first-button"
                                >
                                    Criar Produto
                                </button>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onEdit={handleEditProduct}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </main>

            {editingProduct && (
                <EditModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
}

export default Products;
