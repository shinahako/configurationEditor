class ConfigurationMapUtils {

  static getAllConfigurationGroups(etlData, configurationsMap) {
    if (etlData != null) {
      let groupNames = [];
      let linksArray = [];
      let dictionaryLinksArrayAndNames = {};
      for (let key in etlData) {
        if (key.includes("Configuration")) {

          configurationsMap[key] = etlData[key].configuration;
          for (let index in etlData[key].links) {
            if (etlData[key].links[index].rel === "Dictionary") {
              groupNames.push(key);
              linksArray.push(etlData[key].links[index].href);
            }
          }
        }
      }
      dictionaryLinksArrayAndNames["groupNames"] = groupNames;
      dictionaryLinksArrayAndNames["linksArray"] = linksArray;
      return dictionaryLinksArrayAndNames;
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