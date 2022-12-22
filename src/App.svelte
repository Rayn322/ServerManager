<script lang="ts">
  import NewServerDialogue from './components/NewServerDialogue.svelte';

  let isDialogueOpen = false;
  const toggleDialogue = () => {
    isDialogueOpen = !isDialogueOpen;
  };
</script>

<main>
  <h1>Server Manager</h1>
  <button class="createServer" on:click={toggleDialogue}>Create Server</button>
  {#if isDialogueOpen}
    <NewServerDialogue closeDialogue={toggleDialogue} />
  {/if}
</main>

<style>
  :global(:root) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    --background-color: #111d36;
    --font-color: #c5c5c5;
    background-color: var(--background-color);
  }

  :global(*) {
    box-sizing: border-box;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: var(--font-color);
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 350;
    line-height: 1.1;
    margin: 0 auto 1em;
  }

  .createServer {
    font-size: 2rem;
    color: var(--font-color);
    padding: 0.5em 1.5em;
    background-color: #000000;
    border: 3px solid var(--font-color);
    border-radius: 1em;
  }

  .createServer:hover {
    background-color: #213766;
  }
</style>
