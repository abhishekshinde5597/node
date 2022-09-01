import express from 'express';
import mongoose from 'mongoose';
import Registerroutes from './Router/Registerroutes.js'
const app = express();
app.use(express.json());
app.use('/register', Registerroutes); //REgister route
app.use('/login', Registerroutes);
app.use('/', Registerroutes);
app.use('/', Registerroutes);
app.use('/', Registerroutes);
app.use('/', Registerroutes);
app.use('/', Registerroutes);

mongoose.connect("mongodb://127.0.0.1:27017/blogapi", {
    useNewurlParser: true,
    useunifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connection sucessfully")
    }
})

app.listen(5000), () => {
    Console.log("port set sucessfully")
}