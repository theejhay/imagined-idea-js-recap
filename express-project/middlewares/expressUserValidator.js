import { body, validationResult} from "express-validator";

const validateUser = [
  body("name")
    .notEmpty().withMessage("Name is Required")
    .isLength({ min : 2}).withMessage("Name must be at least 2 characters"),

  body("age")  
    .exists().withMessage("Age is Required")
    .isInt({ gt: 0}).withMessage("Age must be a positive Integer"),

  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    next();
  }  
]

export { validateUser };
