import express from "express";
import indexRoutes from "./routes/index.routes.js"

const app = express();

app.use(indexRoutes)

const port = 5001;

app.listen(port, console.log("http://localhost:" + port))
