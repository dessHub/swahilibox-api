import express from 'express';
import User from '../models/user';
const router = express.Router();

router.get('/', (req, res) => {
   // console.log('Working');
    User.find({}, (err, users)=> {
  if (err) throw err;

  // object of all the users
  console.log(users);
});
});

export default router;
