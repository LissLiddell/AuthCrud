import api from './../api/index'

export const cerrarSesion = async (context) => {
  try {
    context.commit('set_sesionActiva', false);
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
      context.commit('set_sesionActiva', true);
    }
  } catch (error) {
    console.log(error)
  }
}
