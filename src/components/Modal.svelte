<script lang="ts">
  export let showModal: boolean;
  export let onClose = () => {};

  let dialog: HTMLDialogElement;
  function close() {
    showModal = false;
    console.log("in modal close");
    onClose();
  }
  $: if (dialog && showModal) dialog.showModal();
</script>

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={close}
  on:click|self={() => dialog.close()}
>
	<div class=" inline-block absolute right-0 top-0 cursor-pointer overflow-hidden px-8 py-8 align-middle text-center">
  <button on:click={() => dialog.close()}
    ><i class="material-icons">close</i></button>
</div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <slot name="header" />
    <hr />
    <slot />
    <hr />
    <!-- svelte-ignore a11y-autofocus -->

    <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" autofocus on:click={() =>
		 dialog.close()
		 }>close modal</button> -->
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }
</style>
