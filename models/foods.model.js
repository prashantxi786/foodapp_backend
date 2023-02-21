const mongoose=require("mongoose")
const foodSchema=mongoose.Schema({
    dish_name:{type:String, required:true},
    price:{type:Number, required:true},
    cuisine:{type:String, required:true},
    rating:{type:Number, required:true}
},{
    versionKey:false
})
const FoodModel=mongoose.model("Food",foodSchema)
module.exports={FoodModel}