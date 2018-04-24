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

app.get('/', (req, res) => {
    controller.index(req, res);
})

app.get('/members', (req, res) => {
    controller.members(req, res);
})

app.get('/events', (req, res) => {
    controller.getEvents(req, res);
})

app.get('/create', (req, res) => {
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

app.post('/create', (req, res) => {
    controller.addEvent(req, res);
})

app.get('/event:id', (req, res) => {
    controller.getEvent(req, res);
})

module.exports = app;