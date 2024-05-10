import api from './../api/index'

export const validarUsuario = async (context, params) => {
  try {

    let resp = await api.get_login(params)
    if (resp.status === 200) {
      context.commit('set_token', resp.data.token);
      context.commit('set_username', resp.data.username);
    }
  } catch (error) {
    console.log(error)
  }
}
