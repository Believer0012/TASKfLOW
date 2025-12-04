    /* eslint-disable no-unused-vars */
import { create } from "zustand";
import { userApi } from "../api/https";

const useAuthStore =  create((set) => ({


    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    loading: false,
    err: null,


register:async (userName,email,password)=> {
    set({loading:true, err:null});
    try{
         const res = await userApi.post("/register", {userName,email,password});
            set({ loading: false });
             return res.data;
    }
    catch(e){
        set({err:"Registration failed"});
    }
},

login : async(email,password) => {
    set({loading:true, err:null});
    try{
        const res = await userApi.post("/login", {email,password});
          set({ user: res.data.user, accessToken: res.data.accessToken, loading: false });

        return res.data;
    }
    catch(e){
        set({err:"Login failed"});
    }
},
logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },

}));  


export default useAuthStore;  