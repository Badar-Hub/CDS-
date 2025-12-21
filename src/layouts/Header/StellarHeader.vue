<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const search = ref('');

const isDarkMode = computed({
  get() {
    return $q.dark.isActive;
  },
  set(value: boolean) {
    $q.dark.set(value);
  },
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const darkModeIcon = computed(() => {
  return isDarkMode.value ? 'light_mode' : 'bedtime';
});
</script>

<template>
  <q-header v-bind="$attrs">
    <q-toolbar class="stellar-header-toolbar">
      <div class="row justify-between fit">
        <div class="col-4 row">
          <q-icon class="q-py-md q-px-lg" color="primary" round name="store" size="40px" />
          <q-separator vertical class="seprator full-height" />
        </div>
        <div class="col-4 q-my-auto">
          <q-input
            v-model="search"
            class="search-input"
            square
            filled
            outlined
            placeholder="Search"
          >
            <template #prepend>
              <q-icon class="q-py-md search-icon" round name="search" size="md" />
            </template>
          </q-input>
        </div>
        <div class="col-4 text-right q-my-auto">
          <q-icon
            :color="isDarkMode ? 'yellow' : 'black'"
            class="q-mr-lg cursor-pointer"
            :name="darkModeIcon"
            size="md"
            @click="toggleDarkMode"
          />
          <q-avatar class="q-mr-lg">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<style lang="scss">
.stellar-header-toolbar {
  background-color: $light-page;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.body--dark .stellar-header-toolbar {
  background-color: #00070f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.seprator {
  margin-left: 19px;
}

.search-input {
  .q-field__control {
    background-color: white;
  }

  .search-icon {
    color: $primary;
  }
}

.body--dark .search-input {
  .q-field__control {
    background-color: #14191e !important;
  }

  .search-icon {
    color: #1d324b !important;
  }
}
</style>
