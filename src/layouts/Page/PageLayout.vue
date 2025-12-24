<script setup lang="ts">
import CdsTable from 'components/Table/CdsTable.vue';
import type { IContentDataDto } from './interface/icontent-data-dto';
import type { ColumnModel } from 'src/components/Table/column-model';
import type { IPaginationProps } from 'src/components/Table/interfaces/pagination';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    contentData: IContentDataDto[];
    columns: ColumnModel[];
    data: unknown[];
    pageTitle: string;
    search: string;
    pagination?: IPaginationProps;
    entityName?: string;
  }>(),
  {
    entityName: 'items',
  },
);

const emit = defineEmits<{
  (e: 'search', search: string): void;
  (e: 'page-change', page: number): void;
  (e: 'create-new'): void;
}>();

const inputSearch = computed({
  get() {
    return props.search;
  },
  set(value: string) {
    emit('search', value);
  },
});
</script>
<template>
  <div class="block full-width">
    <div class="row full-width justify-between">
      <div class="column q-px-lg q-mt-xs">
        <h6 class="q-mb-sm q-mt-sm">{{ props.pageTitle }}</h6>
        <h6 class="q-mt-sm q-mb-xs text-body2">Sales > <strong>Client</strong></h6>
      </div>
      <div class="q-px-lg q-my-auto">
        <q-btn label="Create New" icon="add" color="primary" @click="emit('create-new')" />
      </div>
      <div class="col-12">
        <q-separator />
      </div>
    </div>
    <div class="row q-px-md q-mt-lg full-width justify-between">
      <div class="col-3 row content" v-for="item in props.contentData" :key="item.label">
        <div class="row content-container">
          <q-avatar size="60px" class="q-my-auto q-mx-lg">
            <q-icon v-if="item.icon" :name="item.icon" size="60px" />
            <q-icon v-else name="info" size="60px" />
          </q-avatar>
          <div class="column q-ml-sm">
            <h6 class="q-my-none">{{ item.value }}</h6>
            <h6 class="q-my-none text-body2">{{ item.label }}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row full-width q-px-lg q-my-lg">
      <div class="col-12 row justify-between q-mb-lg">
        <q-input v-model="inputSearch" outlined dense debounce="400" placeholder="Search">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="row">
          <q-btn icon="filter_list" size="18px" flat label="Filters" color="primary" no-caps />
          <q-btn icon="more_vert" size="18px" flat label="More" color="primary" no-caps />
        </div>
      </div>
      <CdsTable
        class="full-width"
        :columns="columns"
        :data="data"
        :pagination="pagination ?? { page: 1, rowsPerPage: 10 }"
        :entity-name="entityName"
        last-updated="Last Updated 1min Ago"
        enableExport
        exportFileName="clients"
        @page-change="(page) => emit('page-change', page)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.content {
  padding: 10px;
  .content-container {
    width: 100%;
    background-color: $light-page;
    border-radius: 8px;
    padding: 10px;
  }
}

.body--dark .content {
  .content-container {
    background-color: #46505b;
  }
}
</style>
