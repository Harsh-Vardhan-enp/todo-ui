import { goto } from "$app/navigation";
import api from "$lib/auth.js"
import { tokenS } from "$lib/stores.js";
import { get } from "svelte/store";

export const sendLogin = async (body : string) =>{
    const res = await api.post("login",body = body, 
        {
            headers: {
              'Content-Type': 'application/json' 
            }
        }
    )
    const token = res.data.access_token;
    localStorage.setItem('access_token', token)
    goto("/home",{replaceState: true})
}

export const createInvite = async (body: any) =>{
    const res = await api.post("/invite",body = body, 
        {
            headers: {
              'Content-Type': 'application/json' 
            }
        }
    )
    return res
}

export const getInvites = async () =>{
    const res = await api.get("/invite")
    return res.data
}

export const acceptInvites = async (body:any) =>{
    const res = await api.put("/invite/accept", body=body,{
        headers: {
          'Content-Type': 'application/json' 
        }
    });
    return res.data
}

export const rejectInvites = async (body:any) =>{
    const res = await api.put("/invite/reject", body=body,{
        headers: {
          'Content-Type': 'application/json' 
        }
    });
    return res.data
}


export const logout  = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('group')
    goto("/",{replaceState: true})
}
