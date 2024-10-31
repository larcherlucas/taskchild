<template>
    <div>
        <input type="checkbox" v-model="checked" />
        <label>{{ checked ? 'Checked' : 'Unchecked' }}</label>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);
</script>
  