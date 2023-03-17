import { Request, Response, Router } from "express";

const router = Router()

router.get('/:number', (req: Request, res: Response) => {

     if(isNaN(Number(req.params.number))){
          return res.status(400).json({
               error: "Param not a number"
          })
     }

     const numberSquare: number = Math.pow(Number(req.params.number),2)
     res.json({
          message: "Success",
          payload: {
               number: Number(req.params.number),
               numberSquare: numberSquare
          }
     });

})

export default router