import {productsCollection, ProductType} from "./db";

export const productsRepository = {
    async findProducts(searchTerm: string | null | undefined): Promise<ProductType[]> {
        const filter: any = {}

        if (searchTerm) filter.title = {$regex: searchTerm, $options: 'i'}

        return productsCollection.find(filter).toArray()
    },
    async findProductById(id: number): Promise<ProductType | null> {
        return await productsCollection.findOne({id})
    },
    async createProduct(newProduct: ProductType): Promise<ProductType> {
        await productsCollection.insertOne(newProduct)

        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id}, {$set: {title}})

        return result.matchedCount === 1
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id})

        return result.deletedCount === 1
    }
}