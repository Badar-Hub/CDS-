<script setup lang="ts">
import { computed } from 'vue';
import type { IRouteDto } from './interfaces/iroute-dto.ts';
import EssentialLink from 'components/EssentialLink.vue';

const props = defineProps<{
  offsetLeft: number;
  collapsedSubSidebar: boolean;
  parentRoute: IRouteDto | null;
}>();

const emit = defineEmits<{
  (e: 'update:collapsedSubSidebar', value: boolean): void;
}>();

const isCollapsed = computed({
  get() {
    return props.collapsedSubSidebar;
  },
  set(value: boolean) {
    emit('update:collapsedSubSidebar', value);
  },
});

const visibleChildren = computed(() => {
  if (!props.parentRoute?.children) return [];
  return props.parentRoute.children.filter((child: IRouteDto) => child.path !== '');
});

const sidebarStyle = computed(() => ({
  left: `${props.offsetLeft}px`,
}));
</script>

<template>
  <div
    v-if="parentRoute"
    class="sub-sidebar"
    :class="{ 'sub-sidebar-collapsed': isCollapsed }"
    :style="sidebarStyle"
  >
    <div class="column sub-sidebar-content">
      <div class="sub-sidebar-header q-pa-lg" :class="{ 'header-collapsed': isCollapsed }">
        <span class="header-title">{{ parentRoute.name }}</span>
      </div>

      <q-separator class="full-width" />

      <q-list class="col">
        <EssentialLink
          v-for="child in visibleChildren"
          :key="child.name"
          class="q-my-lg q-py-md q-pr-lg"
          :collapsed="isCollapsed"
          v-bind="child"
        />
      </q-list>

      <q-separator class="full-width" />

      <q-item
        clickable
        class="compress-btn q-pa-md"
        :class="{ 'collapsed-item': isCollapsed }"
        @click="isCollapsed = !isCollapsed"
      >
        <template v-if="isCollapsed">
          <q-item-section class="collapsed-content">
            <q-icon size="22px" name="flip" />
            <q-item-label class="compress-label-small">Compress</q-item-label>
          </q-item-section>
        </template>

        <template v-else>
          <q-item-section avatar>
            <q-icon size="22px" name="flip" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="compress-label">Compress</q-item-label>
          </q-item-section>
        </template>
      </q-item>
    </div>
  </div>
</template>

<style lang="scss">
.sub-sidebar {
  position: fixed;
  width: auto;
  height: 100vh;
  top: 72px;
  background-color: $light-page;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  z-index: 1999;
  display: flex;
  flex-direction: column;

  .q-item__label {
    font-size: 18px;
  }

  .sub-sidebar-content {
    height: calc(100% - 75px);
  }
}

.sub-sidebar-collapsed {
  width: auto;

  .q-item__label {
    font-size: 14px !important;
  }
}

.sub-sidebar-header {
  .header-title {
    font-size: 24px;
    font-weight: 600;
    color: $dark;
  }

  &.header-collapsed {
    text-align: center;
    padding: 20px 12px 20px 2px !important;

    .header-title {
      font-size: 18px;
    }
  }
}

.compress-btn {
  .compress-label {
    color: $text-light;
    font-size: 18px;
    font-weight: 400;
  }

  .compress-label-small {
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
