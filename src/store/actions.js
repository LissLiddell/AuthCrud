import api from './../api/index'

export const obtenerEstudiantes = async (context) => {
  try {
    //console.log("Ejecutando la acción obtenerEstudiantes"); 
    let resp = await api.get_Students();
    // console.log("obtenerEstudiantes response:", resp.data.students);
    context.commit('set_estudiantes', resp.data.students);
  } catch (error) {
    console.error('Error in obtenerEstudiantes:', error);
    throw error; // Propaga el error para que pueda ser manejado donde se llama a esta acción
  }
}

export const obtenerEstudianteID = async (context,id) => {
  try {
    //console.log("Ejecutando la acción obtenerEstudiantes"); 
    let resp = await api.get_StudentID(id);
    // console.log("obtenerEstudiantes response:", resp.data.students);
    context.commit('set_student', resp.data.student);
  } catch (error) {
    console.error('Error in obtenerEstudiantes:', error);
    throw error; // Propaga el error para que pueda ser manejado donde se llama a esta acción
  }
}


export const eliminarEstudiante = async (context, params) => {
  try {
    let resp = await api.delete_Student(params);
    if (resp.status === 200) {
      context.commit('remove_estudiantes', {resultado: resp.status === 200, mensaje: "Estudiante eliminado"});
    } else {
      context.commit('remove_estudiantes', {resultado: resp.status === 200, mensaje: "Fallo al eliminar el estudiante"});
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
    console.log('resp', resp)
    // if (resp.status === 200) {
    //   context.commit('edit_student', {resultado: resp.status === 200, mensaje: "Información Estudiante Modificado"});
    // } else {
    //   context.commit('edit_student', {resultado: resp.status === 200, mensaje: "Fallo al modificar el estudiante"});
    // }
    } catch (error) {
      console.error('Error in editStudent:', error);
      throw error;
    }
}

export const cerrarSesion = async (context) => {
  try {
    context.commit('set_sessionActive', false);
    context.commit('set_token', null);
  } catch (error) {
    console.log(error)
  }
}

export const validarUsuario = async (context, params) => {
  try {

    let resp = await api.get_login(params)
    if (resp.status === 200) {
      context.commit('set_token', resp.data.token);
      context.commit('set_username', resp.data.username);
      context.commit('set_sessionActive', true);
    }
  } catch (error) {
    console.log(error)
  }
}
