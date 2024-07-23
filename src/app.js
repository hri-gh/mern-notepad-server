import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';
import conf from "./conf/conf.js";


const app = express()

app.use(cors({
    origin: conf.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "100kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// Testing Route
app.get('/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Api is working"
    })
})

// Unknown Route
// app.all('*', (req, res, next) => {
//     const err = new Error(`Route ${req.originalUrl} not found`);
//     err.statusCode = 400;
//     next(err)
// })

// Routes import
import userRouter from './routes/user.routes.js'
import testRouter from './routes/test.routes.js'
import noteRouter from './routes/note.routes.js'


// Available Routes
app.use('/api/v1/', testRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/notes', noteRouter)


export { app }
