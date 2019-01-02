import {
  CHANGE_CURRENT_CONFIGURATION_EDIT,
  initialData
} from '../actions/mainActions'
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
        currentActiveConfiguration: action.configName
      });
    case mainActions.CHANGE_CURRENT_ETL:
      return Object.assign({}, state, {
        ...state,
        currentEtl: action.newEtl
      });
    case mainActions.SAVE_CURRENT_STATE_OF_DATA:
      return Object.assign({}, state, {
        ...state,
        currentStateOfData: action.newStateOfData
      });
    case mainActions.CHANGE_ORDER_MODE_IS_ON:
      return Object.assign({}, state, {
        ...state,
        changeOrderModeIsOn: action.isChangeOrderModeOn
      });
    case mainActions.ORDER_CHANGER_CONFIG:
      return Object.assign({}, state, {
        ...state,
        orderChangerConfig: {
          changeOrderModeIsOn: action.changeOrderModeIsOn,
          configGroupName: action.configGroupName,
          configName: action.configName,
          currentIndex: action.currentIndex
        }

      });
    case mainActions.SET_CONFIGURATIONS_MAP:
      return Object.assign({}, state, {
        ...state,
        configurationsMap: action.configurationsMap
      });    
      case mainActions.SAVE_CHANGES_TO_ORIGINAL_DATA:
        debugger;
      return Object.assign({}, state, {
        ...state,
        originalStateOfData: action.currentStateOfData
      });
    case mainActions.CANCEL_CHANGES_TO_ORIGINAL_DATA:
      debugger;
      return Object.assign({}, state, {
        ...state,
        currentStateOfData: action.originalStateOfData,
        orderChangerConfig:{
          changeOrderModeIsOn: false,
          configGroupName:"",
          configName:"",
          currentIndex:null
        }
      });
    default:
      return state
  }
};

export default mainReducer
