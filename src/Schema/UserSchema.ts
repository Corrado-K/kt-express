

export const UserSchema = {
     name: {
          in: ['body'],
          isString: true,
          notEmpty: true
     },
     age: {
          in: ['body'],
          isInt: true,
          toInt: true,
          notEmpty: true
     }
}