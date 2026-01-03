const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const { connectToMongo } = require("./Connection");
const urlRoute = require("./ROUTES/url.routes");
const Url = require("./MODELS/url.model");
//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./VIEWS"));
//middleware
app.use(express.json());
//database connection
connectToMongo("mongodb://127.0.0.1:27017/shortify")
    .then(() => console.log("database is connected successfully"))
    .catch((err) => console.log(err));
//url routes

//server side rendering route

app.get("/test", async (req, res) => {
    const allurls = await Url.find({});
    return res.render("home.view.ejs", {
        urls: allurls,
    });
});

//
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
        }
    );
    res.redirect(entry.RedirectUrl);
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
