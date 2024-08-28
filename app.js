const express = require ('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended:false}));

//
// app.use((req,res,next) => {
//     console.log('In the midleware!');
//     next(); //Allows the request to continue to the next middleware in line
// });


app.use('/admin',adminRoutes);
app.use(shopRoutes);

//adding 404 error if page not found
app.use((req,res,next) => {
    res.status(404).send('<h1> Page Not Found</h1>');
});

app.listen(3000);