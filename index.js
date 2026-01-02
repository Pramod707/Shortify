const express = require('express')
const app = express()
const PORT  = 8000
const urlRoute = require('./ROUTES/url.routes');

app.use('/url',urlRoute);

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})