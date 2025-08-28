const express =require("express");
const router =express.Router();

//index -user
router.get("/",(req,res)=>{
    res.send(" makre for users");
});
//show user
router.get("/:id",(req,res)=>{
    res.send(" get for user id");
})
//post user
router.post("/users",(req,res)=>{
    res.send(" get for user id");
})
// delete user 
router.delete("/:id",(req,res)=>{
    res.send(" Delete for user id ");
});

module.exports =router;