
// import cookieParser from "cookie-parser"
import express from 'express'
import mongoose from "mongoose"
import cors from "cors"
import path from "path";
const __dirname = path.resolve();

import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const SECRET = process.env.SECRET || "12345"
const PORT = process.env.PORT || 5000
const app = express()

// app.use(cors(["localhost:5000", "localhost:3000"]))

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'web-frontend/build')))

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
})


mongoose.connect("mongodb+srv://ahsan:form123@users.rpo2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number

})





const User = mongoose.model('User', UserSchema);

const Post = mongoose.model('Post', {
    name: String,
    caption: String,
    email: String
});


app.get('/api/v1/signup', (req, res) => {
    res.send(users)
})

app.post('/api/v1/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    if (!req.body.email || !req.body.password) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }

    console.log(req.body)

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                varifyHash(req.body.password, user.password).then(result => {
                    if (result) {

                        var token = jwt.sign({
                            name: user.name,
                            email: user.email,
                            _id: user._id,
                        }, SECRET);
                        console.log("token created: ", token);

                        res.cookie("token", token, {
                            httpOnly: true,
                            maxAge: 300000
                        });

                        res.send({
                            name: user.name,
                            email: user.email,
                            _id: user._id,
                        });
                    } else {
                        res.status(401).send("Authentication fail");
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.send("user not found");
            }
        }
    })
})

app.post('/api/v1/signup', (req, res) => {

    if (!req.body.email || !req.body.password || !req.body.name) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } 
    
    else{
        User.findOne({ email: req.body.email }, (err, user) => {

            if (user) {
                res.send("user already exist")
            }
            else {
                User.findOne({ email: req.body.email }, (err, user) => {
                    if (user) {
                        res.send("user already exist");
                    } else {
                        console.log(req.body)
        
                        stringToHash(req.body.password).then(passwordHash => {
                            console.log("hash: ", passwordHash);
        
                            let newUser = new User({
                                name: req.body.name,
                                email: req.body.email,
                                password: passwordHash,
                            })
                            newUser.save(() => {
                                console.log("data saved")
                                res.send('signup success')
                            })
                        })
                    }
                })

            }
        })
    }
})


app.use((req, res, next) => {

    jwt.verify(req.cookies.token, SECRET,
        function (err, decoded) {

            req.body._decoded = decoded;

            console.log("decoded: ", decoded) // bar

            if (!err) {
                next();
            } else {
                res.status(401).sendFile(path.join(__dirname, "./web-frontend/build/index.html"))
            }

        })

});


app.post('/api/v1/logout', (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 300000
    });
    res.send();
})



app.get('/api/v1/profile', (req, res) => {
    User.findOne({ email: req.body._decoded.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {
                res.send({
                    name: user.name,
                    email: user.email,
                });
            } else {
                res.send("user not found");
            }
        }
    })
})

app.post('/api/v1/profile', (req, res) => {

    if (!req.body.name || !req.body.caption) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } 
    
    else {

        let newPost = new Post({
            name: req.body.name,
            caption: req.body.caption,
            email: req.body.email
        });


        newPost.save(() => {
            console.log("Data Saved in MondoDB")
            res.send('Data Saved in MondoDB')
        }
        )

    }

})








app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web-frontend/build/index.html"))
    // res.redirect("/")
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})