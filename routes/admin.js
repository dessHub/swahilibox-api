const express = require('express');
const app = express.Router();
const controller = require('../controllers/admin/index');

const aws = require('aws-sdk');
/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
aws.config.region = 'eu-west-1';

/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = process.env.S3_BUCKET;

app.get('/', isLoggedIn, isAdmin, (req, res) => {
    controller.index(req, res);
})

app.get('/members', isLoggedIn,isAdmin, (req, res) => {
    controller.members(req, res);
})

app.get('/events', isLoggedIn,isAdmin, (req, res) => {
    controller.getEvents(req, res);
})

app.get('/create', isLoggedIn,isAdmin, (req, res) => {
    controller.getCreate(req, res);
})

app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

app.post('/create', isLoggedIn,isAdmin, (req, res) => {
    controller.addEvent(req, res);
})

app.get('/event:id', isLoggedIn,isAdmin, (req, res) => {
    controller.getEvent(req, res);
})

app.get('/edit_event:id', isLoggedIn,isAdmin, (req, res) => {
    controller.getEdit(req, res);
})

app.post('/edit/event', isLoggedIn,isAdmin, (req, res) => {
    controller.postEdit(req, res);
})


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/front/login');
}

function isAdmin(req, res, next) {
    var user = req.user;
    if (user.local.role=="Admin") {
      return next();
    }
    
    res.redirect('/');
  }


module.exports = app;