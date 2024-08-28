const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.use('/add-product',(req,res,next) => {
    res.send(`
        <form action="/product" method="POST">
        <input type="text" name="title"><br>
        <input type="text" name="size"><br>
        <button type="submit">Add Product</button></form>
        `);
});
app.post('/product',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
})
// app.use((req,res,next) => {
//     console.log('In the midleware!');
//     next(); //Allows the request to continue to the next middleware in line
// });
app.use((req,res,next) => {
    //console.log('In another middleware!');
    res.send('<h1>Hello From Express !</h1>');
});
app.listen(3000);