const express = require('express');
const app = express();
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
var AWS = require("aws-sdk");

const ServerConstants = require("./constants");

const ourStripeSecretKey = ServerConstants.STRIPE_TEST_MODE ? ServerConstants.STRIPE_SK_TEST : ServerConstants.STRIPE_SK_PROD;
const stripe = require("stripe")(ourStripeSecretKey);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

AWS.config.update({
    region: "us-east-1",
});

app.get("/api/donations/list/", function (req, res) {

    var docClient = new AWS.DynamoDB.DocumentClient();

    var return_data = [];
    var donation_count = 0;
    var total_amount = 0.00;

    var params = {
        TableName : "Donations",
        ProjectionExpression: "donation_amount, fullname, message, showname, created",
    };

    docClient.scan(params, function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            //console.log(data.Items);
            data.Items.forEach(donation => {
                var our_data = {
                    name: donation.showname === 'public' ? donation.fullname : "Anonymous",
                    amount: donation.donation_amount,
                    message: donation.message,
                    created: donation.created
                };

                total_amount += parseFloat(donation.donation_amount);
                donation_count++;

                return_data.push(our_data);

            });

            var final_return = {
                total_amount: total_amount,
                donations_count: donation_count,
                donations: return_data
            };

            res.send(final_return);
        }
    });
});


app.post("/api/donations/new/", (req, res) => {

    // Convert the charge amount from a float to integer in cents
    let amount = parseInt(parseFloat(req.body.amount) * 100);

    stripe.customers.create({
        email: req.body.emailaddress,
        card: req.body.source.id
    })
    .then(customer =>
        stripe.charges.create({
            amount,
            description: "Donation",
            currency: "usd",
            customer: customer.id
    }))
    .then(charge => {
        res.send(charge);

        console.log(charge);
        var docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
        var params = {
            TableName: "Donations",
            Item: {
                "donation_id" : uuidv1(),
                "fullname" : req.body.fullname,
                "email" : req.body.emailaddress,
                "stripe_charge" : charge,
                "stripe_status" : charge.status,
                "donation_amount" : parseFloat(req.body.amount_donation),
                "charge_amount": parseFloat(req.body.amount),
                "donation_stripe_fees" : null,
                "created" : moment.unix(charge.created).format(),
                "message" : req.body.personalMessage,
                "showname" : req.body.showName
            }
        };
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });
    })
    .catch(err => {
        console.log("Error:", err);
        res.send({error: err.message});
    });
});


app.listen(3001, function () {
    console.log("Fundraiser Server listening on port 3001");
});
