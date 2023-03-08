import { NextFunction, Request, Response } from "express";


export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
     res.send({
          message: "File uploaded",
          payload: req.body
     })
     console.log("Image uploaded");
     
}