<template>
  <q-item
    clickable
    tag="router-link"
    :to="{ name: props.name }"
    active-class="active-link"
    :class="{ 'collapsed-item': props.collapsed }"
  >
    <template v-if="props.collapsed">
      <q-item-section class="collapsed-content">
        <q-icon size="25px" :name="props.meta?.icon" />
        <q-item-label class="link-label-small q-pt-sm">{{ props.name }}</q-item-label>
      </q-item-section>
    </template>

    <template v-else>
      <q-item-section class="q-pl-xs q-mx-sm" v-if="props.meta?.icon" avatar>
        <q-icon size="25px" :name="props.meta?.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="link-label q-mt-auto">{{ props.name }}</q-item-label>
      </q-item-section>
    </template>
  </q-item>
</template>

<script setup lang="ts">
import type { IRouteDto } from 'src/layouts/Sidebar/interfaces/iroute-dto.ts';

const props = withDefaults(defineProps<IRouteDto>(), {
  name: '',
});
</script>

<style scoped lang="scss">
.link-label {
  color: $text-light;
  font-size: 20px;
  font-weight: 400;
}

.link-label-small {
  color: $text-light;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin-top: 4px;
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

.active-link {
  background-color: $light;

  .link-label,
  .link-label-small {
    color: $primary !important;
    font-weight: 600;
  }

  :deep(.q-icon) {
    color: $primary;
  }
}
</style>
