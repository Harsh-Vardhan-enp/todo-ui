import api from "$lib/auth.js"

export const getGroups = async ()=>{
    const res = await api.get("/group")
    console.log(res)
    return res.data
}

export const createGroup = async (body: any) =>{
    const res = await api.post("/group",body = body,{
        headers: {
            'Content-Type': 'application/json' 
        }
    })
    console.log(res)
    return res;
}

export const getGroupUsers = async () =>{
    const gid = localStorage.getItem('group')
    const res = await api.get(`/group_members/${gid}`)
    console.log(res)
    return res.data
}