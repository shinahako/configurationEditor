/* properties.js */

export const properties = {
  configurationJsonFieldContains: "Configuration",
  dictionaryData: {
    configurationGroupNames: ["enricherConfigurations",
      "validatorConfigurations"],
    dictionaryUrls: ["http://etlexporter.vip.qa.ebay.com/v1/enrichers/getAll",
      "http://etlexporter.vip.qa.ebay.com/v1/validators/getAll"
    ]
  },
  
  saveUrl: "http://d-tlv-13004852:8010/v1/configuration/save",
  etlLink: "http://etlexporter.vip.qa.ebay.com/v1/configuration/getActive?etlName=",
  initialCurrentStateOfData: {
    "catalog": "string",
    "creationDate": null,
    "description": "string",
    "dispatcherConfiguration": {
      "dispatcherSettings": {},
      "dispatcherType": "CRUD"
    },
    "enricherConfigurations": [],
    "etlName": "string",
    "lastUpdateDate": "2019-01-02T10:29:09.819Z",
    "locale": "string",
    "readerConfiguration": {},
    "status": "string",
    "updatedBy": "string",
    "validatorConfigurations": [],
    "versionId": "string"
  }

};

/*

for(var k in i.entity){ if(k.contains("Configuration")) console.log(k)}*/
//http://d-tlv-13004852:8010/v1/configuration/getActive?etlName=Comics%20US