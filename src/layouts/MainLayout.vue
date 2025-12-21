<template>
  <q-layout view="lHh Lpr lFf">
    <SidebarLayout v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidebarLayout from 'layouts/Sidebar/SidebarLayout.vue';

const leftDrawerOpen = ref(false);
</script>
