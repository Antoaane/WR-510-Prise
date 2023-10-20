<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';

const data = ref()

onMounted(async () => {
  const response = await axios.get('http://192.168.1.100/status')
  data.value = response.data
})

</script>

<template>
  <div v-if="data" class="container">
    <p>Température : {{ data.temperature }}°C <span v-if="data.overtemperature === true" class="red"></span><span v-else class="green"></span></p>
    <p>Humidité : {{ data.humidity }}%</p>
  </div>
  <p v-else>Chargement des données</p>
  <pre>
    {{ data }}
  </pre>
</template>
