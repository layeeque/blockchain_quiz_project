var express = require('express')
var Web3 = require('web3')
var cors = require('cors')
var solc = require('solc')
var fs = require('fs')
var _ = require('lodash');
const bodyParser = require('body-parser');
var app = express();
var deployedAddr = "";
var VotingContract;
var userAccounts = [];
app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post('/login', function(req, res) {

    var users = JSON.parse(fs.readFileSync('./users/users.json'))
    console.log(users[0].ID)
    user = _.filter(users, { 'ID': req.body.ID, 'Password': req.body.Password });
    console.log(user.length)
    if (user.length != 0) {
        res.send(user);
    } else {
        res.send(false)
    }
})

app.get('/getQuestions', function(req, res) {
    return res.json(JSON.parse(fs.readFileSync('./question_and_answer/questions.json', 'utf8')))
})
var addParticipants = function() {
    console.log("I am in addParticipants" + deployedAddr)

    var ee = VotingContract.at(deployedAddr).addParticipants(userAccounts, { from: userAccounts[0] })
    console.log("return aayewala " + ee)
        // .then(function(result) {
        //     console.log(" from hum kale hai to dilwale hai " + result)
        // });

}
app.post('/submitAns', function(req, res) {
    var result = req.body;
    var score = 0;
    console.log(JSON.stringify(result))
    var refAnswer = JSON.parse(fs.readFileSync('./question_and_answer/answers.json'))
    console.log(JSON.stringify(refAnswer))
    for(var index=0;index<10;index++)
    {
        if(refAnswer[index].answer==result[index].answer)
        {
            score ++ ;
        }
        
    }
    console.log('comming account'+result[10].Account)
    console.log("score is "+ score)
     
 return res.json(addscore(result[10].Account,score))
})
app.post('/participateInExame', function(req, res) {
    var participant = req.body.participant;
    var instance = VotingContract.at(deployedAddr);

    var tt = instance.participateInExame(participant, { from: userAccounts[0] })
    res.send("anku cc" + participant + " " + tt)
    //res.sendStatus(200).end(score)
   

})

addscore = function(participant, score) {
    
    var instance = VotingContract.at(deployedAddr);

    var tt = instance.addscore(participant, score, { from: userAccounts[0] })
    return tt+"your score is added in block chain";

}

app.post('/getScore', function(req, res) {
    var participant = req.body.participant;

    var instance = VotingContract.at(deployedAddr);

    var tt = instance.getScore(participant, { from: userAccounts[0] })
    res.send(tt)

})

var BLdeploye = function(a, addParticipants) {
    console.log("I am in rest service")
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    var code = require('fs').readFileSync('./contracts/Examination.sol').toString()
    compiledCode = solc.compile(code)
    var getabi = compiledCode.contracts[':Examination'].interface
        // console.log(getabi)
    abi = JSON.parse(getabi)
    VotingContract = web3.eth.contract(abi);

    var byteCode = compiledCode.contracts[':Examination'].bytecode
        //console.log(byteCode)
    userAccounts = web3.eth.accounts;
    console.log(userAccounts);
    deployedContract = VotingContract.new(8, { data: byteCode, from: web3.eth.accounts[0], gas: 4700000 }, function(e, contract) {
        // var deployedAddr = "gaga";
        if (!e) {
            if (!contract.address) {
                //     console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
            } else {
                console.log("Contract mined! Address: " + contract.address);

                console.log("****************")
                console.log("deployed contract ## " + deployedContract)

                deployedAddr = deployedContract.address
                console.log("deployed address is " + deployedAddr)
                    //instance = VotingContract.at(addr)

                // return res.json(deployedContract.sayHello.call())
                //             a()
                a(addParticipants)
            }
        } else {
            console.log(e);
        }
        // })


    })

}






app.listen(3000, function() {
    console.log('server is running on port 3000')
    BLdeploye(function(addParticipants, addr) {
        console.log("function called done" + userAccounts)
        fs.writeFileSync("./users/users.json", JSON.stringify([{
                "ID": "John@example.com",
                "Password": "john",
                "Account": userAccounts[1]
            }, {
                "ID": "Alice@example.com",
                "Password": "alice",
                "Account": userAccounts[2]
            }, {
                "ID": "Bob@example.com",
                "Password": "bob",
                "Account": userAccounts[3]
            }])


        )
        console.log("kakakakakaka" + addr)
        addParticipants()
    }, addParticipants)
});