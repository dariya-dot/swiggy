const express=require('express')
const dotEnv=require('dotenv')
const app = express()
const mongoose=require('mongoose')
const venderRouter=require('./routers/venderresisterrouter')
const bodyParser=require('body-parser')

const firmrouter=require('./routers/firmrouter')
const productrouter=require("./routers/productroutes")
const cors=require('cors')
const path= require('path')

app.use(cors());

const PORT=process.env.PORT || 3001
dotEnv.config()

mongoose.connect(process.env.URI)
.then(()=>{console.log("the Mongoose connection is sucessful")})
.catch((error)=>{console.error(error)})
app.use(bodyParser.json())
app.use('/vender',venderRouter)
app.use('/firm',firmrouter)
app.use('/product',productrouter)



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT,()=>{
    console.log(`the server is running at ${PORT}`)
})



