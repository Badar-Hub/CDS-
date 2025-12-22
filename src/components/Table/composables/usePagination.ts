import { ref, computed, watch, type Ref } from 'vue';
import type { IPagination, IPaginationProps } from '../interfaces/pagination';

export function usePagination(
  paginationProps: Ref<IPaginationProps | undefined>,
  dataLength: Ref<number>,
  entityName: Ref<string>,
) {
  const isServerSide = computed(() => {
    return !!(
      paginationProps.value?.rowsNumber !== undefined && paginationProps.value.rowsNumber >= 0
    );
  });

  const initPagination = (): IPagination => ({
    descending: false,
    page: paginationProps.value?.page || 1,
    rowsPerPage: paginationProps.value?.rowsPerPage || 10,
    ...(isServerSide.value && { rowsNumber: paginationProps.value?.rowsNumber || 0 }),
  });

  const pagination = ref<IPagination>(initPagination());

  watch(
    paginationProps,
    (newPagination) => {
      if (newPagination && isServerSide.value) {
        pagination.value = {
          ...pagination.value,
          page: newPagination.page,
          rowsPerPage: newPagination.rowsPerPage,
          rowsNumber: newPagination.rowsNumber || 0,
        };
      }
    },
    { deep: true },
  );

  const totalRows = computed(() => pagination.value.rowsNumber ?? dataLength.value);

  const totalPages = computed(() => Math.ceil(totalRows.value / pagination.value.rowsPerPage));

  const showingText = computed(() => {
    const { page, rowsPerPage } = pagination.value;
    const total = totalRows.value;
    const end = Math.min(page * rowsPerPage, total);
    return `Showing ${end} of ${total} ${entityName.value}`;
  });

  const visiblePages = computed(() => {
    const current = pagination.value.page;
    const total = totalPages.value;
    const maxVisible = 5;

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    const end = Math.min(total, start + maxVisible - 1);

    // Adjust start if end is at max
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      pagination.value.page = page;
    }
  };

  const isFirstPage = computed(() => pagination.value.page === 1);
  const isLastPage = computed(() => pagination.value.page === totalPages.value);

  return {
    pagination,
    totalRows,
    totalPages,
    showingText,
    visiblePages,
    goToPage,
    isFirstPage,
    isLastPage,
  };
}
