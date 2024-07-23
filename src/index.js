import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';
import conf from './conf/conf.js';
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config({
    path: './.env'
})

connectDB()

app.use(errorMiddleware)

// Create server
app.listen(conf.PORT || 8000, () => {
    console.log(`Server running at http://${conf.HOSTNAME}:${conf.PORT}`)
})


export { app }
