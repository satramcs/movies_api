const express = require("express");

const movies = require("./routes/movies");

const app = express();
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//   Routes
app.use("/movies", movies);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at ${port}`));
