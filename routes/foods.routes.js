const express=require('express')
const jwt=require("jsonwebtoken")
const foodRouter=express.Router();
const {FoodModel}=require('../models/foods.model')
const {UserModel}=require('../models/user.model')
const {fieldAnalizer, recordofdeletion, recordofupdation } = require('../middleware/foods.middleware')

foodRouter.get("/",async(req, res)=>{
        var token=req.headers.authorization
        jwt.verify(token,"masai", (err,decoded )=>{
            if(err){
            res.send("Invalid Token")
            console.log(err)
            } else {
            res.send("Whatever you want can be sent over here")
            }
    })
    
    try {
        if(req.query.id){
            const foods=await FoodModel.find({_id:req.query.id})
            res.send(foods)
        }
        else if(req.query.min && req.query.max){
            const foods=await FoodModel.find({rating:{$in:[req.query.min,req.query.max]}})
            res.send(foods)
        }
        else if(req.query.cuisine){
            const foods=await FoodModel.find({cuisine:req.query.cuisine})
            res.send(foods)
        }
        else if(req.query.price){
            const foods=await FoodModel.find({price:{$lt:req.query.price}})
            res.send(foods)
        }
        else{
            const foods=await FoodModel.find()
            res.send(foods)
        }
        
       
    } catch (error) {
        console.log(error)
    }
})
foodRouter.post("/post",fieldAnalizer,async(req, res)=>{
    try {
        const food= new FoodModel(req.body)
        await food.save()
        res.send("FoodDatabase successfully updated")
    } catch (error) {
        console.log(error)
    }
})
foodRouter.patch("/update/:id",recordofupdation,async(req, res)=>{
    try {
        await FoodModel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.send("Successfully updated")
    } catch (error) {
        console.log(error)
    }
})
foodRouter.delete("/delete/:id",recordofdeletion,async(req, res)=>{
    try {
        await FoodModel.findByIdAndDelete({_id:req.params.id})
        res.send("Successfully deleted")
    } catch (error) {
        console.log(error)
    }
})
foodRouter.post("/register",async(req, res)=>{
    try {
        const user = new UserModel(req.body)
        await user.save()
        res.send("Registered")
    } catch (error) {
        console.log(error)
    }
})
foodRouter.post("/login",async(req, res)=>{
    const{email, pass} = req.body
    const token=jwt.sign({"course":"backend"},"user")
    try {
        const user = await UserModel.find({email,pass})
        if(user.length>0){
            res.send({"token":token,"msg":"Login successfull"})
            console.log(res.token)
        }
        else{
            res.send("Login failed")
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports ={foodRouter}