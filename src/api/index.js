import axios from "axios";
import conexion from "./conexion"

class api {
  static get_login = (params) => axios.post(conexion.urlLocal + `auth/login`, params, { headers: conexion.headers })
  static  get_Students = () => axios.get(conexion.urlLocal + `contacts`, conexion.headers)
  static  get_StudentID = (id) => axios.get(conexion.urlLocal + `contacts/${id}` , {id}, conexion.headers)
  static delete_Student = (id) => axios.put(conexion.urlLocal + `contacts`, id, conexion.headers)
  static create_Student = (params) => axios.post(conexion.urlLocal + `contacts`, params, conexion.headers)
  static  update_student = (params) => 
    axios.post(conexion.urlLocal+ `contacts`, params.editedStudent, { headers: conexion.headers })
}

export default api
