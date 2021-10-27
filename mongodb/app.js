/*
//Selecao
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dio:dio@cluster0.nxibm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myFirstDatabase");
  dbo.collection("categorias").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});*/

/*
//Insercao
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dio:dio@cluster0.nxibm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myFirstDatabase");
  var myobj = { nome: "Banco de Dados", slug: "BD", date: Date.now() };
  dbo.collection("categorias").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
*/