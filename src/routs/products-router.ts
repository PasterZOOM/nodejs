import {Request, Response, Router} from 'express'
import {body} from "express-validator";
import {inputValidationMiddlewares} from "../middlewares/input-validation-middlewares";
import {ProductType} from "../repositories/db";
import {productsService} from '../domain/products-service'

export const productsRouter = Router({})
const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 255
}).withMessage('Title length must be from 3 to 255 symbols')

productsRouter.get('/', async (req: Request, res: Response) => {
    const fontProducts: ProductType[] = await productsService.findProducts(req.query.title?.toString())

    res.send(fontProducts)
})
productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product: ProductType | null = await productsService.findProductById(+req.params.id)

    if (!product) res.send(404)
    res.send(product)
})
productsRouter.post('/',
    titleValidation,
    inputValidationMiddlewares,
    async (req: Request, res: Response) => {
        const newProduct: ProductType = await productsService.createProduct(req.body.title)

        return res.status(201).send(newProduct)
    })
productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddlewares,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const isUpdated: boolean = await productsService.updateProduct(id, req.body.title)
        if (isUpdated) {
            const product = await productsService.findProductById(id)

            return res.send(product)
        }

        return res.send(404)
    })
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted: boolean = await productsService.deleteProduct(+req.params.id)

    if (!isDeleted) return res.send(404)

    return res.send(204)
})