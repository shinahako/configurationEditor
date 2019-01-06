import axios from 'axios';
import {properties} from "../properties"
import ConfigurationMapUtils from "../Utils/ConfigurationMapUtils";

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
  errorHandel:{
    hasErrorOccurred:false,
    errorMessage:""
  }
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
    index, editingIsOn,jsonSchema,defaultConfig) => (
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
export const setError = (hasErrorOccurred,errorMessage) => (
    {
      type: SET_ERROR,
      hasErrorOccurred: hasErrorOccurred,
      errorMessage
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
      return axios.all([getDataOfEtl(etlNameWithoutSpaces), getAllDictionary()])
      .then(axios.spread(function (etlData, dictionary) {
        //let etlDataLocal = getEtlLocal();

        //console.log("etlDataLocal", etlDataLocal);
        // Both requests are now complete

        let configurationsMap = [];
        let jsonSchemaAndDefaults = [];
        if (etlData != null) {
          ConfigurationMapUtils.getAllConfigurationGroups(
              etlData.data.entity, configurationsMap);
        }
        createAMapOfJsonSchemaAndDefaults(dictionary, jsonSchemaAndDefaults);
        currentStateOfData = dispatch(initializeCurrentStateOfData(configurationsMap,
            currentStateOfData));

        console.log("!!!!configurationsMap", configurationsMap);
        console.log("!!!!jsonSchemaAndDefaults", jsonSchemaAndDefaults);
  
        console.log("!!!!currentStateOfData", currentStateOfData);
        dispatch(initializeConfigurationDataMap(configurationsMap,
            jsonSchemaAndDefaults));
        dispatch(saveCurrentStateOfData(currentStateOfData));
        dispatch(setIfEtlIsLoading(false));
      }))
      .catch(error => {
        dispatch(initializeConfigurationDataMap([],
            []));
        dispatch(setIfEtlIsLoading(false));
      });
    }
  };
};

export const  initializeCurrentStateOfData = (configurationsMap, currentStateOfData) =>{
  return (dispatch) => {
    for (let configGroup in configurationsMap) {
      currentStateOfData[configGroup] = configurationsMap[configGroup];
    }
    return currentStateOfData;
  }
};

function createAMapOfJsonSchemaAndDefaults(dictionaryArr,
    jsonSchemaAndDefaults) {
  let configurationGroupNamesArr = properties.dictionaryData.configurationGroupNames;
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


function getDataFromApi(link) {
  return axios.get(link)
  .then(response => {
    return response;
  })
}

function getDataOfEtl(etlName) {
  return axios.get(properties.etlLink
      + etlName);
}

function getAllDictionary() {
  let linksArr = properties.dictionaryData.dictionaryUrls;
  return axios.all(linksArr.map(l => axios.get(l)))
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
        ConfigurationMapUtils.arrayMove(configurationGroup, newIndex, oldIndex);
        dispatch(orderChangerConfig(true,
            configGroup, configNameToChange, newIndex));

      }
    }
  }
};

export const saveToCurrentState = (currentStateOfData) => {
  return (dispatch) => {
    dispatch(saveCurrentStateOfData(currentStateOfData));
    let configurationsMap = [];
    ConfigurationMapUtils.getAllConfigurationGroups(currentStateOfData,
        configurationsMap);
    dispatch(setConfigurationsMap(configurationsMap));
  }
};

export const changeConfig = (configGroup, configNameToChange, configSettings,
    currentStateOfData, index) => {
  return (dispatch) => {
    if (currentStateOfData[configGroup] !== null) {
      let configurationGroup = currentStateOfData[configGroup];
      if (configurationGroup.length > 0) {
        if (configurationGroup[index] != null) {
          if (configurationGroup[index].elementName === configNameToChange) {
            configurationGroup[index].elementSettings = configSettings;
            dispatch(saveCurrentStateOfData(currentStateOfData));
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
      let index = configurationGroup.length;
      configurationGroup[index] = {
        "elementName": "",
        "settings": {}
      };
      configurationGroup[index].elementName = configNameToAdd;
      configurationGroup[index].elementSettings = configSettings;
      dispatch(saveCurrentStateOfData(currentStateOfData));
      let configurationsMap = [];
      ConfigurationMapUtils.getAllConfigurationGroups(currentStateOfData,
          configurationsMap);
      dispatch(setConfigurationsMap(configurationsMap));
    }
  }
};


export const removeConfig = (configGroup, configNameToAdd, configSettings,
    currentStateOfData) => {
  return (dispatch) => {
    if (configNameToAdd !== null && configGroup !== null) {
      let configurationGroup = currentStateOfData[configGroup];
      let index = configurationGroup.length;
      configurationGroup[index] = {
        "elementName": "",
        "settings": {}
      };
      configurationGroup[index].elementName = configNameToAdd;
      configurationGroup[index].elementSettings = configSettings;
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
    debugger;
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

