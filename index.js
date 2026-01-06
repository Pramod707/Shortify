const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const Url = require("./MODELS/url.model");
const { connectToMongo } = require("./Connection");
const urlRoute = require("./ROUTES/url.routes");
const staticRoutes = require("./ROUTES/staticRoutes");
const UserRoute = require("./ROUTES/user.routes");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly } = require("./MIDDLEWARE/auth.middleware");

//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./VIEWS"));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//database connection
connectToMongo("mongodb://127.0.0.1:27017/shortify")
    .then(() => console.log("database is connected successfully"))
    .catch((err) => console.log(err));

//server side rendering route
app.use("/", staticRoutes);
//user signup route
app.use("/user", UserRoute);
//url routes
//client side rendering route
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );
    if (!entry) return res.json({ err: "short url not found" });
    res.redirect(entry.RedirectUrl);
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
