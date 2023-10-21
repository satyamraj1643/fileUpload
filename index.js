const path = require("path");
const express = require("express");
const PORT = 8000;
const app  = express();
const multer = require("multer");
//const upload = multer({dest : "uploads/"}) //It is a middleware
const storage = multer.diskStorage({
    destination : function (req, file, cb){
        return cb(null, './uploads')
    },
    filename : function(req,file,cb){
        return cb(null, `${Date.now()} - ${file.originalname}`);
    }
})
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    return res.render("homepage");
});
const upload = multer({storage});// Creating an instanc eof storage object

app.post("/upload", upload.single("profileImage") ,(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
})



app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})
