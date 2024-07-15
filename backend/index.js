import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
const port = 8800
const db = mysql.createConnection({
    host:"localhost",
    user:"ashwin",
    password:"StrongPassword123!",
    database:"test"
})

app.use(express.json()) //With express.json() middleware in place, when data is sent from the client in JSON format, Express will automatically parse it and make it available in req.body for further processing in your route handlers.

app.use(cors())


//req comes from the client such as browser or frontend 
//   "/" is the endpoint
app.get("/",(req,res)=>{
    res.json("this is the backend") //res.send() i usually use ; res.json is the response will be sended in json format 
})

app.get("/books",(req,res)=>{
    const q = "select * from books" //q is nothing but query for mysql database
    db.query(q,(err,data)=>{  //if error is there it returns error in format of json ; if not it returns the data
        if(err) return res.json(err)
        return res.json(data)
    })

})

//post request is nothing but getting the data from the user from frontend 
app.post("/",(req,res)=>{
    const q= "insert into books (`title` , `description` , `cover`,  `price`) values (?)"

    // const values = [   // instead of receiving this data from user from frontend we are doing it manually to store this data in backend it will match respectively to columns like `title` , `description`
    // "title from backend ",
    // "desc from backend",
    // "cover pic from backend",
    // ];


    //data is sended as json format; it is sended from postman and its been receieved by the server index.js as req.body (i.e) as a request from the client and its been stored to the dB since json cant be sended to express we use app.use(express.json()) 
    const values=[
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("BOOK has been created succesfully in the database ");
    });

});

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id  ;          //params  means the url of the above line /books
    const q = "delete from books where id = ?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully.")
    });
});


app.put("/books/:id",(req,res)=>{ //if we update the book details then put method
    const bookId = req.params.id  ;          //params  means the url of the above line /books
    const q = "UPDATE books SET `title` = ?, `description` = ? , `price` = ?, `cover` = ? WHERE id = ?";
    const values=[
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been UPdated successfully.")
    });
});

app.listen( port ,()=>{
    console.log("connected to backend!")
})