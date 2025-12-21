<script setup lang="ts">
import { ref } from 'vue';

const search = ref('');
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
          <q-input v-model="search" bg-color="white" square filled outlined placeholder="Search">
            <template #prepend>
              <q-icon class="q-py-md q" color="primary" round name="search" size="md" />
            </template>
          </q-input>
        </div>
        <div class="col-4 text-right q-my-auto">
          <q-icon color="black" class="q-mr-lg cursor-pointer" name="bedtime" size="md" />
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

.seprator {
  margin-left: 19px;
}
</style>
