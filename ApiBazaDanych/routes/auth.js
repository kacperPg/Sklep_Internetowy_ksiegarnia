const router=require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const validation = /^[A-Za-z0-9]+$/;
    if(!(req.body.username.match(validation))   || !(req.body.imie.match(validation)) || !(req.body.nazwisko.match(validation)) || !(req.body.address.match(validation)) )
    {
      res.status(400);
      return res.json({ error:"Nie używaj specjalnych znaków",status:"wrong_characters"});
    }
      const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
      ).toString(),
      imie: req.body.imie,
      nazwisko: req.body.nazwisko,
      telefon: req.body.telefon,
      address: req.body.address,
      kodpocztowy: req.body.kodpocztowy,
      wiek: req.body.wiek,
    });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const validation = /^[A-Za-z0-9]+$/;
      if(!(req.body.username.match(validation)) )
      {
            res.status(400);
            return res.json({ error:"Nie używaj specjalnych znaków",status:"not_exist"});
      }
      if(!user){
                res.status(400);
                return res.json({ error:"Uzytkownik nie istnieje",status:"not_exist"}); }
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(  OriginalPassword !== req.body.password){
          res.status(400);
          return res.json({ error:"Złe dane!"});
        }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );
    const { password, ...others } = user._doc;
    if (res.status(201)) {
      return res.json({...others, accessToken});
    } else {
      res.status(400);
      return res.json({ error:"Złe dane!"});
    }
  } catch (error) {
    res.json({status: "error", error: "InvAlid Password"});
    res.status(400);
  }
});

module.exports = router;
