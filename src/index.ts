import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routs/products-router";
import {addressesRouter} from "./routs/addresses-router";

const app = express()
const port = process.env.PORT || 5000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})