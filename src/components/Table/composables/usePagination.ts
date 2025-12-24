import { ref, computed, type Ref } from 'vue';
import type { IPaginationProps } from '../interfaces/pagination';

export function usePagination(
  paginationProps: Ref<IPaginationProps | undefined>,
  dataLength: Ref<number>,
  entityName: Ref<string>,
  onPageChange?: (page: number) => void,
) {
  const currentPage = ref(paginationProps.value?.page || 1);
  const rowsPerPage = computed(() => paginationProps.value?.rowsPerPage || 10);

  const totalRows = computed(() => paginationProps.value?.rowsNumber || dataLength.value);

  const totalPages = computed(() => Math.ceil(totalRows.value / rowsPerPage.value));

  const showingText = computed(() => {
    const end = Math.min(currentPage.value * rowsPerPage.value, totalRows.value);
    return `Showing ${end} of ${totalRows.value} ${entityName.value}`;
  });

  const visiblePages = computed(() => {
    const current = currentPage.value;
    const total = totalPages.value;
    const maxVisible = 5;

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    const end = Math.min(total, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      onPageChange?.(page);
    }
  };

  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === totalPages.value);

  return {
    currentPage,
    rowsPerPage,
    totalRows,
    totalPages,
    showingText,
    visiblePages,
    goToPage,
    isFirstPage,
    isLastPage,
  };
}
