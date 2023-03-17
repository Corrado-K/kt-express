import { Request, Response } from "express";

export const testMiddleware = (req: Request, res: Response) => {
     throw new Error('Oops!');
}

async function asyncError () {
     throw new Error('Async Error')
}

export const asyncMiddlewareTest = async (req: Request, res: Response) => {
     await asyncError()
}