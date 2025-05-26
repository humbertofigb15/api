import "dotenv/config";
import express from "express";
import cors from "cors"; 
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(indexRoutes);
app.use(usersRoutes);

const port = 5001;

app.listen(port, () => {
  console.log("Servidor escuchando en http://localhost:" + port);
});
