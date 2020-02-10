//IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//ROUTES
const basicInfoProfileRoutes = require('./api/routes/basicinfos');
const presentationProfileRoutes = require('./api/routes/presentations');

//DB CONNECTION
mongoose.connect('mongodb+srv://Danmlamx:'+ process.env.MONGO_ATLAS_PW +'@cluster0-uvieo.azure.mongodb.net/test?retryWrites=true&w=majority', 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

console.log('Database connected');

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*")
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//BODY PARSE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));

//URL
app.use('/api/basicinfoprofiles/', basicInfoProfileRoutes);
app.use('/api/presentationprofiles/', presentationProfileRoutes);

//ERROR HANDLING
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;