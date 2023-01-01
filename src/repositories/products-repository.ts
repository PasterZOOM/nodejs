let products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    findProducts(searchTerm: string | null | undefined) {
        if (!searchTerm) return products

        return products.filter(product => product.title.match(searchTerm))
    },
    findProductById(id: number) {
        return products.find(el => el.id === id)
    },
    createProduct(title: string) {
        const newProduct = {id: +(new Date()), title}
        products.push(newProduct)

        return newProduct
    },
    updateProduct(id: number, title: string) {
        const product = products.find(el => el.id === id)

        if (product) {
            product.title = title
            return true
        }
        return false
    },
    deleteProduct(id: number) {
        const arrayLength = products.length
        products = products.filter(p => p.id !== id)

        return arrayLength !== products.length;
    }
}