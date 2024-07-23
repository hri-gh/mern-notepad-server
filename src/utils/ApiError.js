class ApiError extends Error {
    constructor(
        status,
        message = "Something went wrong",
        extraDetails,
        errors = [],
        stack = ""

    ) {
        super(message)
        this.status = status
        this.message = message
        this.extraDetails = extraDetails
        this.data = null
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }
