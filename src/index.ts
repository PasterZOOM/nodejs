import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 5000

let products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, title: 'bla'}, {id: 2, title: 'bla-bla'}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let regexp = req.query.title.toString()
        res.send(products.filter(product => product.title.match(regexp)))
    } else res.send(products)
})
app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find(el => el.id === +req.params.id)
    if (!product) return res.send(404)
    return res.send(product)
})
app.delete('/products/:id', (req: Request, res: Response) => {
    const arrayLength = products.length
    products = products.filter(p => p.id !== +req.params.id)
    if (arrayLength === products.length) return res.send(404)
    res.send(204)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find(el => el.id === +req.params.id)
    if (!address) return res.send(404)
    return res.send(address)
})
app.post('/products', (req: Request, res: Response) => {
    const newProduct = {id: +(new Date()), title: req.body.title}
    products.push(newProduct)
    res.status(201).send(newProduct)

})
app.put('/products/:id', (req: Request, res: Response) => {
    const product = products.find(el => el.id === +req.params.id)
    if (!product) return res.send(404)
    product.title = req.body.title
    res.send(product)
})
app.listen(port, () => {
    console.log(`
                                                   Example app listening on http://localhost:${port}
    `)
})