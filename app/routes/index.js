'use strict';
let path = process.cwd();
const  MyTokenABI = require(path+'/contract/MyTokenAbi.js');

module.exports = function (app, web3) {
    let MyTokenContract = web3.eth.contract(MyTokenABI.ABI);
    let MyToken = MyTokenContract.at(process.env.contractAddr);
    let accounts = web3.eth.accounts;

    web3.eth.defaultAccount = accounts[0];

    app.route('/GET/accounts')
        .get( function (req, res) {
            let balanceList = accounts.map((val)=> {
                return {'id': val, 'balance': MyToken.balanceOf(val)};
            });

            res.json(balanceList);
        });

    app.route('/POST/transfer')
        .post( function (req, res) {

            MyToken.transfer(accounts[req.body.accountId-1], req.body.amount)
            res.redirect('/');
        });

    app.get("/", function (request, response) {
        response.sendFile(path + '/views/index.html');
    });

};
