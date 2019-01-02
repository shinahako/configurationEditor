import axios from 'axios';
import {properties} from "../properties";
import {saveCurrentStateOfData} from "../actions/mainActions";

class ConfigurationMapUtils {

  static getAllConfigurationGroups(etlData, configurationsMap) {
      if (etlData!= null) {
        for (let key in etlData) {
          if (key.includes("Configuration")) {
            configurationsMap[key] = etlData[key];
          }
      }
    }
  }

  static arrayMove(arr, newIndex, oldIndex) {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }
}




export default ConfigurationMapUtils