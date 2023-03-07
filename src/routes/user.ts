import { randomInt } from "crypto"
import { Request, Response, Router, NextFunction } from 'express';
import { body, validationResult } from 'express-validator'

const router = Router()

interface IUser {
     id: number,
     name: string,
     age: number
}

let users: IUser[] = [
     {
          id: 1,
          name: "Kebede",
          age: 12
     },
     {
          id: 2,
          name: "Jay",
          age: 10
     },
     {
          id: 3,
          name: "Bean",
          age: 10
     },
     {
          id: 4,
          name: "Poyle",
          age: 10
     },
     {
          id: 5,
          name: "Adonis",
          age: 10
     },
]

// router.get('/', (req: Request, res: Response) => {
//      res.json({
//           message: `User: ${JSON.stringify(req.query)}`,
//           status: 200,
//           payload: users
//      })
// })

router.get('/all', (req: Request, res: Response) => {
     res.json({
          message: `All users`,
          status: 200,
          payload: users
     })
})

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {

     
     const user: IUser | undefined = users.find((i:IUser) => i.id === Number(req.params.id))

     if (!user) {
          // return res.status(404).json({
          //      errors: [{ message: `User ${req.params.id} was not found` }],
          // })

          return next(new Error(`User with ID ${req.params.id} not found`));
     }

     res.json({
          message: `User ${req.params.id} found`,
          status: 200,
          payload: user
     })
})

router.post('/',  

// (req: Request, res: Response) => {

     body('name').isString(),
     body('age').isInt(),
     (req: Request, res: Response) => {

     const error = validationResult(req)
     if (!error.isEmpty()) {
          return res.status(422).json({
               errors: error.array()
          })          
     }

     // const user: IUser = req.body
     const { name, age } = req.body

     const user: IUser = {
          id: randomInt(10, 100),
          name: name,
          age: age
     }

     users.push(user)
     res.json({
          message: `User created`,
          status: 200,
          payload: users
     })

     // const { name, age } = req.body

     // // const user: IUser = {
     // //      id: randomInt(100),
     // //      name: name,
     // //      age: age
     // // }

})


router.put('/:id', (req: Request, res: Response) => {

     const user: IUser | undefined = users.find((i:IUser) => i.id === Number(req.params.id))

     if (!user) {
          return res.status(404).json({
               errors: [{ message: `User ${req.params.id} was not found` }],
          })
     }

     const { name, age } = req.body
     user.name = name
     user.age = age

     res.json({
          message: `User ${req.params.id} updated`,
          status: 200,
          payload: user
     })

})

router.delete('/:id', (req: Request, res:Response) => {

     const user: IUser | undefined = users.find((i) => i.id === Number(req.params.id))

     if (!user) {
          return res.status(404).json({
               errors: [{ message: `User ${req.params.id} was not found` }],
          })
     }

     const newUsersList:IUser[] = users.filter((i) => i !== user)

     res.send({
          message: `User deleted`,
          status: 200,
          payload: newUsersList
     })
     
     
})

export default router