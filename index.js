const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const { connectToMongo } = require("./Connection");
const urlRoute = require("./ROUTES/url.routes");
const staticRoutes = require("./ROUTES/staticRoutes");
const Url = require("./MODELS/url.model");
//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./VIEWS"));
//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}))
//database connection
connectToMongo("mongodb://127.0.0.1:27017/shortify")
    .then(() => console.log("database is connected successfully"))
    .catch((err) => console.log(err));
    
    //server side rendering route
    app.use("/", staticRoutes);
    //url routes
//client side rendering route
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                vistHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        {new : true}
    );
    if(!entry)return res.json({err : "short url not found"})
    res.redirect(entry.RedirectUrl);
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
