import api from "$lib/auth.js"
import type { CreatedTodos } from "$lib/types.js"

export const getMyTodos = async () =>{
    const groupid = localStorage.getItem('group')
    const res = await api.get(`/mytodos?group_id=${groupid}`)
    console.log(res.data)
    return res.data
}

export const getCompletedTodos = async () =>{
    const groupid = localStorage.getItem('group')
    const res = await api.get(`/completed_todos?group_id=${groupid}`)
    console.log(res.data)
    return res.data
}

export const getCreatedTodos = async () =>{
    const groupid = localStorage.getItem('group')
    const res = await api.get(`/createdTodos?group_id=${groupid}`)
    console.log(res.data)
    return res.data
}

export const createTodo = async (body : string) =>{
    let body_obj:CreatedTodos = JSON.parse(body)
    const groupid = localStorage.getItem('group')
    body_obj.group_id = groupid
    const res = await api.post("/todos",body=JSON.stringify(body_obj),{
        headers: {
          'Content-Type': 'application/json' 
        }
    });
    console.log(res)
    return res;
}

export const completeTodo = async (body: any) =>{
    // let body_obj:CreatedTodos = JSON.parse(body)
    const groupid = localStorage.getItem('group')
    const res = await api.post(`/complete_todo?group_id=${groupid}`, body = body,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res
}

export const deleteTodo = async (id:string) =>{
    const groupid = localStorage.getItem('group')
    const res = await api.delete(`/todo/${id}`)
    return res;
}