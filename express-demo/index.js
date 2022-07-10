const config = require('config');
const debug = require('debug')('app:startup');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...')
}

app.use('/api/courses', courses);
app.use('/', home);


console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`We listen ${port}`));