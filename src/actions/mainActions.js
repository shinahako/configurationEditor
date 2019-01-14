import axios from 'axios';
import {properties} from "../properties"
import ConfigurationMapUtils from "../Utils/ConfigurationMapUtils";
import ServerUtils from "../Utils/ServerUtils";

//const axios = require('axios');
axios.defaults.withCredentials = true;
const base_axios = axios.create({
  baseURL: 'http://l-tlv-00313372:3000/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 10000,
  withCredentials: true
});

let nextTodoId = 0;
let initialState = {
  data: {
    "recipes": [
      {
        "id": 1,
        "foodImg": "https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg",
        "title": "Food title goes here",
        "rating": 5,
        "profileImg": "url('http://www.italianmade.com/ca/wp-content/uploads/2015/05/Rob-Gentile-Buca.jpg')"
      },
      {
        "id": 2,
        "foodImg": "https://drop.ndtv.com/albums/COOKS/corngallery/creolespicedcornthumb_640x480.jpg",
        "title": "Food title goes here",
        "rating": 4,
        "profileImg": "url('http://www.acfindy.org/wp-content/uploads/2013/04/rsz_chef_liz_pictures2015-240x300.jpg')"
      },
      {
        "id": 3,
        "foodImg": "https://cdn.jamieoliver.com/home/wp-content/uploads/2016/06/2.jpg",
        "title": "Food title goes here",
        "rating": 3,
        "profileImg": "url('https://oldtowncrier.files.wordpress.com/2017/01/chef-special-2-17-margaret.jpg')"
      },
      {
        "id": 4,
        "foodImg": "https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg",
        "title": "Food title goes here",
        "rating": 4,
        "profileImg": "url('http://www.italianmade.com/ca/wp-content/uploads/2015/05/Rob-Gentile-Buca.jpg')"
      }
    ]
  },
  configurationsMap: [],
  jsonSchemaAndDefaults: [],
  currentActiveConfiguration: {
    configGroupName: "",
    configName: "",
    index: null,
    editingIsOn: false
  },
  currentEtl: "",
  currentStateOfData: properties.initialCurrentStateOfData,
  orderChangerConfig: {
    changeOrderModeIsOn: false,
    configGroupName: "",
    configName: "",
    currentIndex: null
  },
  addNewConfig: {
    isAddNewConfigOn: false,
    configGroupName: ""
  },
  preLoaders: {
    isEtlLoading: false
  },
  errorHandel: {
    hasErrorOccurred: false,
    errorMessage: ""
  },
  modifiedConfigs: {}
};

export const initialData = {
  INITIAL_STATE: initialState
};

export const OPEN_RELEVANT_RECIPE = 'OPEN_RELEVANT_RECIPE';
export const openRelevantRecipe = (recipeId) => ({
  type: OPEN_RELEVANT_RECIPE,
  recipeId
});

export const INITIALIZE_CONFIGURATION_DATA_MAP = 'INITIALIZE_CONFIGURATION_DATA_MAP';
export const initializeConfigurationDataMap = (configurationsMap,
    jsonSchemaAndDefaults) => ({
  type: INITIALIZE_CONFIGURATION_DATA_MAP,
  configurationsMap,
  jsonSchemaAndDefaults
});

export const SET_CONFIGURATIONS_MAP = 'SET_CONFIGURATIONS_MAP';
export const setConfigurationsMap = (configurationsMap) => ({
  type: SET_CONFIGURATIONS_MAP,
  configurationsMap
});

export const CHANGE_CURRENT_ACTIVE_CONFIGURATION = 'CHANGE_CURRENT_ACTIVE_CONFIGURATION';
export const changeCurrentActiveConfiguration = (configGroupName, configName,
    index, editingIsOn, jsonSchema, defaultConfig) => (
    {
      type: CHANGE_CURRENT_ACTIVE_CONFIGURATION,
      configGroupName,
      configName,
      index,
      editingIsOn,
      jsonSchema,
      defaultConfig
    });

export const CHANGE_CURRENT_ETL = 'CHANGE_CURRENT_ETL';
export const changeCurrentEtl = (newEtl) => (
    {
      type: CHANGE_CURRENT_ETL,
      newEtl
    });

export const SAVE_CURRENT_STATE_OF_DATA = 'SAVE_CURRENT_STATE_OF_DATA';
export const saveCurrentStateOfData = (newStateOfData) => (
    {
      type: SAVE_CURRENT_STATE_OF_DATA,
      newStateOfData
    });

export const UPDATE_CURRENT_STATE_OF_DATA_AND_CONFIGURATION_MAP = 'UPDATE_CURRENT_STATE_OF_DATA_AND_CONFIGURATION_MAP';
export const saveCurrentStateOfDataAndConfigMap = (newStateOfData,
    configurationsMap) => (
    {
      type: UPDATE_CURRENT_STATE_OF_DATA_AND_CONFIGURATION_MAP,
      newStateOfData,
      configurationsMap
    });

export const ORDER_CHANGER_CONFIG = 'ORDER_CHANGER_CONFIG';
export const orderChangerConfig = (changeOrderModeIsOn,
    configGroupName, configName, currentIndex) => (
    {
      type: ORDER_CHANGER_CONFIG,
      changeOrderModeIsOn,
      configGroupName,
      configName,
      currentIndex
    });

export const CHANGE_ORDER_MODE_IS_ON = 'CHANGE_ORDER_MODE_IS_ON';
export const setIfChangeOrderModeIsOn = (isChangeOrderModeOn) => (
    {
      type: CHANGE_ORDER_MODE_IS_ON,
      isChangeOrderModeOn
    });

export const ADD_NEW_CONFIG = 'ADD_NEW_CONFIG';
export const addNewConfig = (isAddNewConfigOn, configGroupName) => (
    {
      type: ADD_NEW_CONFIG,
      isAddNewConfigOn,
      configGroupName
    });

export const SET_IS_ETL_LOADING = 'SET_IS_ETL_LOADING';
export const setIfEtlIsLoading = (isEtlLoading) => (
    {
      type: SET_IS_ETL_LOADING,
      isEtlLoading
    });

export const SET_ERROR = 'SET_ERROR';
export const setError = (hasErrorOccurred, errorMessage) => (
    {
      type: SET_ERROR,
      hasErrorOccurred: hasErrorOccurred,
      errorMessage
    });

export const SET_MODIFIED_CONFIGS = 'SET_MODIFIED_CONFIGS';
export const setModifiedConfigs = (modifiedConfig) => (
    {
      type: SET_MODIFIED_CONFIGS,
      modifiedConfig: modifiedConfig
    });

export const initializeConfigurationToSchemaMap = () => {

};

export const fetchData = (etlName) => {
  return (dispatch) => {
    let currentStateOfData = {
      "catalog": "string",
      "creationDate": null,
      "description": "string",
      "etlName": "string",
      "lastUpdateDate": "2019-01-02T10:29:09.819Z",
      "locale": "string",
      "status": "string",
      "updatedBy": "string",
      "versionId": "string"
    };

    if (!etlName || etlName === "" || typeof etlName === 'undefined') {
      let etlDataLocal = [];
      let configurationsMap = [];
      dispatch(initializeConfigurationDataMap(etlDataLocal,
          configurationsMap));
      dispatch(initializeCurrentStateOfData(etlDataLocal, configurationsMap,
          currentStateOfData));
    }

    else {
      let etlNameWithoutSpaces = etlName.split(' ').join('%20');
      return ServerUtils.getDataFromApi(properties.etlLink
          + etlNameWithoutSpaces)
      .then(etlData => {
        let configurationsMap = [];
        let jsonSchemaAndDefaults = [];
        let dictionaryLinksArray = [];

        if (etlData != null) {
          dictionaryLinksArray = ConfigurationMapUtils.getAllConfigurationGroups(
              etlData.data.entity, configurationsMap);
          getAllDictionary(dictionaryLinksArray.linksArray).then(dictionary => {
            createAMapOfJsonSchemaAndDefaults(dictionaryLinksArray, dictionary,
                jsonSchemaAndDefaults);
            currentStateOfData = dispatch(
                initializeCurrentStateOfData(configurationsMap,
                    currentStateOfData));
            console.log("!!!!configurationsMap", configurationsMap);
            console.log("!!!!jsonSchemaAndDefaults", jsonSchemaAndDefaults);
            console.log("!!!!currentStateOfData", currentStateOfData);
            dispatch(initializeConfigurationDataMap(configurationsMap,
                jsonSchemaAndDefaults));
            dispatch(saveCurrentStateOfData(currentStateOfData));
          });

        }
        dispatch(setIfEtlIsLoading(false));
      })
      .catch(error => {
        dispatch(initializeConfigurationDataMap([],
            []));
        dispatch(setIfEtlIsLoading(false));
      });
    }
  };
};

export const addNewModifiedConfig = (configGroupName, configName,index,
    modifiedConfig) => {
  return (dispatch) => {
    modifiedConfig[configGroupName + configName + index] = [];
    dispatch(setModifiedConfigs(modifiedConfig));
  }
};

export const initializeCurrentStateOfData = (configurationsMap,
    currentStateOfData) => {
  return (dispatch) => {
    for (let configGroup in configurationsMap) {
      currentStateOfData[configGroup] = configurationsMap[configGroup];
    }
    return currentStateOfData;
  }
};

function createAMapOfJsonSchemaAndDefaults(dictionaryLinksArray, dictionaryArr,
    jsonSchemaAndDefaults) {
  let configurationGroupNamesArr = dictionaryLinksArray.groupNames;
  if (dictionaryArr != null) {
    for (let dicIndex = 0; dicIndex < dictionaryArr.length; dicIndex++) {
      if (dictionaryArr[dicIndex] != null && dictionaryArr[dicIndex].data
          != null && dictionaryArr[dicIndex].data.entity != null) {
        let configurationGroupName = configurationGroupNamesArr[dicIndex];
        jsonSchemaAndDefaults[configurationGroupName] = [];
        let dicEntity = dictionaryArr[dicIndex].data.entity;
        for (let i = 0; i < dicEntity.length; i++) {
          jsonSchemaAndDefaults[configurationGroupName][dicEntity[i]["elementName"]] = [];
          jsonSchemaAndDefaults[configurationGroupName][dicEntity[i]["elementName"]]["defaultSettings"] = "";
          jsonSchemaAndDefaults[configurationGroupName][dicEntity[i]["elementName"]]["jsonSchema"] = "";
          for (let index in dicEntity[i]["links"]) {
            if (dicEntity[i]["links"][index].rel === "Default Settings") {
              jsonSchemaAndDefaults[configurationGroupName][dicEntity[i]["elementName"]]["defaultSettings"] = dicEntity[i]["links"][index].href;
            }
            else if (dicEntity[i]["links"][index].rel
                === "Default Settings JSON Schema") {
              jsonSchemaAndDefaults[configurationGroupName][dicEntity[i]["elementName"]]["jsonSchema"] = dicEntity[i]["links"][index].href;

            }
          }
        }
      }
    }
  }
}

function getAllDictionary(dictionaryLinksArray) {
  //let linksArr = properties.dictionaryData.dictionaryUrls;
  return axios.all(dictionaryLinksArray.map(l => ServerUtils.getDataFromApi(l)))
  .then(axios.spread(function (...res) {
    return res;
  }));
}

export const changeOrder = (configGroup, configNameToChange, currentStateOfData,
    newIndex, oldIndex) => {
  return (dispatch) => {
    if (configGroup && configNameToChange) {
      dispatch(saveToCurrentState(currentStateOfData));
      let configurationGroup = currentStateOfData[configGroup];
      if (configurationGroup !== null) {
        ConfigurationMapUtils.arrayMove(configurationGroup.configuration,
            newIndex, oldIndex);
        dispatch(orderChangerConfig(true,
            configGroup, configNameToChange, newIndex));

      }
    }
  }
};

export const saveToCurrentState = (currentStateOfDataTemp) => {
  return (dispatch) => {
    let configurationsMap = [];
    ConfigurationMapUtils.getAllConfigurationGroups(currentStateOfDataTemp,
        configurationsMap);
    dispatch(saveCurrentStateOfDataAndConfigMap(currentStateOfDataTemp,
        configurationsMap));
  }
};

export const changeConfig = (configGroup, configNameToChange, configSettings,
    currentStateOfData, index) => {
  return (dispatch) => {
    let currentStateOfDataTemp = currentStateOfData;
    if (currentStateOfDataTemp[configGroup] !== null) {
      let configurationGroup = currentStateOfDataTemp[configGroup];
      if (configurationGroup.configuration.length > 0) {
        if (configurationGroup.configuration[index] != null) {
          if (configurationGroup.configuration[index].elementName
              === configNameToChange) {
            configurationGroup.configuration[index].elementSetting = configSettings;
            dispatch(saveToCurrentState(currentStateOfDataTemp));
          }
        }
      }
    }
  }
};

export const createNewConfig = (configGroup, configNameToAdd, configSettings,
    currentStateOfData) => {
  return (dispatch) => {
    if (configNameToAdd !== null && configGroup !== null) {
      let configurationGroup = currentStateOfData[configGroup];
      let index = configurationGroup.configuration.length;
      configurationGroup.configuration[index] = {
        "elementName": "",
        "elementSetting": {}
      };
      configurationGroup.configuration[index].elementName = configNameToAdd;
      configurationGroup.configuration[index].elementSetting = configSettings;
      dispatch(saveToCurrentState(currentStateOfData));
    }
  }
};

export const removeConfig = (configGroup, index, currentStateOfData) => {
  return (dispatch) => {
    if (index !== null && configGroup !== null) {
      let configurationGroup = currentStateOfData[configGroup];
      configurationGroup.configuration.splice(index, 1);
      dispatch(saveCurrentStateOfData(currentStateOfData));
      let configurationsMap = [];
      ConfigurationMapUtils.getAllConfigurationGroups(currentStateOfData,
          configurationsMap);
      dispatch(setConfigurationsMap(configurationsMap));
    }
  }
};

export const postNewConfiguration = (currentStateOfData) => {
  return (dispatch) => {
    return axios.post(
        properties.saveUrl,
        currentStateOfData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};


