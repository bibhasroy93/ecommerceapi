const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const { User } = require("../models/User");
const router = require("express").Router();
//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User (
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json("Error");
  }
});

module.exports = router;

// router.get("/usertest",(req,res)=>{
//     res.send("User test is Successful");
// });

// router.post("/userposttest",(req,res)=>{
//     const username=req.body.username;
//     res.send("Your username is : " +username);
// });
