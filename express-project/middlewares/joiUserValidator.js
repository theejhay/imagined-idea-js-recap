import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  age: Joi.number().integer().positive().required().greater(3).less(50).messages({
    "number.integer": "Age must be a positive Integer pls",
    "number.positive": "Age must be a positive numbers pls",
    "number.greater": ""
  }),
  gender: Joi.required().messages({
    "any.required": "Gender is Required please"
  })
});

const validateUser = (req, res, next) => {
  const {error} = registerSchema.validate(req.body, {abortEarly: false});

  if(error){
    return res.status(400).json({
      success: false,
      error: error.details.map( e => e.message )
    })
  }

  next();
}

 export { validateUser };


 // TypeScript 
 // Docker
 // MongoDB