<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
  import { createInvite } from './services/user.ts';
  import { getGroups } from './services/group.js';
  import { handlesubmit } from './util/handlesubmitform.js';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;
    let groups = Array();
    onMount(async () =>{
        groups = await getGroups();
    })

	const modalStore = getModalStore();

	// Form Data
	const formData = {
	};

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit(): Promise<void> {
        console.log(formData)
        const res = await createInvite(formData)
		// if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	// const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	// const cHeader = 'text-2xl font-bold';
	// const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class=" modal-example-form card p-4 w-modal shadow-xl space-y-4 ">
		<header class= "text-2xl font-bold">{$modalStore[0].title ?? '(title missing)'}</header>
		<!-- Enable for debugging: -->
		<form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token"
        on:submit|preventDefault={(e) => {
            const group = JSON.parse(handlesubmit(e));
            console.log(group)
            // localStorage.setItem("group", group.Group)
            
          }}>
			<label class="label">
				<span>UserId</span>
				<input class="input" type="text" bind:value={formData.invitee} placeholder="Enter name..." />
			</label>
            <label
                for="Group"
                class="block text-gray-700 mb-1"
                >Select your group
            </label>
            <select class="select" name="Group" bind:value={formData.group_id}>
                {#each groups as item}
                    <option value={item.id}>{item.name}</option>
                {/each}
            </select>
		
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button type="submit" class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{parent.buttonTextSubmit}</button>
		</footer>
    </form>
	</div>
{/if}