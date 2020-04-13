const express = require("express");

const movies = require("./routes/movies");

const app = express();
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//   Routes
app.use("/movies", movies);

app.use(function(req, res, next){
  res.status(404).json({status_code: 5, message: 'Page not found'});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at ${port}`));
