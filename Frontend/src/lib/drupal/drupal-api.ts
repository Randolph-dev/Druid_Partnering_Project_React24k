import axios from "axios";

// this default url should return everything exported by json api
const drupalUrl: string = "http://127.0.0.1:51604/api/";

const fetchAllFromDrupal = async () => {
  const res = await axios.get(drupalUrl);
  console.log(res.data);
}

export default fetchAllFromDrupal;