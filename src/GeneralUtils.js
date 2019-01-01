class GeneralUtils {

  static checkIfMapIsNotEmpty(arr) {
    try{
    return Object.keys(arr).length>0;}
    catch(err){
      return false;
    }
  }
  
}

export default GeneralUtils