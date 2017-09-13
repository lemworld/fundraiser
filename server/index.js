const express = require('express');
const app = express();
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
});


app.get("/api/", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json("Hello World!");
});

app.get("/api/donors/", function (req, res) {

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

app.listen(3001, function () {
    console.log("App listening on port 3001");
});
