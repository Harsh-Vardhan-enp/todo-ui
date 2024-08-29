<script lang="ts">
  import "../app.css";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";

  import { Modal, storePopup } from "@skeletonlabs/skeleton";
  import { initializeStores } from '@skeletonlabs/skeleton';
  import { LightSwitch } from '@skeletonlabs/skeleton';
						

    initializeStores();
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

//   class="flex items-center justify-center min-h-screen bg-gray-100 "
</script>

<div>
    <div class=" absolute top-0 right-0"><LightSwitch /></div>
  <slot />
  <Modal/>
</div>
