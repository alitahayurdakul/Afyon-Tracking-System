// 5 4
export const currentPageController = (
  currentPage: number,
  totalPage?: number,
): number => {
  if (!totalPage || totalPage <= 0) {
    return 1;
  }

  if (currentPage < 0) return 1;
  if (currentPage > totalPage) return totalPage;

  return currentPage;
};
