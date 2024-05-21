import axios from "axios";
import conexion from "./conexion"

class api {
  static get_login = (params) => axios.get(conexion.urlLocal + `login`, {params}, conexion.headers)
  static  get_Students = () => axios.get(conexion.urlLocal + `students`, conexion.headers)
  static  get_StudentID = (id) => axios.get(conexion.urlLocal + `students/${id}` , {id}, conexion.headers)
  static delete_Student = (params) => 
    axios.delete(`${conexion.urlLocal}students/${params.id}/delete`, {params}, conexion.headers)
  static create_Student = async(params) => 
    axios.post(conexion.urlLocal + `students`, {params}, conexion.headers)
  static  update_student = (params) => {
    console.log('editedStudent', params)
    return axios.put(conexion.urlLocal + `students/${params.id}/edit`, {editedStudent: params.editedStudent}, conexion.headers)
  }
}

export default api;
