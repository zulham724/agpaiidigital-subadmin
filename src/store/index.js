import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import VuexPersistence from 'vuex-persist'


// import the auto exporter
import modules from './modules';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';


const vuexLocal = new VuexPersistence({
  strictMode: true, // This **MUST** be set to true
  storage: localStorage, // wich storage u want to use
  reducer: (state) => ({ Auth: state.Auth }), // save given modules to storage
})

export default new Vuex.Store({
  modules,
  strict: debug,
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin] // set logger only for development
})