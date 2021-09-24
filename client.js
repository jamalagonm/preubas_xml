'use strict'

const soap = require('soap')
const wsdlUrl = 'http://www.chemspider.com/MassSpecAPI.asmx?WSDL'
var args = {name: "Get"}

// passing in overridePromiseSuffix because some of the endpoints end
// with "Async" which breaks promisify.
let asincronico = soap.createClientAsync(wsdlUrl, {overridePromiseSuffix: 'Promise'})
  .then(client => {
    client.GetDatabasesPromise({})
      .then(results => {
        console.log(client.lastRequest)
        // results is an array with only one item which then has an array called "string".
        const databases = results[0].GetDatabasesResult.string
      })
      .catch(err => console(err));
  })

let sincronico = soap.createClient(wsdlUrl, function(err, client) {
  if (err) console.error(err);
  else {
    client.GetDatabases(args, function(err, response) {
      if (err) console.error(err);
      else {
        console.log(response.GetDatabasesResult);
        console.log(client.lastRequest)
        //res.send(response);
      }
    });
  }
});
  

console.log(sincronico);
console.log(asincronico);
