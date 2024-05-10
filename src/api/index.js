import axios from "axios";
import conexion from "./conexion"

class api {
  static get_login = (params) => axios.get(conexion.urlLocal + `login`, {params}, conexion.headers);
}

export default api;
