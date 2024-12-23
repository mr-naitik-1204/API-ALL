const model = require('../model/user')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

exports.Signup = async (req, res) => {
    const Data= req.body;
    try {
        
        Data.password = await bcrypt.hash (req.body.password,10)
        const create = await model.create(Data)
        res.status(200).json({
            status: 'Success',
            Message: 'Data enter success',
            Data: create
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}

// =================data========================

// {
//     "username": "exampleUser",
//     "email": "example@example.com",
//     "password": "examplePassword"
// }


// ========================output========================

// {
//     "status": "Success",
//     "Message": "Data enter success",
//     "Data": {
//         "username": "exampleUser",
//         "email": "example@example.com",
//         "password": "$2b$10$oqoryUBSE2CQDHj29QLtTup84RBszKqd7IcE/hUz9R112pHo7dg1G",
//         "_id": "675a5dd2095b270f47e6202d",
//         "createdAt": "2024-12-12T03:51:46.462Z",
//         "__v": 0
//     }
// }


exports.Login = async (req, res) => {
    try {
        const logindata = await model.findOne({ email: req.body.email });
        if (!logindata) throw new Error("Email not found");
        const checkpassword = await bcrypt.compare(req.body.password, logindata.password);
        if (!checkpassword) throw new Error("Invalid password");
        const token = jwt.sign({ id: logindata._id }, 'surat', { expiresIn: '1h' });
        res.status(200).json({
            status: 'Success',
            Message: 'Login successful',
            Data: logindata,
            token
        });
    } catch (error) {
        res.status(401).json({
            status: 'Fail',
            Message: error.message
        });
    }
}

// =================data========================

// {
//     "email": "example@example.com",
//     "password": "examplePassword"
// }


// ========================output========================


// {
//     "status": "Success",
//     "Message": "Login successful",
//     "Data": {
//         "_id": "675a5d97095b270f47e6202b",
//         "username": "exampleUser",
//         "email": "example@example.com",
//         "password": "$2b$10$ZVNUYcxR3NiNOjo7RkXFTe9GkF819.qfTxB0Io/UIzG5LAcNHtoi.",
//         "createdAt": "2024-12-12T03:50:47.147Z",
//         "__v": 0
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWE1ZDk3MDk1YjI3MGY0N2U2MjAyYiIsImlhdCI6MTczMzk3NTYyOSwiZXhwIjoxNzMzOTc5MjI5fQ.hcSM_-7Sihj7Uu0B_xKHgngpM0rf6IjNyeNOsr7wMis"
// }


exports.deletedata = async (req, res) => {
    const id=req.params.id;
    try {
        const show = await model.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            Message: 'Data delete success',
            Data: show
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}
 
// ========================DATA========================

// http://localhost:3000/deletedata/675a5d97095b270f47e6202b

// ========================OUTPUT========================


// {
//     "status": "Success",
//     "Message": "Data delete success",
//     "Data": {
//         "_id": "675a5d97095b270f47e6202b",
//         "username": "exampleUser",
//         "email": "example@example.com",
//         "password": "$2b$10$ZVNUYcxR3NiNOjo7RkXFTe9GkF819.qfTxB0Io/UIzG5LAcNHtoi.",
//         "createdAt": "2024-12-12T03:50:47.147Z",
//         "__v": 0
//     }
// }