import './product-card.styles.css';
import { useNavigate } from 'react-router-dom';

export function Product({ product }) {
    const navigate = useNavigate();
    return (
        <div className="product-card" onClick={() => navigate(product.url)}>
            <div className="product-card__img" />
            <div className="product-card__content">
                <h2>{product.name}</h2>
                <div>
                    <div className="product-card__categories">
                        {product.categories.map((category) => (
                            <Category category={category} />
                        ))}
                    </div>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export function Category({ category }) {
    return <div className="product-card__category-item">{category}</div>;
}
