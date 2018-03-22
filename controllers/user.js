
import User from '../models/user';

let controller = {};

controller.index = (req, res) => {
   User.find({}, (err, users) => {
     if(err) throw err;

       console.log(users);
       res.send(users);
   });
}

controller.addUser = (req, res) => {
    console.log("her");
   let user = User({
     name: req.body.name,
     username: req.body.username,
     password: req.body.password,
   });

    user.save((err, user) => {
      if(err) throw err;

        console.log(user);
        res.send(user);
    });
}

export default controller;
