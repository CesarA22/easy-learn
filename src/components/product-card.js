import './product-card.styles.css';
import { useNavigate } from 'react-router-dom';

export function Product({ product }) {
    const navigate = useNavigate();

    // Função para formatar o preço
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    return (
        <div className="product-card" onClick={() => navigate(product.url)}>
            <div
                className="product-card__img"
                style={{
                    backgroundImage: product.image
                        ? `url(${process.env.REACT_APP_BACKEND_URL}/images/${product.image})`
                        : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="product-card__content">
                <h2>{product.name}</h2>
                <div>
                    <div className="product-card__categories">
                        {product.categories.map((category, index) => (
                            <Category key={index} category={category} />
                        ))}
                    </div>
                    <div className="product-card__details">
                        <p className="product-card__description">{product.description}</p>
                        <div className="product-card__info">
                            <p className="product-card__author">
                                Por: {product.author?.name || 'Autor não disponível'}
                            </p>
                            <p className="product-card__price">{formatPrice(product.price)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Category({ category }) {
    return <div className="product-card__category-item">{category}</div>;
}
