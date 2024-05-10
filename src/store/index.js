import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'

const stApp = {
  namespaced: true,
  modules: {
    app: {
      actions,
      mutations,
      state
    }
  }
}

export default stApp
