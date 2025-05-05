import express from "express";
//import db from "../db.js"; // Importing the database instance
import prisma from "../prismaclient.js";
const router = express.Router(); // Creating a new router instance

//get all todos for logged in user

router.get("/", async (req, res) => {
    const getTodos = await prisma.Todo.findMany({
        where: {
            userId: req.userId // Filtering todos by user ID
        }})
    res.json(getTodos)
});

//create a new todo

router.post("/", async (req, res) => {

    const { task } = req.body; // Destructuring task from request body
    const user_id = req.userId; // Getting user ID from request object
    const createtodo = await prisma.Todo.create({
        data:{
            task,
            userId:user_id // Creating a new todo in the database
        }
    })
   // const createtodo= db.prepare(`INSERT INTO todos(task,user_id) VALUES(?,?)`)
    //const result = createtodo.run(task, user_id) // Inserting the new todo into the database
    res.json(createtodo) // Sending the created todo back in the response

});

//update a todo
router.put("/:id", async (req, res) => {
    const {completed} = req.body; // Destructuring completed status from request body
    const {id} = req.params; // Getting todo ID from request parameters
    const {page}=req.query; // Getting page number from query parameters
    
    const updatetodo = await prisma.Todo.update({
        where:{
            id:parseInt(id),
            userId:req.userId // Filtering todos by user ID
        },
        data:{
            completed:!!completed // Updating the todo in the database
        }
    })
    //const updatetodo= db.prepare(`UPDATE todos SET completed=? WHERE id=?`)
    //const result = updatetodo.run(completed, id) // Updating the todo in the database

    res.json(updatetodo) // Sending the updated todo back in the response
});


//delete a todo
router.delete("/:id",async (req, res) => {
    const {id} = req.params; // Getting todo ID from request parameters
    
    const deletetodo= await prisma.Todo.delete({
        where:{
            id:parseInt(id),
            userId:req.userId // Filtering todos by user ID
        }
    })

    //const deletetodo= db.prepare(`DELETE FROM todos WHERE id=? AND user_id=?`)
    //const result = deletetodo.run(id, req.userId) // Deleting the todo from the database

    res.json({id,message:"todo deleted"}) // Sending a success message back in the response
});


export default router; // Exporting the router instance for use in other modules