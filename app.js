
/**
 * Module dependencies
 */

var express = require('express')
    fs = require('fs-extra'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    config = require('./config');

var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
  // TODO
};

// MySQL
/*var mysql = require('mysql');
var db = mysql.createConnection({
    host: config.db.mysql_host,
    user: config.db.mysql_user,
    password: config.db.mysql_pass,
    database: config.db.mysql_db,
    multipleStatements: true
});*/

//PostgreSQL
var pg = require('pg');
var conString = config.pg;
var db = new pg.Client(conString);
db.connect();

// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

//USER API
app.get('/api/getuserinfo/:id', api.getUserInfo(db));

//Person API
app.put('/api/updateperson/:id', api.updatePerson(db));
app.delete('/api/deleteperson/:id', api.deletePerson(db));

//Organization API
app.put('/api/updateorg/:id', api.updateOrg(db));
app.delete('/api/deleteorg/:id', api.deleteOrg(db));

//Email
app.get('/api/getuseremails/:uid', api.getEmails(db));
app.post('/api/addemail', api.addEmail(db));
app.put('/api/setprimaryemail/:uid/:eid', api.setPrimaryEmail(db));
app.delete('/api/removeemail/:id', api.deleteEmail(db));

//Summary
app.put('/api/updatesummary/:id', api.updateSummary(db));

//Image Upload
app.get('/api/getpictures/:uid', api.getPictures(db));
app.post('/api/upload/:uid', api.uploadImage(db, fs, __dirname));
app.put('/api/setprimarypic/:uid/:pid', api.setPrimaryPic(db));

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});