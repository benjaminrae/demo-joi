# Demo Joi (Express-Validation)

```ts
// src/server/schemas/loginUserSchema
import { Joi } from "express-validation";

const loginUserSchema = {
  body: Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().required(),
  }),
};

export default loginUserSchema;

// src/server/routers/usersRouter
usersRouter.post(
  loginRoute,
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);
```
