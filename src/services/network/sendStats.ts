import axios from "axios";
import { URL } from "../../constants";
import { LocalStorage } from "../data/LocalStorage";

export const sendStats = async (stats: any[], storageManager: LocalStorage) => {
  const userToken: string = storageManager.getValue("getHiredToken");
  const options = { headers: {'userKey': userToken} };
  const config = { statistics: stats }

  if(!storageManager.getValue("getHiredUserId")){
    await axios.get('https://ms-plugins.herokuapp.com/api/v1/users', options)
    .then(function (response) {
      storageManager.setValue("getHiredUserId", response.data._id)
    })
    .catch(function (error) {
      console.log('Error sending data: ', error);
    })
    .then(function () {
      // console.log("Process already finished")
    });
  }
  const response = await axios.put(
    URL.replace("{userId}", storageManager.getValue("getHiredUserId")),
    config,
    options
  )

  if(response.status === 200){
    storageManager.setValue("getHiredLan", [])
  }
};
