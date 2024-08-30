const path = require('path');

const express = require ('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactUsRoutes = require('./routes/contactus');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));


//admin route
app.use('/admin', adminRoutes);

//shop route
app.use(shopRoutes);

//route for contactus page
app.use('/contactus', contactUsRoutes);

//route for the success message
app.get('/success',(req,res,next) => {
    res.send('Form successfully filled!');
});

//adding 404 error if page not found
app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000,() => {
    console.log('server is running on port 3000')
});