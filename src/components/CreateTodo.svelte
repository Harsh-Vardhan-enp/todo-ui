<script lang= "ts">
    import { createTodo } from "./services/todo.ts";

    import { handlesubmit } from "./util/handlesubmitform.ts";

    import Modal from "./Modal.svelte";

    export let showModal = false;

    export let onCloseCreateTodo = () => {};
</script>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={()=>{
    showModal = true;
}}>
    Create Todo Task
</button>

<Modal bind:showModal onClose={onCloseCreateTodo}>
    <form on:submit|preventDefault={(e)=>{createTodo(handlesubmit(e))}}>
        <div class="mb-4">
            <label for="assigned_to" class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
            <input
              id="assigned_to"
              name="assigned_to"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
        </div>
        <div class="mb-6">
            <label for="agenda" class="block text-sm font-medium text-gray-700 mb-1">Agenda</label>
            <input
              id="agenda"
              name="agenda"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
        </div>
        <div class="mb-6">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              id="description"
              name="description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
        </div>
        <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Submit
        </button>
    </form>
</Modal>