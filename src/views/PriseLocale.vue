<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios';

const statusData = ref()
const settingsData = ref()

const button = document.querySelector('.button');
const c_button = document.querySelector('.button-container');

const request_status = async () => {
  try {
    const response = await axios.get('https://shelly-77-eu.shelly.cloud/device/status', {
      params: {
        id: '4022d88e30e8',
        channel: 0,
        auth_key: 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73'
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    statusData.value = response.data.data
    
    console.log(response.data.data);
  } catch (error) { 
    console.error('Erreur lors de la récupération des données', error);
  }
};

const request_settings = async () => {
  const formData = new FormData();
  formData.append('id', '4022d88e30e8');
  formData.append('channel', '0');
  formData.append('auth_key', 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73');

  try {
    const response = await axios.post('https://shelly-77-eu.shelly.cloud/device/settings ', formData);
    settingsData.value = response.data.data
    
    console.log(response.data);
  } catch (error) { 
    console.error('Erreur lors de la récupération des données', error);
  }
};

request_status();
request_settings();

const btn_state = async () => {
  if (settingsData.device_settings.value.relays[0].ison === true) {
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
}

onMounted(() => {
  btn_state();
});


async function onOffButton() {

  const button = document.querySelector('.button');
  const c_button = document.querySelector('.button-container');

  if (settingsData.device_settings.value.relays[0].ison === true) {

    try {
      await axios.get('http://192.168.1.100/relay/0?turn=on');
    } catch (error) {
      console.error('Erreur lors de la mise en marche du relais', error);
    }

    button.classList.remove('off');
    button.classList.add('on');
    c_button.classList.remove('c-off');
    c_button.classList.add('c-on');
  } else {

    try {
      await axios.get('http://192.168.1.100/relay/0?turn=off');
    } catch (error) {
      console.error('Erreur lors de l\'arrêt du relais', error);
    }

    button.classList.remove('on');
    button.classList.add('off');
    c_button.classList.remove('c-on');
    c_button.classList.add('c-off');
  }

  // if (button.classList.contains('off')) {
  //   button.classList.remove('off');
  //   button.classList.add('on');
  //   c_button.classList.remove('c-off');
  //   c_button.classList.add('c-on');

  //   try {
  //     await axios.get('http://192.168.1.100/relay/0?turn=on');
  //   } catch (error) {
  //     console.error('Erreur lors de la mise en marche du relais', error);
  //   }
    
  // } else {
  //   button.classList.remove('on');
  //   button.classList.add('off');
  //   c_button.classList.remove('c-on');
  //   c_button.classList.add('c-off');

  //   try {
  //     await axios.get('http://192.168.1.100/relay/0?turn=off');
  //   } catch (error) {
  //     console.error('Erreur lors de l\'arrêt du relais', error);
  //   }
  // }
}
</script>

<template>
  <div class="button-container c-off">
    <button class="button off"></button>
    <span @click="onOffButton()" class="trigger"></span>
  </div>
  <div v-if="statusData" class="container">
    <p class="bubble">
      Température : {{ statusData.device_status.temperature }}°C 
      <span v-if="statusData.device_status.overtemperature === true" class="red"></span>
      <span v-else class="green"></span>
    </p>
    <p class="bubble">
      Puissance : {{ statusData.device_status.meters[0].power }}W 
      <span v-if="statusData.device_status.meters[0].overpower === true" class="red"></span>
      <span v-else class="green"></span>
    </p>
  </div>
  <p v-else>Chargement des données</p>
</template>
