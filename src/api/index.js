import axios from "axios";
import conexion from "./conexion"

class api {
  static get_login = (params) => axios.get(conexion.urlLocal + `login`, {params}, conexion.headers);
  static  get_Students = () => axios.get(conexion.urlLocal + `students`, conexion.headers);
  static  get_StudentData = (params) => axios.get(conexion.urlLocal + `students/${params.id}` , {params}, conexion.headers);
  static delete_Student = (params) => axios.delete(`${conexion.urlLocal}students/${params.id}/delete`, {params}, conexion.headers);
  static create_Student = async(params) => axios.post(conexion.urlLocal + `students`, params.value, conexion.headers);
  static  update_student = (params) => axios.put(conexion.urlLocal + {params} + `edit`, params.value, conexion.headers);
}

export default api;
