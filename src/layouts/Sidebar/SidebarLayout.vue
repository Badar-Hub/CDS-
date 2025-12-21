<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import routesList from 'src/router/routes';
import type { RouteRecordRaw } from 'vue-router';
import type { IRouteDto } from './interfaces/iroute-dto.ts';
import EssentialLink from 'components/EssentialLink.vue';
import SubSidebarLayout from './SubSidebarLayout.vue';

const routes = ref<IRouteDto[]>([]);
const leftDrawerOpen = ref(true);
const isCollapsed = ref(false);
const selectedRoute = ref<IRouteDto | null>(null);

const hasChildren = computed(() => {
  return selectedRoute.value?.children && selectedRoute.value.children.length > 0;
});

const mainSidebarWidth = computed(() => {
  return isCollapsed.value ? 120 : 280;
});

const handleRouteSelect = (route: IRouteDto) => {
  selectedRoute.value = route;

  if (route.children && route.children.length > 0) {
    isCollapsed.value = true;
  } else {
    isCollapsed.value = false;
  }
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  if (!isCollapsed.value) {
    selectedRoute.value = null;
  }
};

const closeSubSidebar = () => {
  selectedRoute.value = null;
  isCollapsed.value = false;
};

onMounted(() => {
  routes.value = routesList.filter(
    (route: RouteRecordRaw) => route.children && route.children.length > 0,
  )[0]!.children as IRouteDto[];
});
</script>

<template>
  <!-- Main Sidebar -->
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="mainSidebarWidth">
    <div class="column full-height">
      <q-list class="q-mt-xl col">
        <EssentialLink
          v-for="link in routes"
          :key="link.name"
          class="q-my-lg q-pa-md"
          :collapsed="isCollapsed"
          v-bind="link"
          @click="handleRouteSelect(link)"
        />
      </q-list>

      <q-separator />

      <q-item
        clickable
        @click="toggleCollapse"
        class="collapse-btn q-pa-md"
        :class="{ 'collapsed-item': isCollapsed }"
      >
        <template v-if="isCollapsed">
          <q-item-section class="collapsed-content">
            <q-icon size="25px" name="flip" />
            <q-item-label class="collapse-label-small">Compress</q-item-label>
          </q-item-section>
        </template>

        <template v-else>
          <q-item-section class="q-pl-xs q-mx-sm" avatar>
            <q-icon size="25px" name="flip" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="collapse-label">Compress</q-item-label>
          </q-item-section>
        </template>
      </q-item>
    </div>
  </q-drawer>

  <SubSidebarLayout
    v-if="isCollapsed && hasChildren"
    :parent-route="selectedRoute"
    :offset-left="mainSidebarWidth"
    @close="closeSubSidebar"
  />
</template>

<style lang="scss">
.q-drawer__content {
  background-color: $light-page !important;
}

.collapse-btn {
  .collapse-label {
    color: $text-light;
    font-size: 20px;
    font-weight: 400;
  }

  .collapse-label-small {
    color: $text-light;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin-top: 4px;
  }

  &:hover {
    background-color: $light;
  }
}

.collapsed-item {
  justify-content: center;
}

.collapsed-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
