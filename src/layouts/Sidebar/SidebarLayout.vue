<script setup lang="ts">
import routesList from 'src/router/routes';
import { onMounted, ref, computed } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';
import type { IRouteDto } from './interfaces/iroute-dto.ts';

const props = defineProps<{
  collapsedSidebar: boolean;
  selectedRoute: IRouteDto | null;
}>();

const emit = defineEmits<{
  (e: 'update:collapsedSidebar', value: boolean): void;
  (e: 'update:selectedRoute', value: IRouteDto | null): void;
}>();

const isCollapsed = computed({
  get() {
    return props.collapsedSidebar;
  },
  set(value: boolean) {
    emit('update:collapsedSidebar', value);
  },
});

const routes = ref<IRouteDto[]>([]);
const selectedRoute = computed({
  get() {
    return props.selectedRoute;
  },
  set(value: IRouteDto | null) {
    emit('update:selectedRoute', value);
  },
});

onMounted(() => {
  routes.value = routesList.filter(
    (route: RouteRecordRaw) => route.children && route.children.length > 0,
  )[0]!.children as IRouteDto[];
});
</script>

<template>
  <q-drawer show-if-above bordered :width="isCollapsed ? 120 : 280">
    <div class="column full-height">
      <q-list class="q-mt-xl col">
        <EssentialLink
          v-for="(link, index) in routes"
          :key="index"
          v-bind="link"
          class="q-my-lg q-pa-md"
          :collapsed="isCollapsed"
          @click="selectedRoute = link"
        />
      </q-list>

      <q-separator />

      <!-- <q-item
        clickable
        @click="isCollapsed = !isCollapsed"
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
      </q-item> -->
    </div>
  </q-drawer>
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
