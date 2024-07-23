import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const testFunction = asyncHandler(async (req, res) => {
    res.send("This is a Test Function");
});

export const testPost = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body


    //if(!email || !password) // If any of the required fields are missing, send an error response


    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required", "Missing or Empty Filed")
        // throw new ApiError(
        //     next({status:400, message:"All fields are required", extraDetails:"Missing filed"})
        // )
    }

    const newUser = {
        email,
        password,
    }

    return res.status(201).json(
        new ApiResponse(200, newUser, "User registered successfully")
    )

});
