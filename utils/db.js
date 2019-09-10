const db=require("mongoose");
db.connect('mongodb://localhost/cms',{
    useNewUrlParser:true,
    useFindAndModify:false
})
    .then(()=>console.log("MongoDB connect success...."))
    .catch(err=>console.log(err));
module.exports=db;