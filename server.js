const express = require('express')
const app = express()
const bp = require('body-parser')
const db = require('mongoose')
const uuid = require('uuid');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();


const dbURI = process.env.MONGODB_URI;
app.use(express.static(path.join(__dirname, 'admin-panel/build')))
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
const nodemailer = require('nodemailer');
db.connect(dbURI);


const usersShema = db.Schema({
    userName:String,
    password:String,
    repetPassword:String,
    email:String,
    id:String,
    Tickers:[{Ticker:String,
      Quantity:Number,
      price:Number,
      ActualPice:Number,
      ExitPrice:Number,
      StopLose:Number,
      TotalCost:Number,
      ExpectedProfit:Number,
      ExpectedLose:Number}]
    })
    
const tickersShema = db.Schema ({
      Ticker:String,
      Quantity:Number,
      price:Number,
      ActualPice:Number,
      ExitPrice:Number,
      StopLose:Number,
      TotalCost:Number,
      ExpectedProfit:Number,
      ExpectedLose:Number
    })
    



const adminSchema = db.Schema({
    email:String,
    password:String
})

const usersList= db.model('userList',usersShema)
const TickersList = db.model('tickerList',tickersShema)
const adminModel = db.model('users',adminSchema);



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'financeforget32@gmail.com',
      pass: 'osyvvozntguhbdkz',
    },
  });
  
  const subject = 'Confirmation Email';
  const emailBody = 'Hello, This is Your Confirmation Code : ';
  


// פונקציה לשליחת הודעת ברכה
function sendWelcomeEmail(email,code) {
    const mailOptions = {
        from: 'financeforget32@gmail.com',
        to: email,
        subject: subject,
        text: emailBody + code,
      };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      
  }


  function sendEmailConfirmation(email,code) {
    const mailOptions = {
        from: 'financeforget32@gmail.com',
        to: email,
        subject: subject,
        text: 'your confirmation code is : ' + code,
      };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      
  }


app.post('/check' , async(req,res)=>
{
    const min = 99999;
    const max = 999999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    let email = req.body.email;
    let password = req.body.password;

    let temp = await adminModel.findOne({
        email:email,
        password:password
    })
    if(temp == null)
    {
        res.json(temp)
    }
    else
    {
        sendWelcomeEmail(email,code)
        res.json({email : email, password : password, code : code})
    }

})

// app.post('/sendCode',async(req,res)=>
// {
//     const min = 99999;
//     const max = 999999;
//     const code = Math.floor(Math.random() * (max - min + 1)) + min;
//     let email = req.body.email;

//     let temp = await adminModel.findOne({
//         email:email
//     })
//     if(temp == null)
//     {
//         res.json(temp);
//     }
//     else
//     {
//         sendEmailConfirmation(email,code)
//         res.json(code)
//     }
// })

app.get('/getUsers', async(req,res)=>
{
    let temp = await usersList.find();
    res.json(temp)
})
app.get('/getTickers', async(req,res)=>
{
    let temp = await TickersList.find();
    res.json(temp);
})

app.post('/sendPasswordReset', async(req,res)=>
{
    const min = 99999;
    const max = 999999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    let email = req.body.email;
    let requist = req.body.requist
    // console.log(code);

    if(requist == 0)
    {
        let temp = await adminModel.findOne({
            email:email
        })
        if(temp == null)
        {
            res.json(temp);
        }
        else
        {
            sendEmailConfirmation(email,code)
            res.json(code)
        }
    }
    else if(requist == 1)
    {
        let newEmail = req.body.newEmail;
        let temp = await adminModel.findOne({
            email:newEmail
        })
        if(temp == null)
        {
            sendEmailConfirmation(email,code)
            res.json(code)
        }
        else
        {
            res.json(null);
        }
    }
    else if(requist == 2)
    {
        let newAdmin = req.body.newAdmin;
        let temp = await adminModel.findOne({
            email:newAdmin
        })
        if(temp == null)
        {
            sendEmailConfirmation(email,code)
            res.json(code)
        }
        else
        {
            res.json(null);
        }
    }
    else
    {
        let deletedAdmin = req.body.deletedAdmin;

        let temp = await adminModel.findOne({
            email:deletedAdmin
        })
        if(temp == null)
        {
            res.json(null);
        }
        else
        {
            sendEmailConfirmation(email,code)
            res.json(code)
        }
    }


})


app.post('/changePassword', async(req,res)=>
{
    let email = req.body.email;
    let password = req.body.password;

    let temp = await adminModel.updateOne(
        { email: email },
        { $set: { password: password } }
      );

      if (temp.modifiedCount === 1)
      {
        res.json('Password updated successfully');
      } 
      else 
      {
        res.json('Password update failed');
      }

})

app.post('/changeEmail', async(req,res)=>
{
    let email = req.body.email;
    let newEmail = req.body.newEmail;

    let temp = await adminModel.updateOne(
        { email: email },
        { $set: { email: newEmail } }
      );

      if (temp.modifiedCount === 1)
      {
        res.json('Email updated successfully');
      } 
      else 
      {
        res.json('Password update failed');
      }

})

app.post('/addAdmin', async(req,res)=>
{
    let email = req.body.email;
    let password = req.body.password;

    let temp = await adminModel.findOne(
        {
            email:email,
        }
      );

      if (temp == null)
      {
          adminModel.insertMany({
            email : email,
            password: password
          })
          res.json('Admin Added successfully');
    } 
    else 
    {
        res.json('Admin Already Added')
      }

})

app.post('/deleteAdmin', async(req,res)=>
{
    let email = req.body.email;

    let temp = await adminModel.findOne(
        { email: email },
      );

      if (temp === null)
      {
          res.json('the Admin Does Not Found');
        } 
        else 
        {
            await adminModel.deleteOne({
                email:email
            })
          res.json('Email deleted successfully');
      }

})


// app.get('/addAdmin', async(req,res)=>
// {
//     let temp = await adminModel.insertMany({
//         email:'tareq.salame@gmail.com',
//         password:'tarek123'
//     })
//     res.send('ok')
// })

app.get('/getAdmins', async(req,res)=>
{
  let temp = await adminModel.find()
  res.json(temp)
})

// app.get('/addtheuser', async(req,res)=>
// {
//     let temp = await usersList.insertMany({
//     userName:'tarek',
//     password:'12345',
//     repetPassword:'12345',
//     email:'tarek.salame@gmail.com',
//     id:'206419715',
//     Tickers:[{Ticker:'TSLA',
//       Quantity:'5',
//       price:'300',
//       ActualPice:'200',
//       ExitPrice:'250',
//       StopLose:'230',
//       TotalCost:'-50',
//       ExpectedProfit:'50',
//       ExpectedLose:'50'}]
//     })
//     console.log(temp);
//     res.send('ok')
// })

// app.get('/addTickers' , async(req,res)=>
// {
//     let temp = await TickersList.insertMany({
//       Ticker:'AAPL',
//       Quantity:'5',
//       price:'300',
//       ActualPice:'200',
//       ExitPrice:'250',
//       StopLose:'230',
//       TotalCost:'-50',
//       ExpectedProfit:'50',
//       ExpectedLose:'50'
//     })
//     console.log(temp);
//     res.send('ok')
// })
// // In-memory storage for tokens (replace with a database in production)
// const tokenStore = new Map();


//   // Generate a unique token
// const generateToken = () => crypto.randomBytes(32).toString('hex');

// // Send email with unique link
// app.post('/send-link', (req, res) => {
//     const email = req.body.email;
//     const token = generateToken();
//     tokenStore.set(token, { email, expires: Date.now() + 3600000 }); // Token expires in 1 hour
  
//     const link = `http://localhost:2000/verify/${token}`;
//     const mailOptions = {
//       from: 'financeforget32@gmail.com',
//       to: email,
//       subject: 'Sign-in Link',
//       text: `Click the following link to sign in: ${link}`,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.json(null);
//       } else {
//         console.log('Email sent:', info.response);
//         res.json('Email sent');
//       }
//     });
//   });

//   // Handle the unique link and sign in the user
// app.get('/verify/:token', (req, res) => {
//     const token = req.params.token;
//     const storedToken = tokenStore.get(token);
  
//     if (storedToken && storedToken.expires > Date.now()) {
//       // Token is valid, allow sign-in
//       tokenStore.delete(token); // Remove token from store after use
//       // You can now create a session or generate an access token for the user
  
//       res.json('success');
//     } else {
//       res.status(400).send('Invalid or expired token');
//     }
//   });

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-panel/build', 'index.html'));
  });


app.listen(process.env.PORT || 2000, () => console.log('Server running on port', process.env.PORT || 2000));
