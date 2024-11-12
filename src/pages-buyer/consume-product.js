import { Sidebar } from '../components/sidebar.js';
import { useNavigate } from 'react-router-dom';
import { LuChevronLeftCircle as LeftChevron } from 'react-icons/lu';

function ConsumeProduct() {
    const navigate = useNavigate();
    return (
        <div className="buy-product">
            <Sidebar />
            <main className="buy-product__container">
                <header>
                    <h1 className="buy-product__header">
                        <button onClick={() => navigate('/available-products')}>
                            <LeftChevron />
                        </button>
                        Produto adquirido:
                    </h1>
                </header>
                <section className="product-content">
                    <div className="product-content__img" />
                    <div className="product-content__header">
                        <h2>Curso Pimegonho 2.0</h2>
                    </div>

                    <div className="product-content__info">
                        <h3>Acessar o Arquivo do Produto:</h3>
                        <div className="product-content__file">Curso-Pimegonho.pdf</div>
                    </div>

                    <div className="product-content__info">
                        <h3>Categorias:</h3>
                        <div className="product-content__categories">
                            {['curso', 'educacao', 'financa'].map((category) => (
                                <div>{category}</div>
                            ))}
                        </div>
                    </div>

                    <div className="product-content__info">
                        <h3>Descricao do produto:</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget
                            purus nec ligula feugiat ultricies. Duis ultricies, purus ac luctus
                            suscipit, nisl nisl molestie nisl, ac luctus nisl molestie nisl.
                            Praesent eget purus nec ligula feugiat ultricies.
                        </p>
                    </div>
                    <div className="product-content__info">
                        <h3>Conteúdo do produto:</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget
                            purus nec ligula feugiat ultricies. Duis ultricies, purus ac luctus
                            suscipit, nisl nisl molestie nisl, ac luctus nisl molestie nisl.
                            Praesent eget purus nec ligula feugiat ultricies.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ConsumeProduct;
