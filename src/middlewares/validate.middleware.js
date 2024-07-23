
export const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        // console.log(parseBody)
        next();
    } catch (err) {
        // console.log(error)
        const status = 422
        // const  message = 'Validation failed'
        // const  message = error.message || "Invalid data"
        // const extraDetails = 'Validation failed'
        // const message = 'Fiil the inputs properly'

        //const message =  error.errors[0].message //  show only one error per field
        // const message =  error.issues[0].message

        // const messages =  error.errors.map((zodError) => zodError.message) //  this will give all errors in an array (use this 'messages' or use the below one) (Use any of these two)
        // const message = error.issues.map((issue) => issue.message)
        // console.log("VALIDATION ERROR::", message)
        // return res.status(400).json({ message: messages })

        const message = err.errors[0].message
        const extraDetails = "Fill the input properly";

        const error = {
            status,
            message,
            extraDetails
        }

        next(error)


    }
}

