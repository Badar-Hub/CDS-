<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    placeholder?: string;
    icon?: string;
    type?: string;
    readonly?: boolean;
    disable?: boolean;
  }>(),
  {
    placeholder: '',
    icon: '',
    type: 'text',
    readonly: false,
    disable: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string | number) => emit('update:modelValue', value),
});
</script>

<template>
  <q-input
    v-bind="$attrs"
    v-model="inputValue"
    outlined
    :placeholder="placeholder"
    :readonly="readonly"
    :disable="disable"
  >
    <template v-if="icon" #prepend>
      <q-icon :name="icon" />
    </template>
    <slot name="append" />
  </q-input>
</template>
