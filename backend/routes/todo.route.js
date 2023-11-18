const express = require('express')
const { Todomodel } = require('../model/todo.model')

const TodoRouter = express.Router()

TodoRouter.get("/Todo", async (req, res) => {
    try {
        const todo = await Todomodel.find({})
        res.send({ todo })
    } catch (err) {
        res.send({ msg: "data getting failed", error: err })
    }
})

TodoRouter.post("/Todo/add", async (req, res) => {
    try {
        const TodoData = new Todomodel(req.body)
        await TodoData.save()
        res.send({ msg: "Todo Task Added Successfully", })
    } catch (err) {
        res.send({ msg: "something went wrong", error: err })
    }
})

TodoRouter.put('/Todo/toggle/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todomodel.findById(todoId);

        if (!todo) {
            return res.json({ error: 'Todo not found' });
        }

        todo.status = !todo.status;
        await todo.save();
        res.send({ message: 'Status toggled successfully', todo });
    } catch (error) {
        console.error(error);
        res.send({ error: 'Internal Server Error' });
    }
});

TodoRouter.patch("/Todo/update/:id", async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        await Todomodel.findByIdAndUpdate({ _id: id }, payload)
        res.send({ msg: "Todo Task Updated Successfully" })
    } catch (err) {
        res.send({ msg: "Todo Task Updation Failed ", error: err })
    }
})
TodoRouter.delete("/Todo/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        await Todomodel.findByIdAndDelete({ _id: id })
        res.send({ msg: "Todo Task Deleted Successfully" })
    } catch (err) {
        res.send({ msg: "Sometthing Went Wront.", error: err })
    }
})

module.exports = {
    TodoRouter
}