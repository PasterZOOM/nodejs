import {Request, Response, Router} from 'express'
import {productsRepository, ProductType} from "../repositories/products-repository";
import {body} from "express-validator";
import {inputValidationMiddlewares} from "../middlewares/input-validation-middlewares";

export const productsRouter = Router({})
const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 255
}).withMessage('Title length must be from 3 to 255 symbols')

productsRouter.get('/', async (req: Request, res: Response) => {
    const fontProducts: ProductType[] = await productsRepository.findProducts(req.query.title?.toString())

    res.send(fontProducts)
})
productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product: ProductType | undefined = await productsRepository.findProductById(+req.params.id)

    if (!product) res.send(404)
    res.send(product)
})
productsRouter.post('/',
    titleValidation,
    inputValidationMiddlewares,
    async (req: Request, res: Response) => {
        const newProduct: ProductType = await productsRepository.createProduct(req.body.title)

        res.status(201).send(newProduct)
    })
productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddlewares,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const isUpdated: boolean = await productsRepository.updateProduct(id, req.body.title)

        if (isUpdated) {
            const product = productsRepository.findProductById(id)
            res.send(product)
        }
        res.send(404)
    })
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted: boolean = await productsRepository.deleteProduct(+req.params.id)

    if (!isDeleted) res.send(404)
    res.send(204)
})