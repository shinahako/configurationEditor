import axios from 'axios';

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
  }
};
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
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
export const initializeConfigurationDataMap = (configurationMap) => ({
  type: OPEN_RELEVANT_RECIPE,
  configurationMap
});

/*
export const selectOrder = (id, selectedTab) => {
  return {
    type: SELECT_ORDER,
    id,
    selectedTab
  }
};*/

export const fetchData = () => {
  return (dispatch) => {
    return axios.all([getDataOfEtl(), getDictionary()])
    .then(axios.spread(function (etlData, dictionary) {

      console.log("etlData", etlData);
      console.log("dictionary", dictionary);

      // Both requests are now complete

      let configToSchemaMap = [];
      if (etlData != null) {
        if (etlData.data.entity != null) {
          for (let key in etlData.data.entity) {
            if (key.includes("Configuration")) {
              configToSchemaMap[key] = etlData.data.entity[key];
            }
          }
        }
      }
      dispatch(initializeConfigurationDataMap(configToSchemaMap));
    }))
    .catch(error => {
      throw(error);
    });
  };
};

export function createConfigToSchemaMap(etlName) {
  axios.all([getDataOfEtl(), getDictionary()])
  .then(axios.spread(function (etlData, dictionary) {

    console.log("etlData", etlData);
    console.log("dictionary", dictionary);

    // Both requests are now complete

    let configToSchemaMap = [];
    if (etlData != null) {
      if (etlData.data.entity != null) {
        for (let key in etlData.data.entity) {
          if (key.includes("Configuration")) {
            configToSchemaMap[key] = etlData.data.entity[key];
          }
        }
      }
    }
    return configToSchemaMap;
  }));

  return configToSchemaMap;

  /*
  let configToSchemaMap = [];
  configToSchemaMap = getDataOfEtl(etlName).then((resEtl) => {
    if (resEtl != null) {
      if (resEtl.entity != null) {
        for (let key in resEtl.entity) {
          if (key.includes("Configuration")) {
            configToSchemaMap[key] = resEtl.entity[key];
          }
        }
      }
    }
    return configToSchemaMap;
    console.log("configToSchemaMap", configToSchemaMap);
  }).catch(err => console.log("Axios err: ", err));
  
*/
  /*  axios.get("http://etlexporter.vip.qa.ebay.com/v1/enrichers/getAll").then(
        res => {
          if (res.data.entity != null) {
            for (var k in res.data.entity) {
              //console.log(res.data.entity[k].enricherName)
  
            }
          }
        }, err => {
          alert("Server rejected response with: " + err);
        });*/
  /*
    return configToSchemaMap;*/
}

function getDataOfEtl() {
  let etlName = "Comics%20US";
  return axios.get("http://etlexporter.vip.qa.ebay.com/v1/configuration/getActive?etlName="
      + etlName);
}

function getDictionary() {
  return axios.get("http://etlexporter.vip.qa.ebay.com/v1/enrichers/getAll");
}
