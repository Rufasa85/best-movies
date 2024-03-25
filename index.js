const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { Pool } = require("pg");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: "postgres",
    // TODO: Enter PostgreSQL password
    password: "password",
    host: "localhost",
    database: "movies_db",
    port: 5434,
  },
  console.log(`Connected to the movies_db database.`)
);

app.get("/api/movies",(req,res)=>{
    pool.query(`SELECT * FROM movies`,(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).json({msg:"something went wrong"})
        } else {
            res.json(data.rows)
        }
    })
})
app.get("/api/movie-reviews",(req,res)=>{
    pool.query(`SELECT movie_name, review FROM movies JOIN reviews ON movie_id = movies.id`,(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).json({msg:"something went wrong"})
        } else {
            res.json(data.rows)
        }
    })
})

app.put("/api/review/:id",(req,res)=>{
    pool.query(`UPDATE reviews SET review = $1 WHERE id = $2`,[req.body.review,req.params.id],(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).json({msg:"something went wrong"})
        } else {
            if(data.rowCount>0){
                res.json({msg:"movie updated!"})
               } else {
                res.status(404).json({msg:"no movie with that id!"})
               }
        }
    })
})


app.post("/api/new-movie",(req,res)=>{
    pool.query(`INSERT INTO movies (movie_name) VALUES($1)`,[req.body.movie_name],(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).json({msg:"something went wrong"})
        } else {
            res.json({msg:"movie added!"})
        }
    })
})

app.delete("/api/movie/:id",(req,res)=>{
    pool.query(`DELETE FROM movies WHERE id = $1`,[req.params.id],(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).json({msg:"something went wrong"})
        } else {
           if(data.rowCount>0){
            res.json({msg:"movie deleted!"})
           } else {
            res.status(404).json({msg:"no movie with that id!"})
           }
        }
    })
})


app.get("*", (req, res) => {
  res.status(404).send("page not found!");
});

pool.connect().then(() => {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
