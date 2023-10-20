<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';

const statusData = ref()
const settingsData = ref()

const boucle = true

onMounted(async () => {
  const button = document.querySelector('.button');
  const c_button = document.querySelector('.button-container');

  const status = await axios.get('http://192.168.1.100/status', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const settings = await axios.get('http://192.168.1.100/settings', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  statusData.value = status.data
  settingsData.value = settings.data
  
  if (statusData.value.relays[0].ison === true) {
    button.classList.remove('off');
    button.classList.add('on');
    c_button.classList.remove('c-off');
    c_button.classList.add('c-on');
  } else {
    button.classList.remove('on');
    button.classList.add('off');
    c_button.classList.remove('c-on');
    c_button.classList.add('c-off');
  }
})


async function onOffButton() {

  const button = document.querySelector('.button');
  const c_button = document.querySelector('.button-container');

  if (button.classList.contains('off')) {
    button.classList.remove('off');
    button.classList.add('on');
    c_button.classList.remove('c-off');
    c_button.classList.add('c-on');

    // Envoie une requête axios pour mettre le relais en mode 'on'
    try {
      await axios.get('http://192.168.1.100/relay/0?turn=on');
    } catch (error) {
      console.error('Erreur lors de la mise en marche du relais', error);
    }
    
  } else {
    button.classList.remove('on');
    button.classList.add('off');
    c_button.classList.remove('c-on');
    c_button.classList.add('c-off');

    // Envoie une requête axios pour mettre le relais en mode 'off'
    try {
      await axios.get('http://192.168.1.100/relay/0?turn=off');
    } catch (error) {
      console.error('Erreur lors de l\'arrêt du relais', error);
    }
  }
}


</script>

<template>
  <div class="button-container c-off">
    <button class="button off"></button>
    <span @click="onOffButton()" class="trigger"></span>
  </div>
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
