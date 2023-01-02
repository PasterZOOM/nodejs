import {Request, Response, Router} from 'express'
import {addressesRepository} from "../repositories/addresses-repository";

export const addressesRouter = Router({})

addressesRouter.get('/:id', async (req: Request, res: Response) => {
    const address = await addressesRepository.findAddressesById(+req.params.id)
    if (!address) return res.send(404)
    return res.send(address)
})
