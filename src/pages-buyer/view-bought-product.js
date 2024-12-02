import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download } from 'lucide-react';
import { Sidebar } from '../components/sidebar.js';
import { SlidingCart } from '../components/sliding-cart.js';
import '../styles-buyer/view-bought-product.css';

function ViewBoughtProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error('Produto não encontrado');
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message || 'Erro ao carregar o produto');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDownload = async (fileUrl) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${fileUrl}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Erro ao baixar arquivo');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileUrl.split('/').pop(); // Get filename from URL
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Erro ao baixar:', error);
            alert('Erro ao baixar o arquivo. Tente novamente.');
        }
    };

    if (loading) {
        return (
            <div className="view-bought-product">
                <Sidebar />
                <SlidingCart />
                <main className="view-bought-product__container">
                    <div className="loading-message">Carregando produto...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="view-bought-product">
                <Sidebar />
                <SlidingCart />
                <main className="view-bought-product__container">
                    <div className="error-message">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="view-bought-product">
            <Sidebar />
            <SlidingCart />
            <main className="view-bought-product__container">
                <header className="product-header">
                    <button onClick={() => navigate('/bought-products')} className="back-button">
                        <ChevronLeft size={24} />
                        Voltar
                    </button>
                </header>

                <div className="product-cover">
                    {product?.image && (
                        <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.image}`}
                            alt={product.title}
                        />
                    )}
                </div>

                <div className="product-content">
                    <h1>{product?.title}</h1>
                    <div className="product-meta">
                        <span className="product-category">{product?.category?.name}</span>
                        <span className="product-author">Por: {product?.author?.name}</span>
                    </div>

                    <div className="product-description">
                        <h2>Descrição</h2>
                        <p>{product?.description}</p>
                    </div>

                    <div className="product-files">
                        <h2>Conteúdo do Curso</h2>
                        {product?.File?.map((file, index) => (
                            <div key={index} className="file-item">
                                {file.filename[0].endsWith('.pdf') ? (
                                    <div className="pdf-viewer">
                                        <iframe
                                            src={`${process.env.REACT_APP_BACKEND_URL}${file.path[0]}`}
                                            title="PDF Viewer"
                                            width="100%"
                                            height="600px"
                                        />
                                    </div>
                                ) : null}

                                <button
                                    onClick={() => handleDownload(file.path[0])}
                                    className="download-button"
                                >
                                    <Download size={20} />
                                    Baixar {file.filename[0]}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ViewBoughtProduct;
