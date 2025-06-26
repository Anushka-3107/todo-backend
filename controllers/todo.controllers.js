import mongoose from "mongoose";
import { Todo } from "../models/todo.models.js";

const addTodos = async(req,res) => {
    try {

        const {title,completed} = req.body;

        if(!title){
            return res.status(400).json({message: "Title is required"});
        }

        const newTodo = await Todo.create({
            title,
            completed
        });

        res.status(201).json(newTodo)
    
    } catch (error) {
        console.log(`error occured`, error);
        res.status(500).json({message:"Failed to create todo"})
    }
}



const getAllTodos = async(req,res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
        console.log("todo : ",todos)
    } catch (error) {
        console.log("no todos found !", error)
        res.status(500).json({message: "Failed to get todos"})
    }
}


const updateTodos = async(req,res) => {
    try{
        const {id} = req.params.id;
        console.log("REQ PARAMS ID : ",req.params.id)
        const {title,completed} = req.body;
        console.log(req.body);

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {
                title,
                completed
            },

            // const updatedTodo = await Todo.findByIdAndUpdate(id, { title, completed }, options); - syntax for findByIdAndUpdate
        );


        if(!updatedTodo){
            return res.status(404).json({message: "Internal server error"});
        }

        res.status(201).json(updatedTodo);

        

    }
    catch(error){
        console.log('failed to update todos',error)
    }
}

const deleteTodos = async(req,res) => {
    try{
        const {id} = req.params.id;
        console.log("req params id", req.params.id)

        const {title,completed} = req.body;

        const deleteTodo = await Todo.findByIdAndDelete(id)
    }
    catch(error){
        console.log("failed to delete todos", error)
    }
}



export {
    getAllTodos,
    addTodos,
    updateTodos,
    deleteTodos 
}