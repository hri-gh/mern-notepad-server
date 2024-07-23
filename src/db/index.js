import mongoose from "mongoose"
// import { DB_NAME } from "../constants.js"
import conf from '../conf/conf.js'

connectDB().catch(err => console.log("MONGO db connection failed !!!", err));

async function connectDB() {
    await mongoose.connect(`${conf.MONGODB_URI}`);
    // await mongoose.connect(`${conf.MONGODB_URI}/${DB_NAME}`);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
    console.log(`MongoDB connected !! DB HOST: ${db.host}/${db.port}`)
})
export default connectDB
