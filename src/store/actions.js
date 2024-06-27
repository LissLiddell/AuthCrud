import api from './../api/index'

export const obtenerEstudiantes = async (context) => {
  try {
    let resp = await api.get_Students();
    //console.log("obtenerEstudiantes response:", resp.data);
    context.commit('set_estudiantes', resp.data.contacts);
  } catch (error) {
    console.error('Error in obtenerEstudiantes:', error);
    throw error; // Propaga el error para que pueda ser manejado donde se llama a esta acción
  }
}

export const obtenerEstudianteID = async (context,id) => {
  try {
    let resp = await api.get_StudentID(id);
    console.log("obtenerEstudiantes response:", resp.data.students);
    context.commit('set_student', resp.data.student);
  } catch (error) {
    console.error('Error in obtenerEstudiantes:', error);
    throw error; // Propaga el error para que pueda ser manejado donde se llama a esta acción
  }
}


export const eliminarEstudiante = async (context, params) => {
  try {
    let resp = await api.delete_Student(params);
    console.log('respuesta', resp.data.status)
    if (resp.data.status === 200) {
      context.commit('remove_estudiantes', {resultado: resp.data.status === 200, mensaje: "Estudiante eliminado"});
    } else {
      context.commit('remove_estudiantes', {resultado: resp.data.status === 200, mensaje: "Fallo al eliminar el estudiante"});
    }
  } catch (error) {
    console.error('Error in eliminarEstudiante:', error);
    throw error;
  }
}

export const crearEstudiante = async (context,params) => {
  try {    
    let resp = await api.create_Student(params)
    if (resp.status === 200) {
      context.commit('add_student', {resultado: resp.status === 200, mensaje: "Estudiante Creado"});
    } else {
      context.commit('add_student', {resultado: resp.status === 200, mensaje: "Fallo al agregar el estudiante"});
    }
  } catch (error) {
    console.error('Error in AddEstudent:', error);
    throw error;
  }
}

export const editarEstudiante = async (context, params) => {
  try {

    let resp = await api.update_student(params)
    if (resp.status === 200) {
      context.commit('edit_student', {resultado: resp.status === 200, mensaje: "Información Estudiante Modificado"});
    } else {
      context.commit('edit_student', {resultado: resp.status === 200, mensaje: "Fallo al modificar el estudiante"});
    }
    } catch (error) {
      console.error('Error in editStudent:', error);
      throw error;
    }
}

export const cerrarSesion = async (context) => {
  try {
    context.commit('set_sessionActive', false);
    context.commit('set_token', null);
    localStorage.removeItem('token');
  } catch (error) {
    console.log(error)
  }
}

export const validarUsuario = async (context, params) => {
  try {

    let resp = await api.get_login(params)
    if (resp.status === 200) {
      context.commit('set_token', resp.data.token);
      localStorage.setItem('token', resp.data.token);
    }
  } catch (error) {
    console.log(error)
  }
}
