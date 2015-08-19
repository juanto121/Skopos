var express = require('express'),
	app  = express(),
	server = require('http').createServer(app);


server.listen(process.env.PORT || 80);

app.use(express.static( __dirname +'/public'));

app.get('/',function(req,res){
  res.sendfile( __dirname + '/public/views/index.html');
});


app.get('/solo',function(req,res){
  res.sendfile( __dirname + '/public/views/soloplay.html');
});