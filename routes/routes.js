const express =require('express');
const routers=express.Router();
const sendemail=require('../utils/sendemail');
require('dotenv').config()
const visitor=require('../models/visitor');


routers.get('/v1/checkIn',(req,res)=>
{ 
    res.render('signup/checkin');
});


routers.get('/v1/emailsend',(req,res)=>
{
    res.render('login/checkout');
});

routers.post('/v1/checkIn', async(req,res)=>
{
await visitor.create(req.body)
.then(()=>
{
  console.log('saved');
});
res.redirect('/v1/emailsend');
const{name,email,phone}=req.body;
const msg = {
    to: email, // Change to your recipient
    from:  process.env.EMAIL,
    subject: 'Security Alert!!!',
    html: `
    <strong>Hi ${name} You just Checked-In and Your phone number are ${phone}.</strong>
    <br>
    <img src="https://img.icons8.com/nolan/74/gmail.png"/>
    <br>
    <h3>You just checked-In  from a new device. You're getting this email to make sure it was you.</h3>`,
  }
sendemail(msg);
});


routers.post('/v1/checkout', async(req,res)=>
{
  console.log(req.body);
res.redirect('/v1/checkIn');

const data =  await visitor.findOneAndUpdate(req.body,{"checkedIn":"No"});
   console.log(data);
  const msg = {
    to: data.email, // Change to your recipient
    from:  process.env.EMAIL,
    subject: 'Check-Out Alert!!!',
    html: `
    <strong>Hi ${data.name} You just Checked-Out and Your phone number are ${data.phone}. We hope to see you soon!!!</strong>
    <br>
    <img src="https://img.icons8.com/nolan/74/gmail.png"/>
    <br>
    <h3>You just checked-Out.You're getting this email to make sure it was you.</h3>`
    
  }
sendemail(msg);
});


module.exports = routers;