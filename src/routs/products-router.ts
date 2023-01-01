import {Request, Response, Router} from 'express'
import {productsRepository} from "../repositories/products-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddlewares} from "../middlewares/input-validation-middlewares";

export const productsRouter = Router({})
const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 255
}).withMessage('Title length must be from 3 to 255 symbols')

productsRouter.get('/', (req: Request, res: Response) => {
    const fontProducts = productsRepository.findProducts(req.query.title?.toString())

    res.send(fontProducts)
})
productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.findProductById(+req.params.id)

    if (!product) res.send(404)
    res.send(product)
})
productsRouter.post('/',
    titleValidation,
    inputValidationMiddlewares,
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }

        const newProduct = productsRepository.createProduct(req.body.title)

        res.status(201).send(newProduct)
    })
productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddlewares,
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }

        const id = +req.params.id;
        const isUpdated = productsRepository.updateProduct(id, req.body.title)

        if (isUpdated) {
            const product = productsRepository.findProductById(id)
            res.send(product)
        }
        res.send(404)
    })
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)

    if (!isDeleted) res.send(404)
    res.send(204)
})