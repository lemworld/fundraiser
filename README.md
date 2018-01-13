# Fundraiser

Fundraiser is a platform to raise funds with an easy and beautiful interface. The only fees are those you pay to Stripe.

It is built with React, Express, and Node. Currently, data is stored in DynamoDB but could easily be adapted to any NoSQL platform that accepts JSON documents (like MongoDB). With some minor re-writes, it could use MySQL.

> This project is still in active development, so there will be many updates and possibly breaking changes to come

## Purpose and Features

In short, I needed a way to raise funds for an important cause without paying more than I had to in fees. With Fundraiser, you pay only the Stripe fees (currently 2.9% + 30&cent; per transaction).

### Features

* A beautiful space to tell your story
* Highlight your donors, either by name or anonymously
* Clearly detail fees
* Super fast and responsive design
* Handles payments via [Stripe](https://stripe.com/)
* Easy social sharing
* Open source, so adapt it to your needs


### Background

In August 2017, a family member approached me to talk fundraising. They had established a college fund for a very special family, and wanted a way to accept donations from others.

Platforms like [Kickstarter](https://www.kickstarter.com/), [Indiegogo](https://www.indiegogo.com/), and [everydayhero](https://www.everydayhero.com/) are great for attracting attention to important campaigns, but they charge high fees. Including credit processing fees, they both charge around 8%. That money goes toward supporting the platform, and not the cause. And that's fine if raising funds for a for-profit venture, but my mission is non-profit.

Then come the do-it-yourself options. There are many HTML templates out there, some free and others not. However, they lack any behind-the-scenes logic to actually handle donations. Adding a PayPal button is easy, but that doesn't allow donors to track campaign progress.

It is for all of these reasons I created Fundraiser.

It's entirely open source and yours to use as you wish. I think it's also an example of how easy it can be to develop cool, interactive stuff in React.

I hope you find it useful, and I hope you will consider [contributing](#Contributing) to the project as well.


## Getting Started

### Prerequisites

* Node 6.11.0 (might work on older versions, but untested)
* NPM 3.10.10
* Amazon DynamoDB instance, with IAM role configured and credentials added to `~/.aws/credentials`

### Step-by-Step

1. Clone the Fundraiser repository from GitHub, change to the new directory, and install required dependencies (for both client and server)
```bash
git clone git@github.com:lemworld/fundraiser.git
cd fundraiser/
npm install
cd server/
npm install
cd ../
```

2. You'll need to edit the constants file for each client and server, substituting your own values. Start off by copying the example constants files:
```bash
cp src/constants-example.js src/constants.js
cp server/constants-example.js server/constants.js
```

3. Open the **client** constants file in your favorite text editor (we'll use `nano` here)
```bash
nano src/constants.js
```
Substitute your own Stripe credentials and server address here
```js
const AppConstants = {
    STRIPE_PK_TEST: "pk_test_yourtestpublishablekey",
    STRIPE_PK_PROD: "pk_yourprodpublishablekey",
    STRIPE_TEST_MODE: true, // Set this to false to stop using the Stripe testing environment
    PAYMENT_SERVER_URL: "http://localhost:3001"
};
```
There are several other strings in this file you can edit to customize the site for your needs.

4. Open the **server** constants file in your favorite text editor
```bash
nano server/constants.js
```
Substitute your own Stripe credentials and server address here
```js
const ServerConstants = {
    STRIPE_PK_TEST: "pk_test_yourtestpublishablekey",
    STRIPE_SK_TEST: "sk_test_yourtestsecretkey",
    STRIPE_PK_PROD: "pk_yourprodpublishablekey",
    STRIPE_SK_PROD: "sk_yourprodsecretkey",
    STRIPE_TEST_MODE: true, // Set this to false to stop using the Stripe testing environment
    PAYMENT_SERVER_URL: "http://localhost:3001"
};
```

5. Run the `create-table` script to create the Donations table in DynamoDB. If you run into any authentication errors, make sure you have your IAM credentials in `~/.aws/credentials`.
```bash
node server/create-table.js
```

6. Launch both client and server with one command (we use Concurrently to make this happen)
```bash
npm start
```

## Technology

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Todo List

It would be nice to build the following, to help future-proof Fundraiser and make it easier for anyone to deploy.

* Admin interface, make it easier to:
    * Set Stripe credentials
    * Change the headline, story, and other text elements
    * Manage donations (add, edit, delete)
    * Manually add offline donations (e.g. check, cash)
* Dynamically generate social media-related META tags
* Add paging for the donations list when it grows beyond a certain length
* Photo carousel or album at the top for displaying multiple photos
* Create an area to add any required legal disclosures
* Add to README any links to actual production uses of Fundraiser


## Contributing

Please send in your PRs!
