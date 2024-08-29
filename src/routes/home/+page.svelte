<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<script lang="ts">
  import { onMount } from "svelte";
  import {
  completeTodo,
  deleteTodo,
  getCompletedTodos,
    getCreatedTodos,
    getMyTodos,
  } from "../../components/services/todo.ts";
  import Modal from "../../components/Modal.svelte";
  import CreateTodo from "../../components/CreateTodo.svelte";
  import { logout } from "../../components/services/user.js";
  import { goto } from "$app/navigation";
  import type { ModalComponent, ModalSettings } from "@skeletonlabs/skeleton";
  import { getModalStore, LightSwitch } from '@skeletonlabs/skeleton';
  import CreateInvite from "../../components/CreateInvite.svelte";
  import { getGroupUsers } from "../../components/services/group.js";

  const modalStore = getModalStore();

  let todos = Array();
  let completedTodos = Array();
  let createdTodos = Array();
  let gusers = Array();
  onMount(async () => {
    if(!localStorage.getItem('access_token')){
        goto('/', {replaceState : true})
    }
    if(!localStorage.getItem('group')){
      goto('/group',{replaceState : true})
    }
    todos = await getMyTodos();
    completedTodos = await getCompletedTodos();
    createdTodos = await getCreatedTodos();
    gusers = await getGroupUsers();
  });

  function inviteModalForm(): void {
    const c: ModalComponent = { ref: CreateInvite };
    const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Create Invite'
		};
		modalStore.trigger(modal);
  }
  function changegroup(){
    localStorage.removeItem('group')
    goto('/group',{replaceState : true})
  }

  // console.log(data)
  async function handleModalClose() {
    console.log("first close");
    createdTodos = await getCreatedTodos();
    completedTodos = await getCompletedTodos();
    todos = await getMyTodos();
  }
  async function handleTodoComplete(id:any) {
    const body = {
      "id":id
    }
    console.log(body)
    const res = await completeTodo(body)
    todos = await getMyTodos();
    completedTodos = await getCompletedTodos();
    createdTodos = await getCreatedTodos();
  }

  async function handleTodoDelete(id:string) {
    const res = await deleteTodo(id)
    todos = await getMyTodos();
    createdTodos = await getCreatedTodos();
  }

  let showModal = false;
  let currentTodo: any;

  
  function todoModal(currentTodo: any): void {
    const modal: ModalSettings = {
      type: 'alert',
      // Data
      title: currentTodo.agenda,
      body: currentTodo.description,
      // image: 'https://i.imgur.com/WOgTG96.gif',
    };
		modalStore.trigger(modal);
  }

</script>


<div class="flex flex-row p-5">
  <div class="basis-5/6">
      <h1 class="text-4xl font-bold pb-4 ">Todos Home</h1>
      <CreateTodo onCloseCreateTodo={handleModalClose} /> 
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={inviteModalForm} >Invite</button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={changegroup}>Change Group</button>
  </div>
  <div class="basis-1/6">
    <!-- <div class="p-4"><LightSwitch /></div> -->
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={logout}>Logout</button>
  </div>
</div>

<div class="grid auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full p-5">
  <div
    style="padding: 5px; overflow:scroll;"
    class="w-full"
  >
    <h1>Assigned Todos</h1>
    {#key todos}
      <ul class=" card border-solid border-2 border-surface-600 list-disc list-inside p-5 h-3/4 overflow-scroll">
        {#each todos as todo}
          <li class="list-item">
            <button
              on:click={() => {
                todoModal(todo);
                // showModal = true;
                currentTodo = todo;
              }}>{todo?.agenda}</button
            >
            <button on:click={() =>{
              handleTodoComplete(todo.id)
            }}><i class="material-icons">check</i></button>

            <button on:click={()=>{
              handleTodoDelete(todo.id)
            }}> <i class="material-icons">delete</i></button>
          </li>
        {:else}
          <p>Empty Todos</p>
          <p></p>{/each}
      </ul>
    {/key}
  </div>

  <div
    style="padding: 5px; overflow:scroll"
    class="w-full"
  >
    <h1>Completed List</h1>
    <ul class=" card border-solid border-2 border-surface-600 list-disc list-inside p-5 h-3/4 overflow-scroll">
      {#each completedTodos as todo}
        <li class="list-item">
          <button
            on:click={() => {
              todoModal(todo);
              // showModal = true;
              currentTodo = todo;
            }}>{todo?.agenda}</button
          >
        </li>
      {:else}
        <p>No Todos Completed</p>
        <p></p>{/each}
    </ul>
  </div>

  <div
    style="padding: 5px; overflow:scroll"
    class="w-full"
  >
    <h1>Created Todos</h1>
    {#key createdTodos}
      <ul class=" card border-solid border-2 border-surface-600 list-disc list-inside p-5 h-3/4 overflow-scroll">
        {#each createdTodos as todo}
          <li class="list-item">
            <button
              on:click={() => {
                showModal = true;
                currentTodo = todo;
              }}>{todo?.agenda}</button
            >
          </li>
        {:else}
          <p>No Todos created</p>
          <p></p>{/each}
      </ul>
    {/key}
  </div>
</div>


<!-- Responsive Container (recommended) -->
<div class="table-container p-5 ">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Email</th>
				<th>Name</th>
				<th>Role</th>
			</tr>
		</thead>
		<tbody>
			{#each gusers as row, i}
				<tr>
					<td>{row.email}</td>
					<td>{row.name}</td>
					<td>{row.role}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>


<Modal bind:showModal>
  <h2 slot="header">{currentTodo?.agenda} {currentTodo?.id}</h2>
  <p>{currentTodo?.description}</p>
</Modal>
