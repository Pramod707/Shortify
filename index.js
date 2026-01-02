const express = require('express')
const app = express()
const PORT  = 8000;
const {connectToMongo} = require('./Connection');
const urlRoute = require('./ROUTES/url.routes');

//middleware
app.use(express.json())

app.use('/url',urlRoute);

connectToMongo('mongodb://127.0.0.1:27017/shortify')
.then(()=> console.log('database is connected successfully'))
.catch((err)=>console.log(err));

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})