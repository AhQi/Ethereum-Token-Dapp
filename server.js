/**
 * Created by ah on 2018/4/12.
 */
const Web3 = require('web3');
const express = require('express');
const routes = require('./app/routes/index.js');
const bodyParser = require('body-parser');

let app = express();
let web3 = new Web3();


web3.setProvider(new web3.providers.HttpProvider(process.env.ethereumUri));
/*
 * connect to ethereum node
 */

app.use(express.static('public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}else{



    routes(app, web3);


}





let port = (process.env.PORT || 5000);
app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
});