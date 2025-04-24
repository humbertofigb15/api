import { Router } from "express";
import { getUsers, getUser, postUsers, putUser, deleteUsers, login } from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", postUsers);
router.put("/users/:id", putUser);
router.delete("/users/:id", deleteUsers);
router.post("/login", login);

export default router;
