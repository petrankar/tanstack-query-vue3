<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <a href="https://tanstack.com/" target="_blank">
      <img src="../assets/tanstack-logo.png" class="logo tanstack" alt="Tanstack logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue-logo.png" class="logo vue" alt="Vue logo" />
    </a>

    <h1>TanStack Vue Query Demo</h1>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
header {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  top: 0;
  position: sticky;
  padding: 0.5rem;
  background-color: #2f2f2f;
}
.logo {
  width: 3rem;
  height: 3rem;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
