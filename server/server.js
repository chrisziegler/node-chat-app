const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
// console.log(process.env.PORT);

const publicPath = path.join(__dirname, "../public");
const app = express();

app.use(express.static(publicPath));
// app.get('/', (req, res) => {
//     res.render('index.html')
// })


app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})