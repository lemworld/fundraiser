const express = require('express');
const app = express();
const ServerConstants = require("./constants");
const stripe = require("stripe")(ServerConstants.STRIPE_SK_TEST);
const bodyParser = require("body-parser");
const cors = require('cors');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
});

app.get("/api/donations/list/", function (req, res) {

    var dynamoclient = new AWS.DynamoDB.DocumentClient();
    var db = new AWS.DynamoDB;

    var params = {
        TableName : "Donations"/*,
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames:{
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy":1985
        }*/
    };
/*
    dynamoclient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(" -", item.year + ": " + item.title);
            });
        }
    });
    */

    db.listTables(function(err, data) {
      console.log(data.TableNames);
    });


    res.send("See console");
});


app.post("/api/donations/new/", (req, res) => {

    // Convert the charge amount from a float to integer in cents
    let amount = parseInt(parseFloat(req.body.amount) * 100);

    console.log("Amount to charge: " + amount);
    console.log(req.body);

    stripe.customers.create({
        email: req.body.emailaddress,
        card: req.body.source.id
    })
    .then(customer =>
        stripe.charges.create({
            amount,
            description: "Test Donation",
            currency: "usd",
            customer: customer.id
        }))
    .then(charge => res.send(charge))
    .then({
        // Save to the database
    })
    .catch(err => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
    });
});


app.listen(3001, function () {
    console.log("App listening on port 3001");
});
