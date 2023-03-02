import { randomInt } from "crypto"
import { Request, Response, Router } from "express"

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

router.get('/:id', (req: Request, res: Response) => {

     const user: IUser | undefined = users.find((i:IUser) => i.id === Number(req.params.id))

     if (!user) {
          return res.status(404).json({
               errors: [{ message: `User ${req.params.id} was not found` }],
          })
     }

     res.json({
          message: `User ${req.params.id} found`,
          status: 200,
          payload: user
     })
})

router.post('/', (req: Request, res: Response) => {
     
     const { name, age } = req.body

     const user: IUser = {
          id: randomInt(100),
          name: name,
          age: age
     }

     users.push(user)
     
     res.json({
          message: `User created`,
          status: 200,
          payload: users
     })

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

router. delete('/:id', (req: Request, res:Response) => {

     const user: IUser | undefined = users.find((i) => i.id === Number(req.params.id))

     if (!user) {
          return res.status(404).json({
               errors: [{ message: `User ${req.params.id} was not found` }],
          })
     }

     users.filter(i => i !== user)
     
     
})

export default router