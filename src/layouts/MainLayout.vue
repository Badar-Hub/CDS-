<script setup lang="ts">
import { ref } from 'vue';
import SidebarLayout from 'layouts/Sidebar/SidebarLayout.vue';
import SubSidebarLayout from 'layouts/Sidebar/SubSidebarLayout.vue';
import StellarHeader from 'layouts/Header/StellarHeader.vue';
import type { IRouteDto } from 'layouts/Sidebar/interfaces/iroute-dto.ts';

const collapsedSidebar = ref(false);
const collapsedSubSidebar = ref(false);
const selectedRoute = ref<IRouteDto | null>(null);
</script>

<template>
  <q-layout view="lhh Lpr lFf">
    <StellarHeader />

    <SidebarLayout
      v-model:collapsed-sidebar="collapsedSidebar"
      v-model:selected-route="selectedRoute"
    />

    <SubSidebarLayout
      v-if="selectedRoute?.children && selectedRoute.children.length > 0"
      v-model:collapsed-sub-sidebar="collapsedSubSidebar"
      :parent-route="selectedRoute"
      :offset-left="collapsedSidebar ? 120 : 280"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
