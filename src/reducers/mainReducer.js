import {initialData} from '../actions/mainActions'
import * as mainActions from '../actions/mainActions';

const mainReducer = (state = initialData.INITIAL_STATE, action) => {
  switch (action.type) {
    case mainActions.OPEN_RELEVANT_RECIPE:
      console.log("mmhmm");
    case mainActions.INITIALIZE_CONFIGURATION_DATA_MAP:
      return Object.assign({}, state, {
        ...state,
        configurationsMap: action.configurationsMap,
        jsonSchemaAndDefaults: action.jsonSchemaAndDefaults
      });
    case mainActions.CHANGE_CURRENT_CONFIGURATION_EDIT:
      return Object.assign({}, state, {
        ...state,
        currentConfiguration: action.configName
      });
    default:
      return state
  }
};

export default mainReducer
