import axios from 'axios';

interface Product {
    id?: number;
    name: string;
    price: number;
}

const baseURL = '/api/products';

const productService = {
    getAllProducts: async (): Promise<Product[]> => {
        try {
            const response = await axios.get(
                baseURL,
                {
                    timeout: 3000,
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            return response.data as Product[];
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.code === 'ECONNABORTED') {
                console.log('The request timed out.');
            } else {
                console.log(err);
            }
            return [];
        }
    },
    addProduct: async (product: Product) => {
        const response = await axios.post(baseURL, product);
        return response.data as Product;
    },
    deleteProduct: async (id: number) => {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data;
    },
    updateProduct: async (id: number, product: Product) => {
        const response = await axios.put(`${baseURL}/${id}`, product);
        return response.data as Product;
    }
};
export default productService;