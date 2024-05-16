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

export const obtenerEstudianteData = async (context) => {
  let res = await api.get_StudentsData()
  then(res => {
    console.log(res.data.student);
    model.value.student = res.data.student;
  })
  .catch(error => {
    if (error.response && error.response.status === 404) {
      alert(error.response.data.message);
    }
  });
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
  let res = await api.create_Student(params)
  then(res => {
    console.log(res.data);
    alert(res.data.message);

    model.value.student = {
      name: '',
      course: '',
      email: '',
      phone: ''
    };
    errorList.value = '';
  })
  .catch(error => {
    if (error.response) {
      if (error.response.status === 422) {
        errorList.value = error.response.data.errors;
      }
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  });
}

export const editarEstudiante = async (context) => {
  let res = await api.update_student()
  then(res => {
    console.log(res.data);
    alert(res.data.message);

    model.value.student = {
      name: '',
      course: '',
      email: '',
      phone: ''
    };

    errorList.value = '';
  })
  .catch(error => {
    if (error.response) {
      if (error.response.status === 422) {
        errorList.value = error.response.data.errors;
      }

      if (error.response.status === 404) {
        alert(error.response.data.message);
      }
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  });
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
