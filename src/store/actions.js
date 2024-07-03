import api from './../api/index'

export const FgetContact = async (context) => {
  try {
    let resp = await api.get_Students();
    //console.log("FgetContact response:", resp.data);
    context.commit('set_allcontact', resp.data.contacts);
  } catch (error) {
    console.error('Error in FgetContact:', error);
    throw error; // Propaga el error para que pueda ser manejado donde se llama a esta acción
  }
}


export const FgetContactID = async (context,id) => {
  try {
    let resp = await api.get_StudentID(id);
    //console.log("FgetContact response:", resp.data.contacts);
    context.commit('set_contact', resp.data.contacts);
  } catch (error) {
    console.error('Error in FgetContact:', error);
    throw error; // Propaga el error para que pueda ser manejado donde se llama a esta acción
  }
}


export const FdeleteContact = async (context, id) => {
  try {
    let resp = await api.delete_Student(id);
    console.log('respuesta', resp.data)
    if (resp.data.status === 200) {
      context.commit('remove_contact', {resultado: resp.data.status === 200, mensaje: resp.data.message});
    } else {
      context.commit('remove_contact', {resultado: resp.data.status === 500, mensaje:  resp.data.message});
    }
  } catch (error) {
    console.error('Error in FdeleteContact:', error);
    throw error;
  }
}

export const FcreateContact = async (context,params) => {
  try {    
    let resp = await api.create_Student(params)
    if (resp.data.status === 201) {
      context.commit('add_contact', {resultado: resp.data.status === 201, mensaje: resp.data.message});
    } else {
      context.commit('add_contact', {resultado: resp.data.status === 500, mensaje: "Fallo al agregar el estudiante"});
    }
  } catch (error) {
    console.error('Error in AddEstudent:', error);
    throw error;
  }
}

export const FupdateContact = async (context, params) => {
  try {

    let resp = await api.update_student(params)
    if (resp.data.status === 201) {
      context.commit('edit_contact', {resultado: resp.data.status === 201, mensaje: resp.data.message});
    } else {
      context.commit('edit_contact', {resultado: resp.data.status === 500, mensaje: "Fallo al modificar el estudiante"});
    }
    } catch (error) {
      console.error('Error in editStudent:', error);
      throw error;
    }
}

export const Flogout = async (context) => {
  try {
    context.commit('set_sessionActive', false);
    context.commit('set_token', null);
    localStorage.removeItem('token');
  } catch (error) {
    console.log(error)
  }
}

export const FcheckUser = async (context, params) => {
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
