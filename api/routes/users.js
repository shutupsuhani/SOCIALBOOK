//Routes ..user.js

const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user 
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id  || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt =await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status.json(err)
            }
        }

    try{
        const user = await User.findByIdAndUpdate(req.params.id,{
         $set: req.body,
        });
        res.status(200).json("Account has been updated")
    }catch(err) {
       return res.status(500).json(err);
    }

    } else{
        return res.status(403).json("You can update only your account")
    }
})
//delete user

router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id  || req.body.isAdmin){
       

    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted")
    }catch(err) {
       return res.status(500).json(err);
    }

    } else{
        return res.status(403).json("You can delete only your account")
    }
})




//get a user

router.get("/",async(req,res) => {
 const userId=req.query.userId
 const username=req.query.username
  try{
    const user = userId 
    ? await User.findById(userId)
    : await User.findOne({username:username});
    const {password,updatedAt, ...other} = user._doc
    res.status(200).json(other)
  } catch(err){
       res.status(500).json(err)
  }
})

// get friends

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});


//get all users
//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});



//unfollow a user 

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });
//search users
  router.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query || query.length < 3) {
        return res.status(400).json({ message: "Query must be at least 3 characters long" });
    }
    
    try {
        const users = await User.find({
            username: { $regex: query, $options: 'i' } // Case insensitive search
        }).select('username profilePicture'); // Only return required fields

        res.json(users);
        
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});  

module.exports=router