import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routs/products-router";
import {addressesRouter} from "./routs/addresses-router";
import {runDb} from "./repositories/db";

const app = express()
const port = process.env.PORT || 5000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next()
    } else {
        res.send(401)
    }
}

app.use(authGuardMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on http://localhost:${port}`)
    })
}

startApp()