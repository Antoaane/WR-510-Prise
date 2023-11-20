<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
      <router-link to="/prise-locale">Prise locale</router-link>
      <router-link to="/prise-cloud">Prise Cloud</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>
