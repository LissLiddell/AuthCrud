import { createStore } from 'vuex';
import stApp from './store/index'

const store = createStore({
  modules: {
    stApp: stApp
  }
});

export default store; 
