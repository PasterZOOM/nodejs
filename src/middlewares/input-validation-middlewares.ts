import {Request, Response} from 'express'
import {NextFunction} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddlewares = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    next()
}