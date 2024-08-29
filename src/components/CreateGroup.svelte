<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
  import { createGroup } from './services/group.ts';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Form Data
	const formData = {
		name: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit(): Promise<void> {
        console.log(formData)
        const res = await createGroup(formData)
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
		<form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token">
			<label class="label">
				<span>Name</span>
				<input class="input" type="text" bind:value={formData.name} placeholder="Enter name..." />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{parent.buttonTextSubmit}</button>
		</footer>
	</div>
{/if}