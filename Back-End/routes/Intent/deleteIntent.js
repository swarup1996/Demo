const express = require('express');
const router = express.Router();
const credentials = require ('../../Cred');
const {Intent} = require('../../APIDB/sequelize');


async function deleteIntent(req,res) {
  // [START dialogflow_delete_intent]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');
  console.log("request is",req.body);
  Intent.findOne ({
      where : {
        
        displayName : req.body.displayName

      },

   //   raw:true

    }).then(async function(results) {
        console.log("my resullllltsss are", results);
    IntentId = results[0].intentId; 

// Instantiates clients
const intentsClient = new dialogflow.IntentsClient(credentials.config);

const intentPath = intentsClient.intentPath(credentials.project_id, IntentId);

const request = {name: intentPath};

// Send the request for deleting the intent.
const result = await intentsClient.deleteIntent(request);
console.log(`Intent ${intentPath} deleted`);
Intent.destroy({
  where: {
      IntentId : IntentId
  }
})
// [END dialogflow_delete_intent]
const responsetouser = intentPath;
let respData = {
  data: responsetouser
};
res.send(respData);
    })
  

} 

module.exports = {
  deleteIntent : deleteIntent
}

