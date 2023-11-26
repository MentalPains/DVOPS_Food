var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));


const { register, login } = require('./utils/UserUtil')
app.post('/register', register);
app.post('/login', login);

const { viewReviews, editReviews, deleteReviews } = require('./utils/ReviewUtil')
app.get('/view-reviews', viewReviews);
app.put('/edit-review/:id', editReviews);
app.delete('/delete-review/:id', deleteReviews);


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})
app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`);
});

