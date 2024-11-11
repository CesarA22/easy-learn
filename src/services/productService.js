const productService = {
    async getAvailableProducts() {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            return data.products.map(product => ({
                id: product.id,
                name: product.title,
                categories: [product.category.name],
                description: product.description,
                url: `/consume-product/${product.id}`,
                price: product.price,
                image: product.image,
                content: product.content,
                files: product.File
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    async getBoughtProducts(userId) {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/buyer/orders/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bought products');
            }

            const orders = await response.json();
            
            // Extrair produtos únicos de todas as orders
            const boughtProducts = orders.reduce((acc, order) => {
                const products = order.items.map(item => ({
                    id: item.product.id,
                    name: item.product.title,
                    categories: [item.product.category.name],
                    description: item.product.description,
                    url: `/consume-product/${item.product.id}`,
                    price: item.product.price,
                    image: item.product.image,
                    content: item.product.content,
                    files: item.product.File,
                    purchaseDate: order.createdAt
                }));
                return [...acc, ...products];
            }, []);

            return boughtProducts;
        } catch (error) {
            console.error('Error fetching bought products:', error);
            throw error;
        }
    }
};

export default productService;