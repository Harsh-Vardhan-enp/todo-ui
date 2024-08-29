<script lang="ts">
    import { onMount } from "svelte";
    import { sendLogin } from "../../components/services/user.ts";
    // import type { PageData } from './$types';
    
    // export let data: PageData;
    import { handlesubmit } from "../../components/util/handlesubmitform.ts";
    import { goto } from "$app/navigation";

    onMount(()=>{
        if(localStorage.getItem('access_token')){
            goto('/group', {replaceState : true})
        }
    })
</script>

<div class="flex items-center justify-center bg-gray-100 ">
    <!-- <div class=" text-3xl">LoginForm</div> -->
    <form name="Login" title="Login" on:submit|preventDefault={(e)=>{sendLogin(handlesubmit(e))}} >
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="email"
              id="email"
              name="username"
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
            Login
        </button>
    </form>
</div>