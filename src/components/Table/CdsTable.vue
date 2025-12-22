<script setup lang="ts">
import { ref, computed, toRef } from 'vue';
import type { ColumnModel } from './column-model';
import type { IPaginationProps } from './interfaces/pagination';
import { usePagination } from './composables/usePagination';

const filter = ref('');

const props = withDefaults(
  defineProps<{
    data: unknown[];
    columns: ColumnModel[];
    pagination?: IPaginationProps;
    entityName?: string;
    lastUpdated?: string;
    hideSearch?: boolean;
    enableExport?: boolean;
    exportFileName?: string;
    overrideBottom?: boolean;
    overrideNoData?: boolean;
  }>(),
  {
    data: () => [],
    columns: () => [],
    entityName: 'items',
    lastUpdated: '',
    hideSearch: false,
    enableExport: false,
    exportFileName: '',
    overrideBottom: false,
    overrideNoData: false,
  },
);

const emit = defineEmits<{
  (e: 'row-click', row: unknown): void;
  (e: 'request', props: unknown): void;
}>();

// Pagination composable
const {
  pagination: internalPagination,
  showingText,
  visiblePages,
  totalPages,
  goToPage,
  isFirstPage,
  isLastPage,
} = usePagination(
  toRef(props, 'pagination'),
  computed(() => props.data.length),
  toRef(props, 'entityName'),
);

// Column helpers
const overrideColumns = computed(() => props.columns.filter((col) => col.override));

const visibleColumns = computed(() => {
  const defaultCols = props.columns.filter((col) => col.defaultColumn);
  return defaultCols.length > 0
    ? defaultCols.map((col) => col.name)
    : props.columns.map((col) => col.name);
});

const getColumnIcon = (colName: string) => props.columns.find((col) => col.name === colName)?.icon;
</script>

<template>
  <q-table
    flat
    class="stellar-custom-table"
    no-data-label="No Data"
    :rows="data"
    v-bind="$attrs"
    :columns="columns"
    :filter="hideSearch ? undefined : filter"
    v-model:pagination="internalPagination"
    :rows-per-page-options="[5, 7, 10, 15, 20, 25, 50, 100]"
    :visible-columns="visibleColumns"
    @request="(props) => emit('request', props)"
    @row-click="(_, row) => emit('row-click', row)"
  >
    <template #header="headerProps">
      <q-tr :props="headerProps">
        <q-th
          v-for="col in headerProps.cols"
          :key="col.name"
          :props="headerProps"
          class="table-header-cell"
        >
          <div class="row items-center no-wrap header-content">
            <q-icon
              v-if="getColumnIcon(col.name)"
              :name="getColumnIcon(col.name)"
              size="18px"
              class="q-mr-sm"
            />
            <span>{{ col.label }}</span>
          </div>
        </q-th>
      </q-tr>
    </template>

    <template #body="mainProps">
      <q-tr :props="mainProps" class="cursor-pointer">
        <q-td
          v-for="col in mainProps.cols"
          :key="col.name"
          :props="mainProps"
          @click="mainProps.row.expand = !mainProps.row.expand"
        >
          <div v-if="col.override">
            <slot :name="col.name" :props="mainProps" />
          </div>
          <template v-else>
            <div>{{ col.value }}</div>
          </template>
        </q-td>
      </q-tr>

      <q-tr
        v-if="mainProps.row.expand && mainProps.row.children && mainProps.row.children.length > 0"
      >
        <q-td colspan="100%">
          <slot name="expand-row" :data="mainProps.row.children"></slot>
        </q-td>
      </q-tr>
    </template>
    <template v-for="col in overrideColumns" :key="col.name" #[col.templateName]="templateProps">
      <q-td dense :props="templateProps">
        <slot :name="col.name" :props="templateProps" />
      </q-td>
    </template>

    <template #bottom>
      <div class="table-bottom row items-center full-width q-py-md">
        <div class="col-4 text-left">
          <span class="showing-text">{{ showingText }}</span>
          <q-icon name="expand_more" size="18px" class="q-ml-xs" />
        </div>

        <div class="col-4 row justify-center items-center pagination-controls">
          <q-btn flat dense icon="first_page" :disable="isFirstPage" @click="goToPage(1)" />
          <q-btn
            flat
            dense
            icon="chevron_left"
            :disable="isFirstPage"
            @click="goToPage(internalPagination.page - 1)"
          />

          <q-btn
            v-for="page in visiblePages"
            :key="page"
            flat
            dense
            class="page-btn"
            :class="{ 'page-active': page === internalPagination.page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </q-btn>

          <q-btn
            flat
            dense
            icon="chevron_right"
            :disable="isLastPage"
            @click="goToPage(internalPagination.page + 1)"
          />
          <q-btn flat dense icon="last_page" :disable="isLastPage" @click="goToPage(totalPages)" />
        </div>

        <div class="col-4 text-right">
          <span v-if="lastUpdated" class="last-updated-text">{{ lastUpdated }}</span>
        </div>
      </div>
    </template>

    <template v-if="overrideBottom" #bottom-row="bottomProps">
      <slot name="bottom" :props="bottomProps" />
    </template>

    <template v-if="overrideNoData" #no-data="noDataProps">
      <slot name="no-data" :props="noDataProps" />
    </template>
  </q-table>
</template>

<style lang="scss">
.stellar-custom-table {
  .q-table thead {
    background-color: $light-page;
  }

  .table-header-cell {
    font-weight: 400;
    color: #5d5d5d;
    padding: 12px 16px;

    // Ensure header content and sort icon stay inline
    .q-table__sort-icon {
      display: inline-flex;
      margin-left: 4px;
      vertical-align: middle;
    }
  }

  .header-content {
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;

    .q-icon {
      color: #234972;
    }
  }

  // Alternating row colors
  .q-table tbody tr:nth-child(odd) {
    background-color: #f5faff;
  }

  .q-table tbody tr:nth-child(even) {
    background-color: #eff6ff;
  }

  .q-table tbody tr td {
    font-weight: 500;
    border-bottom: none;
  }

  .table-bottom {
    .showing-text {
      color: #5d5d5d;
      font-size: 14px;
    }

    .last-updated-text {
      color: #5d5d5d;
      font-size: 14px;
    }

    .pagination-controls {
      gap: 4px;

      .q-btn {
        color: #5d5d5d;
      }

      .page-btn {
        min-width: 32px;
        min-height: 32px;
        border-radius: 4px;
      }

      .page-active {
        border: 1px solid $primary;
        color: $primary;
      }
    }
  }
}

.body--dark .stellar-custom-table {
  .q-table thead {
    background-color: #14191e;
  }

  .table-header-cell {
    color: #8991a1;
  }

  .q-table tbody tr td {
    color: $dark;
  }

  .table-bottom {
    .showing-text,
    .last-updated-text {
      color: white;
    }
  }
}
</style>
