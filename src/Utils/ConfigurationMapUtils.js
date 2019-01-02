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
}

export default ConfigurationMapUtils