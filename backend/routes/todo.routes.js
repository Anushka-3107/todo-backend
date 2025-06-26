import express from 'express'
const router = express.Router();
import {getAllTodos,addTodos,updateTodos,deleteTodos } from '../controllers/todo.controllers.js'


router.route("/").get(getAllTodos)

router.route("/").post(addTodos)

router.route("/:id").put(updateTodos)

router.route("/:id").delete(deleteTodos)

export default router;