const fs=require('fs');
const fieldAnalizer=(req,res,next)=>{
    const {dish_name,cuisine,price,rating}=req.body
    if(dish_name==null||cuisine==null||price==null||rating==null){
        res.send({"err": "Few fields are missing, cannot process the request"})
    }
    next()
}
const recordofupdation=(req,res,next)=>{
    let {id}=req.params
    fs.appendFile("records.txt",`The dish with id:${id} has been updated | ${new Date()} \n`,"utf-8",(err)=>{
        if(err){
            res.send(err)
        }
        else{
            next()
        }
    })
    
}
const recordofdeletion=(req,res,next)=>{
    let {id}=req.params
    fs.appendFile("records.txt",`The dish with id:${id} has been deleted | ${new Date()} \n`,"utf-8",(err)=>{
        if(err){
            res.send(err)
        }
        else{
            next()
        }
    })
}
module.exports={fieldAnalizer,recordofdeletion,recordofupdation}