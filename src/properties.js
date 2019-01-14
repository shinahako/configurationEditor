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

  saveUrl: "http://etlexporter.vip.qa.ebay.com/v1/configuration/save",
  etlLink: "http://etlexporter.vip.qa.ebay.com/v1/configuration/getActive?etlName=",
  getAllEtls: "http://etlexporter.vip.qa.ebay.com/v1/configuration/getAllEtls",
  initialCurrentStateOfData: {
    "catalog": "string",
    "creationDate": null,
    "description": "string",
    "dispatcherConfiguration": {
      "dispatcherSettings": {},
      "dispatcherType": "CRUD"
    },
    "enricherConfigurations": {"links": [], "configuration": []},
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