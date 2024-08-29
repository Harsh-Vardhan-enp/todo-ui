<script>
    import { goto, replaceState } from "$app/navigation";
    import { onMount } from "svelte";
    onMount(()=>{
        if(localStorage.getItem('access_token')){
            goto('/home', {replaceState : true})
        }
    })
    // module.exports = {
    //     darkMode: 'selector',
    // }
</script>
<div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
        <h1 class="text-7xl font-bold ">
            Todos in Svelte
        </h1>
        <div class="flex flex-row items-center justify-center gap-4">
            <a class ="mr-4 text-3xl " href="/login">Login</a>
            <a class ="ml-4 text-3xl " href="/signup">Signup</a>
        </div>
    </div>
</div>
<!-- <p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<!-- 
 <script lang="ts">

    let todos = Array();
    let completedTodos = Array();
    let newTodo:string| undefined;

    let createTodo = () =>{
        if(newTodo){
            todos = [...todos, newTodo]
            newTodo = undefined
            document.getElementById("todo_item").value = "";
        }
    }


    let removeTodo = ( e: string) =>{
        console.log(e, todos)
        let ntodos = [...todos]
        const idx = ntodos.indexOf(e)
        console.log(idx)
        if(idx != -1){
            ntodos.splice(idx, 1)
            todos = [...ntodos]
            completedTodos = [...completedTodos, e]
        }
    }

</script>
<div style="display: flex; ">
<div style="border: solid black; height: 50vh; width: 70vh; margin:10px; padding: 5px; overflow:scroll">
    <ul >
        {#each todos as todo }
            <li>
                {todo}
                <button on:click={() => removeTodo(todo)}>Complete</button>
            </li>
        {:else}
            <p>
                Empty Todos
            <p>
        {/each}

    </ul>
</div>

<div style="border: solid black; height: 50vh; width: 70vh; margin:10px; padding: 5px; overflow:scroll">
    <ul >
        {#each completedTodos as todo }
            <li>
                {todo} completed
            </li>
        {:else}
            <p>
                No Todos Completed
            <p>
        {/each}

    </ul>
</div>
</div>

<div style="border: solid black; height: 5vh; width: 40vh; margin:10px">
    <input id="todo_item" bind:value={newTodo} name="Todo Name" />
    <button on:click={createTodo} > Create Todo</button>
</div>  -->