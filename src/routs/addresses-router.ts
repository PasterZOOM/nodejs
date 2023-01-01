import {Request, Response, Router} from 'express'

export const addressesRouter = Router({})

const addresses = [{id: 1, title: 'bla'}, {id: 2, title: 'bla-bla'}]

addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addresses.find(el => el.id === +req.params.id)
    if (!address) return res.send(404)
    return res.send(address)
})
