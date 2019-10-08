//initiallization
var request = require("request");
var axios = require("axios");
var https = require('https');
var webexPack = require('webex');
const config = require("../config.json");
const mongoose = require("mongoose");
const welcomeCard_Employee = require('../adaptivecards/welcomeEmployee.json');
const welcomeCard_Manager = require('../adaptivecards/welcomeManager.json');
const contributionCard_Amount = require('../adaptivecards/contributionAmount.json');
const charityCard_Preference = require('../adaptivecards/charityPreference.json');
const selectCard_CharityName = require('../adaptivecards/selectCharityName.json');
const selectCard_BusinessUnit = require('../adaptivecards/selectBusinessUnit.json');
const thankyouCard_Employee = require('../adaptivecards/thankyouEmployee.json');
const thankyouCard_Manager = require('../adaptivecards/thankyouManager.json');
const Charitycontribution =require('../models/Charity');
const headers = { Authorization: "Bearer " + config.token };
var cardDetails = {
  "amount" : '',
  "charityname":'',
  "textvalid":'',
  "user":'',
  "business_unit":'',
  "email":'',
  "_id":'',
  "date":''
}

//webex connection 
const webex = webexPack.init({
  credentials: {
    access_token: config.token
  }
});

//text 
var textOptions = {
  method: "POST",
  url: "https://api.ciscospark.com/v1/messages",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + config.token
  },
  body: {
    roomId: "",
    text: "" 
  },
  json: true
};

//adaptive card attachment
var cardOptions = {
  method: "POST",
  url: "https://api.ciscospark.com/v1/messages",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + config.token
  },
  body: {
    roomId: "",
    text: "",
    attachments: []
  },
  json: true
};

//passing value to json of thankyouCard_employee
function thankyouCard_Employees(thankyouCard_Employee,key){
  if (thankyouCard_Employee !== null && thankyouCard_Employee !== undefined) {
    Object.keys(thankyouCard_Employee).forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(thankyouCard_Employee, property)) {
        if (property === key) {
          if(thankyouCard_Employee[property]==='Amount :')
              thankyouCard_Employee['value']="$"+cardDetails.amount;
          else if(thankyouCard_Employee[property]==='Charity Name :')
              thankyouCard_Employee['value']=cardDetails.charityname;
        } 
        else if (typeof thankyouCard_Employee[property] === 'object') {
          thankyouCard_Employees(thankyouCard_Employee[property],key);
        }
    }
    });
  }
}
  
//passing value to json of thankyouCard_manager  
function thankyouCard_Managers(thankyouCard_Manager,key){
  if (thankyouCard_Manager !== null && thankyouCard_Manager !== undefined) {
    Object.keys(thankyouCard_Manager).forEach((property) => {
      if (Object.prototype.hasOwnProperty.call(thankyouCard_Manager, property)) {
          if (property === key) {
            if(thankyouCard_Manager[property]==='Amount :')
                thankyouCard_Manager['value']="$"+cardDetails.amount;
          } 
          else if (typeof thankyouCard_Manager[property] === 'object') {
            thankyouCard_Managers(thankyouCard_Manager[property],key);
          }
      }
    });
  }
}

//Card sending function
function sendCard(req, cardContent){
    cardOptions.body.roomId = req.roomId;
    cardOptions.body.attachments = [{
      contentType: "application/vnd.microsoft.card.adaptive",
      content: cardContent
    }];
  
    request(cardOptions, function(error, response, body) {
      basicMessageId=body.id;
      if (error) throw new Error(error);
    });
}
 

module.exports = app => {

//text messages
  app.post("/api/v1/allMessages", (req, res) => {
    console.info("Reached messages node");
    if(req.body.data.personEmail != "CharityBot@webex.bot"){
    cardDetails.email=req.body.data.personEmail;
    console.log(cardDetails.email);
    const url = "https://api.ciscospark.com/v1/messages/" + req.body.data.id
    axios
      .get(url, { headers: headers })
      .then(result => {
        console.log(result.data.text.toLowerCase());
        cardDetails.textvalid=result.data.text;
        switch(result.data.text.toLowerCase()){
          case "hello":
          case "hi":
          case "hey":  
              textOptions.body.text = "Hello!! \nMy name is Charity Bot. \nType “@charity_employee” or “@charity_manager” for my help in donating to a charity.";
              textOptions.body.roomId = result.data.roomId;
              request(textOptions);
              break;
          case "@charity_employee":
          case "charitybot @charity_employee":  
                sendCard(result.data, welcomeCard_Employee);
                setTimeout(()=>{
                    sendCard(result.data, contributionCard_Amount);
                },6000)
                break;
          case "@charity_manager":
          case "charitybot @charity_manager":  
                sendCard(result.data, welcomeCard_Manager);
                setTimeout(()=>{
                    sendCard(result.data, contributionCard_Amount);
                },6000)
                break;
          case "help":
          case "charitybot help":  
          case "@charity_bot":
                webex.messages.create({
                  markdown: "I'm here to help you get stuff done.<br/>Type your choice from below:<br/>1. ***@charity_employee*** for signing in as an Employee.<br/>2. ***@charity_manager*** for signing in as a Manager",
                  roomId: result.data.roomId
                })
                  break;              
          default:
              webex.messages.create({
                markdown: 'Type ***help*** to start.',
                roomId: result.data.roomId
              })  
        }
      });    
    }  
  });

//attachment buttons 
  app.post("/api/v1/attachmentActions", (req, res) => {
    console.info("Reached attachmentActions node");
    const url =
      "https://api.ciscospark.com/v1/attachment/actions/" + req.body.data.id;

    const headers = {
      Authorization: "Bearer " + config.token
    };
    axios
      .get(url, { headers: headers })
      .then(result => {
        console.log(result.data);
        switch (result.data.inputs.buttonId) {
          case "AmountSubmit":
            console.log(cardDetails.textvalid);
            if(cardDetails.textvalid=="@charity_employee" || cardDetails.textvalid=="CharityBot @charity_employee"){
              cardDetails.user="employee";
              cardDetails.amount=result.data.inputs.amount;
              sendCard(result.data,charityCard_Preference)}
            else{
              cardDetails.user="manager";
              cardDetails.amount=result.data.inputs.amount;
              cardDetails.charityname="Will be assigned by us";
              sendCard(result.data, selectCard_BusinessUnit);
            }  
            break;
          case "yesprefer":
              sendCard(result.data, selectCard_CharityName);
              break;
          case "noprefer":
              cardDetails.charityname="Will be assigned by us"
               sendCard(result.data, selectCard_BusinessUnit);
               break;
          case "preferenceCharity":
                cardDetails.charityname=result.data.inputs.select;
                sendCard(result.data, selectCard_BusinessUnit);
              break;
          case "BUselect":
            cardDetails.business_unit=result.data.inputs.bu; 
            cardDetails.date= Date(Date.now()).toString();
            const charitycontribution_storage = new Charitycontribution({
                email: cardDetails.email,
                type_of_contributor: cardDetails.user ,
                business_unit: cardDetails.business_unit ,
                contribution_amount: cardDetails.amount ,
                charity_name: cardDetails.charityname,
                date: cardDetails.date
            });
            charitycontribution_storage.save()
            .then(result => {
                console.log('Data Updated');
            })
            .catch(err => {
                console.log(err);
            });
            if(cardDetails.user=="employee"){
              thankyouCard_Employees(thankyouCard_Employee, 'title');
              sendCard(result.data, thankyouCard_Employee);
            }
            else{
              thankyouCard_Managers(thankyouCard_Manager, 'title');
              sendCard(result.data, thankyouCard_Manager);
            }    
              break;    
        }
      })
      .catch(err => console.log(err));
  });
  
};
