<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<script lang="ts">
  import { Modal, popup } from "@skeletonlabs/skeleton";
  import type {
    AutocompleteOption,
    ModalComponent,
    ModalSettings,
    PopupSettings,
  } from "@skeletonlabs/skeleton";
  import { Autocomplete } from "@skeletonlabs/skeleton";
  import { handlesubmit } from "../../components/util/handlesubmitform.js";
  import { onMount } from "svelte";
  import { getGroups } from "../../components/services/group.ts";
  import { goto } from "$app/navigation";
  import { acceptInvites, getInvites, logout, rejectInvites } from "../../components/services/user.js";
  import CreateGroup from "../../components/CreateGroup.svelte";
  import { getModalStore } from '@skeletonlabs/skeleton';
  import type internal from "stream";

  const modalStore = getModalStore();

  async function rejectInv(id: number) {
    const body = {
        "id": id
    }
    const res = await rejectInvites(body)
    groups = await getGroups();
    console.log(groups);
    invites = await getInvites();
  }

  async function acceptInv (id: number) {
    const body = {
        "id": id
    }
    const res = await acceptInvites(body)
    groups = await getGroups();
    console.log(groups);
    invites = await getInvites();
  }

  // Button styles and text for demo purposes
  const buttonNeutral = 'btn-neutral';
  const buttonPositive = 'btn-positive';
  const buttonTextCancel = 'Cancel';
  const buttonTextSubmit = 'Submit';

  let popupSettings: PopupSettings = {
    event: "focus-click",
    target: "popupAutocomplete",
    placement: "bottom",
  };
  let groups = Array();
  let invites = Array();
  onMount(async () => {
    if (!localStorage.getItem("access_token")) {
      goto("/", { replaceState: true });
    }
    if (localStorage.getItem("group")) {
      goto("/home", { replaceState: true });
    }
    console.log("Mounted");
    groups = await getGroups();
    console.log(groups);
    invites = await getInvites();
  });

  function groupModalForm(): void {
    const c: ModalComponent = { ref: CreateGroup };
    const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Create Group',
		};
		modalStore.trigger(modal);
  }

</script>

<div>
  
    <div class="flex items-center justify-center min-h-screen ">
      <div class="text-center">
        {#key groups}
        <form
          on:submit|preventDefault={(e) => {
            const group = JSON.parse(handlesubmit(e));
            console.log(group.Group)
            localStorage.setItem("group", group.Group)
            
          }}
        >
          <label
            for="Group"
            class="block text-3xl font-medium text-gray-700 mb-1 p-2"
            >Select your group</label
          >
          <div class="p-2">
          <select class="select" name="Group">
            {#each groups as item}
                <option value={item.id}>{item.name}</option>
            {/each}
          </select>
        </div>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={()=>{goto("/home", { replaceState: true });}}>Select Group</button>
        </form>
        <div class="flex flex-row items-center justify-center gap-4 p-2">
          
          <button on:click={groupModalForm} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >+ Create Group</button>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={logout}>Logout</button>
        {/key}
    </div> 
    {#key invites}
    <div class=" p-4">
        <div class=" block text-3xl font-medium text-gray-700 mb-1">Invites</div>
        <ul class=" border-solid border-2 list-disc list-inside p-5 h-3/4 overflow-scroll">
            {#each invites as inv}
                <li class="list-item">
                    Group - {inv.group_name} by :- {inv.invited_by}
                
                <button on:click={() =>{acceptInv(inv.id)}}>
                    <i class="material-icons">
                        check
                    </i>
                </button>
      
                  <button on:click={()=>{rejectInv(inv.id)}}> 
                    <i class="material-icons">
                        delete
                    </i>
                </button>
            </li>
            {:else}
                <p> No Invites</p>
            {/each}
        </ul>
    </div>
    
    {/key}
</div>
</div>
