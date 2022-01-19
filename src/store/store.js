import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        token:'',
        emailid:localStorage.getItem('uid')?localStorage.getItem('uid'):'',
        cnt:localStorage.getItem('cnt')?localStorage.getItem('cnt'):0,
       cart:JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [],
    },
    getters:{
        inCart: state => state.cart,
        email:state=>state.emailid,
        count:state=>state.cnt,
     },
    mutations:{
        tokenemail(state,payload){
            return state.token=payload.id,state.emailid=payload.uid;
        },
        changeMail(state){
            return state.emailid=localStorage.getItem('uid') ? localStorage.getItem('uid') : '';
        },
        change(state){
            return state.cart=JSON.parse(localStorage.getItem('cart'))?JSON.parse(localStorage.getItem('cart')):[];
        },
        cnt(state){
            return state.cnt=state.cart.length;
        },
        LOGOUT(state){
            state.token="",
            state.emailid="",
            window.localStorage.removeItem('token'),
            window.localStorage.removeItem('uid'),
            window.localStorage.removeItem("cart"),
            window.localStorage.removeItem("total"),
            window.localStorage.removeItem("user_id")

        },
        SET_CART:(state,data)=>{
            let flag = true;
            state.cart.forEach((element,index) => {
                if(element.id == data.id)
                {
                    state.cart[index].quantity = state.cart[index].quantity+1;
                    flag=false;
                }
            });
            if(flag)
            {
                state.cart.push(data);
                state.cnt=state.cart.length;
            }
            localStorage.setItem('cart',JSON.stringify(state.cart));
            localStorage.setItem('cnt',state.cart.length);
        },
       
          
       
    },
    actions:{
        token(context,payload){
            context.commit('tokenemail',payload)
        },
        logout(context){
            context.commit('LOGOUT')
            this.$router.push("/login");
        },
        addTocart({commit},data){
            commit('SET_CART',data);
        },
       
    }
})


