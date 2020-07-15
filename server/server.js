const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')


dotenv.config();
const app = express();

mongoose.connect(

    process.env.DATABASE,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        }
).then(()=>{
    console.log("Connected to mongo DB");
    
}).catch((err)=>{
    console.log("Error in connecting Mongo DB: "+ err);
    
})
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

//require api's

const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')
const userRoute = require('./routes/auth')
const paymentRoutes = require('./routes/payments');
const orderRoutes = require('./routes/order');

app.use('/api',productRoute)
app.use('/api',categoryRoute)
app.use('/api',userRoute)
app.use('/api',paymentRoutes)
app.use('/api',orderRoutes)


let port = process.env.PORT;
if (port == null || port ==""){
    port = 3000;
}
        

app.listen(port, (err)=>{
    if(err){
        console.log("Error at starting the server: "+err);
        
    }else{
        console.log("Litsening at port 3000");
    }
})