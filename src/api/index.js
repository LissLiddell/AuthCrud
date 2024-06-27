import axios from "axios";
import conexion from "./conexion"

class api {
  static get_login = (params) => axios.post(conexion.urlLocal + `auth/login`, params, { headers: conexion.headers })
  static  get_Students = () => axios.get(conexion.urlLocal + `contacts`, conexion.headers)
  static  get_StudentID = (id) => axios.get(conexion.urlLocal + `students/${id}` , {id}, conexion.headers)
  static delete_Student = (params) => axios.put(conexion.urlLocal + `contacts`, {data: params}, conexion.headers)
  static create_Student = async(params) => 
    axios.post(conexion.urlLocal + `students`, params, conexion.headers)
  static  update_student = (params) => 
    axios.put(`${conexion.urlLocal}students/${params.id}/edit`, params.editedStudent, { headers: conexion.headers })
}

export default api
