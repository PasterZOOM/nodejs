import {Request, Response, Router} from 'express'
import {productsRepository} from "../repositories/products-repository";

export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    const fontProducts = productsRepository.findProducts(req.query.title?.toString())

    res.send(fontProducts)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.findProductById(+req.params.id)

    if (!product) return res.send(404)
    res.send(product)
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)

    res.status(201).send(newProduct)
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const isUpdated = productsRepository.updateProduct(id, req.body.title)

    if (isUpdated) {
        const product = productsRepository.findProductById(id)
        return res.send(product)
    }
    res.send(404)
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)

    if (!isDeleted) return res.send(404)
    res.send(204)
})