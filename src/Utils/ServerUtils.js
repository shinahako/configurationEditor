import axios from "axios/index";

class ServerUtils {

  static getDataFromApi(link) {
    return axios.get("/getData", {
      params: {
        url: link
      }
    })
    .then(response => {
      return response;
    })
  }

  static postDataToApi(link, param) {
    return axios.post("/postData", {
      params: {
        url: link,
        param: param
      }
    })
    .then(response => {
      return response;
    })
  }

}

export default ServerUtils