<script lang="ts">
  import { goto, replaceState } from "$app/navigation";
  import api from "$lib/auth.js";
  import { onMount } from "svelte";
    // import type { PageData } from './$types';
    
    // export let data: PageData;

    import { handlesubmit } from "../../components/util/handlesubmitform.js";
    
    onMount(()=>{
        if(localStorage.getItem('access_token')){
            goto('/group', {replaceState : true})
        }
    })

    const createUser = async(body: any)=>{
        const res = await api.post("/signup", body=body,{
            headers: {
              'Content-Type': 'application/json' 
            }
        })
        goto("/login",{replaceState:true})
    }
</script>

<div class="flex items-center justify-center ">
    <form on:submit|preventDefault={(e)=>createUser(handlesubmit(e))}>
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
        </div>
        <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
        </div>
        <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
        </div>
        <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Signup
        </button>
    </form>
</div>