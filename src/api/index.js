import axios from "axios";
import conexion from "./conexion"

class api {
  static get_login = (params) => axios.get(conexion.urlLocal + `login`, {params}, conexion.headers);
  static  get_Students = () => axios.get(conexion.urlLocal + `students`, conexion.headers);
  static  get_StudentsData = (params) => axios.get(conexion.urlLocal + {params} + `edit`, conexion.headers);
  static delete_Student = (params) => {

    return axios.delete(`${conexion.urlLocal}students/${params.id}/delete`, {params}, conexion.headers)
  };
  static create_Student = () => axios.post(conexion.urlLocal + `students`, conexion.headers);
  static  update_student = (params) => axios.put(conexion.urlLocal + {params} + `edit`, conexion.headers);
}

export default api;
