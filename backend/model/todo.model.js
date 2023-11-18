const mongoose = require('mongoose')


const TodoSchema = mongoose.Schema({
    title:{type:String, required:true},
    date:{type:Date, required:true},
    status:{type:Boolean, required:true}
},{
    versionKey:false,
})

const Todomodel = mongoose.model("tododetails", TodoSchema)

module.exports = {
    Todomodel
}