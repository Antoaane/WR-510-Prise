<script setup>
import { ref } from 'vue'
import axios from 'axios';

const statusData = ref()

const fetchShellyData = async () => {
  try {
    const response = await axios.get('https://shelly-77-eu.shelly.cloud/device/status', {
      params: {
        id: '4022d88e30e8',
        channel: 0,
        auth_key: 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73'
      }
    });
    statusData.value = response.data.data
    
    console.log(response.data);
  } catch (error) { 
    console.error('Erreur lors de la récupération des données', error);
  }
};

fetchShellyData();

</script>

<template>
    <pre>
        {{ statusData.device_status.temperature }}
    </pre>
</template>