import { Router } from "express";
import { createGeneric, deleteGeneric, getGenerics, updateGeneric } from "./generic.controller";
const router = Router();

router.post("/", createGeneric);

router.get("/", getGenerics);

router.patch("/:id", updateGeneric);

router.delete("/:id", deleteGeneric);

export default router;
