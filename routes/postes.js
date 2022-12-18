const express = require("express");
const router = express.Router();
const res= require("express/lib/response");
const Post =require("../model/Post");
const multer=require('multer');

//get all postes
router.get('/', async (req,res)=>{
    try {
        //find get alldata
        const posts = await Post.find();
        res.json(posts);
        //res.json("all Posts succefully get");
    } catch (err) {
        res.json({ message : err});
        //res.json("posts not found");
    }
});

//save file
const upload=multer({
storage:multer.diskStorage({
    destination : function(req, file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+".png")
    }
})
}).single("user_file");

router.post("/upload",upload, async (req,res)=>{
    const file = new Post({
        file : req.body.file,
    });

    try {
      const savedFile =  await file.save();
      res.json(savedFile);
      //res.json("Post succefully added");
    } catch (err) {
        res.json({ message : err});
        //res.json("post is not added");
    }

});



//save post
router.post("/",upload,async (req,res)=>{
    const post = new Post({
        title : req.body.title,
        description : req.body.description,
        file:req.body.file,
    });

    try {
      const savedPost =  await post.save();
      res.json(savedPost);
      //res.json("Post succefully added");
    } catch (err) {
        res.json({ message : err});
        //res.json("post is not added");
    }

});

//get specefic post
router.get("/:postId",async (req,res) => {
    try {
        //find get alldata
        const post = await Post.findById(req.params.postId);
        res.json(post);
       // res.json("Post succefully getit");
    } catch (err) {
        res.json({ message : err});
        //res.json("post not found to get it");
    }
});

//update
router.patch("/:postId",async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            { _id : req.params.postId},
            {$set : {
                title : req.body.title,
                description : req.body.description,
            }}
        );
        res.json(updatePost);
        //res.json("Post succefully updated");
    } catch (err) {
        res.json({ message : err});
        //res.json("post not found to updated");
    }
});


    //delete post
    router.delete("/:postId",async (req, res)=>{
        try {
            const removePost = await Post.remove({ _id : req.params.postId});
            res.json(removePost);
            //res.json("Post succefully deleted");
        } catch (err) {
            res.json({ message : err});
            //res.json("post not found to deleted");
        }
    });

module.exports = router;