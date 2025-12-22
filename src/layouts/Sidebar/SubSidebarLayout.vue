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
      <div class="sub-sidebar-header" :class="{ 'header-collapsed': isCollapsed }">
        <span class="header-title">{{ parentRoute.name }}</span>
      </div>

      <q-separator class="full-width" />

      <q-list class="col">
        <EssentialLink
          v-for="child in visibleChildren"
          :key="child.name"
          v-bind="child"
          class="q-my-lg q-py-md q-pr-lg"
          :collapsed="isCollapsed"
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

.body--dark .sub-sidebar {
  background-color: #13191f;
  border-right: 1px solid rgba(255, 255, 255, 0.12);

  .link-label,
  .link-label-small {
    color: #8991a1 !important;
  }

  .q-icon {
    color: #8991a1;
  }

  .active-link {
    .link-label,
    .link-label-small {
      color: $primary !important;
    }

    .q-icon {
      color: $primary !important;
    }
  }
}

.sub-sidebar-collapsed {
  width: auto;

  .q-item__label {
    font-size: 14px !important;
  }
}

.sub-sidebar-header {
  padding: 25px 25px 24px 30px !important;
  .header-title {
    font-size: 24px;
    font-weight: 600;
    color: $dark;
    margin-top: 5px !important;
  }

  &.header-collapsed {
    text-align: center;
    padding: 29px 12px 29px 2px !important;

    .header-title {
      font-size: 18px;
    }
  }
}

.body--dark .sub-sidebar-header {
  .header-title {
    color: #8991a1;
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

.body--dark .compress-btn {
  .compress-label,
  .compress-label-small {
    color: #8991a1;
  }

  .q-icon {
    color: #8991a1;
  }

  &:hover {
    background-color: $dark;
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
