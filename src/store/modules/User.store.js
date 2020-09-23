// State object
import axios from "axios";

const state = {
   items:{}
}
// Getter functions
const getters = {
    getVariable1( state ) {
       return state.varaible1;
    },
    getVariable2( state ) {
       return state.varaible2;
    },
}
// Actions 
const actions = {
    getUsersListPagination(anjay, payload={}) {
        return new Promise( (resolve) => {
             let page=payload.options.page?payload.options.page:1;
            let itemsPerPage=payload.options.itemsPerPage?payload.options.itemsPerPage:10;
             console.log('page: '+page)
              axios.post(`${this.state.Setting.url}/api/v1/userslist?page=${page}&itemsPerPage=${itemsPerPage}`, payload.filter_options).then(res=>{
                  resolve(res.data)
              })
        })
    },
    getUserRoles(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/role`).then(res => {
                // commit('setEducationalLevels', { educationallevels: res.data })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
// Mutations
const mutations = {
    SET_VARIABLE_1(state, data) {
       state.varaible1 = data;
    },
    SET_VARIABLE_2(state, data) {
       state.variable2 = data;
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}