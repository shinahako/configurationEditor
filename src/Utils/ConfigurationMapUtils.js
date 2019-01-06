class ConfigurationMapUtils {

  static getAllConfigurationGroups(etlData, configurationsMap) {
      if (etlData!= null) {
        let dictionaryLinksArray=[];
        for (let key in etlData) {
          if (key.includes("Configuration")) {
            configurationsMap[key] = etlData[key].configuration;
            for(let link in etlData[key].links)
            if(link.rel==="Dictionary")
              {dictionaryLinksArray.push(link.href);}
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