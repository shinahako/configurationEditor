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
  
}
export default ServerUtils