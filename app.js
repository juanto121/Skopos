var express = require('express'),
	app  = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	fs = require('fs');

app.use(express.static( __dirname +'/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
server.listen(process.env.PORT || 80);

app.use(express.static( __dirname +'/public'));

app.get('/',function(req,res){
  res.sendfile( __dirname + '/public/views/index.html');
});


app.route('/solo')
.get(function(req,res){
  res.sendfile( __dirname + '/public/views/soloplay.html');
})
.post(function(req, res){
	var path = __dirname + "/public/temp/files/"+req.body.name;
	fs.writeFile(path, req.body.data, function(err){
		if(err) throw err;
		res.writeHead(200,{'content-type':'application/x-subrip'});
		res.end("/temp/files/"+req.body.name);
	});
});

