<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';

const statusData = ref()
const settingsData = ref()

onMounted(async () => {
  const status = await axios.get('http://192.168.1.100/status')
  const settings = await axios.get('http://192.168.1.100/settings')
  statusData.value = status.data
  settingsData.value = settings.data
})

</script>

<template>
  <div v-if="statusData" class="container">
    <p class="bubble">
      Température : {{ statusData.temperature }}°C 
      <span v-if="statusData.overtemperature === true" class="red"></span>
      <span v-else class="green"></span>
    </p>
    <p class="bubble">
      Puissance : {{ statusData.meters[0].power }}W 
      <span v-if="statusData.meters[0].overpower === true" class="red"></span>
      <span v-else class="green"></span>
    </p>
  </div>
  <p v-else>Chargement des données</p>
  <pre>
    {{ settingsData }}
  </pre>
</template>
