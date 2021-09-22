'use strict'

const soap = require('soap')
const wsdlUrl = 'http://www.chemspider.com/MassSpecAPI.asmx?WSDL'

// passing in overridePromiseSuffix because some of the endpoints end
// with "Async" which breaks promisify.
soap.createClientAsync(wsdlUrl, {overridePromiseSuffix: 'Promise'})
  .then(client => {
    client.GetDatabasesPromise({})
      .then(results => {
        console.log(client.describe());
        console.log(client.lastRequest)
        // results is an array with only one item which then has an array called "string".
        const databases = results[0].GetDatabasesResult.string

        // normally we would do some sort of processing or something.
        //console.dir(databases)
      })
  })