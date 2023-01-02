export type ProductType = {
    id: number;
    title: string;
}

let products: ProductType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    async findProducts(searchTerm: string | null | undefined): Promise<ProductType[]> {
        if (!searchTerm) return products

        return products.filter(product => product.title.match(searchTerm))
    },
    async findProductById(id: number): Promise<ProductType | undefined> {
        return products.find(el => el.id === id)
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {id: +(new Date()), title}
        products.push(newProduct)

        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        const product = products.find(el => el.id === id)

        if (product) {
            product.title = title
            return true
        }
        return false
    },
    async deleteProduct(id: number): Promise<boolean> {
        const arrayLength = products.length
        products = products.filter(p => p.id !== id)

        return arrayLength !== products.length;
    }
}