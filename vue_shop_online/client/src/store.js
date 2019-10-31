import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		itemTitle: null,
		selected: null,
		method: null,
		address: null,
	},
	mutations:{
		selectItem(state, selected){
			state.selected = selected;
		},
		receiveMethod(state, method){
			state.method = method;
		},
		selectAddress(state, address){
			state.address = address;
		},
		selectTitle(state, title){
			state.itemTitle = title;
		}
	}
});