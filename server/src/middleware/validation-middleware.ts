import { NextFunction, Request ,Response} from 'express'
import {body, ValidationChain, validationResult} from 'express-validator'

//validations is an array of rules created using express validation. Each Validatiion 
// rule is an object that has a "run" method which performs the validation check
//
// .map(validation => validation.run(req)):

// ".map" is an array method that applies a function to each element in the array and returns a new array containing the results.
// validation => validation.run(req) is the function being applied to each element of the validations array.
// For each validation rule, the run method is called with the req object (the incoming request object in an Express route).
// This initiates the validation check for that specific rule.

// Promise.all is a function that takes an array of promises and returns a single promise that resolves when all the promises in the array have resolved.
// It ensures that all the validation checks are completed before moving on to the next step in the code.


export const validate = (validations: ValidationChain[])=>{
   return async (req:Request, res:Response, next:NextFunction)=>{
    await Promise.all(validations.map(validation => validation.run(req)))
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    return res.status(422).json({errors: errors.array()})
   }
}

//login validator
export const loginvalidator = [
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password").trim().isLength({min:6}).withMessage("Password must be 6 characters long"),
]

//signup validator
export const signupvalidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password").trim().isLength({min:6}).withMessage("Password must be 6 characters long"),
]