class ServerUtils {

  static checkIfMapIsNotEmpty(arr) {
    try{
    return Object.keys(arr).length>0;}
    catch(err){
      return false;
    }
  }

  static makeStringReadable(string) {
    try{
      let s =string.replace(/([A-Z])/g, ' $1').trim();
      return s.charAt(0).toUpperCase() + s.slice(1);}
    catch(err){
      return string;
    }
  }
  
}

export default ServerUtils