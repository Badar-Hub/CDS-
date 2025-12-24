<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: unknown;
    options: unknown[];
    label?: string;
    icon?: string;
    optionLabel?: string;
    optionValue?: string;
    disable?: boolean;
    clearable?: boolean;
  }>(),
  {
    label: '',
    icon: '',
    optionLabel: 'name',
    optionValue: '',
    disable: false,
    clearable: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void;
}>();

const selectValue = computed({
  get: () => props.modelValue,
  set: (value: unknown) => emit('update:modelValue', value),
});
</script>

<template>
  <q-select
    v-model="selectValue"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    outlined
    :label="label"
    :disable="disable"
    :clearable="clearable"
    emit-value
    map-options
    v-bind="$attrs"
  >
    <template v-if="icon" #prepend>
      <q-icon :name="icon" />
    </template>
    <slot name="append" />
  </q-select>
</template>
