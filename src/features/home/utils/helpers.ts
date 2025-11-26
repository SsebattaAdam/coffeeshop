/**
 * Get unique categories from coffee/bean data
 * @param data - Array of coffee or bean items
 * @returns Array of unique category names with "All" at the beginning
 */
export const getCategoriesFromData = (data: any[]): string[] => {
  let temp: Record<string, number> = {};

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

/**
 * Filter coffee/bean data by category
 * @param data - Array of items to filter
 * @param category - Category name to filter by ("All" returns all items)
 * @returns Filtered array
 */
export const filterDataByCategory = (data: any[], category: string): any[] => {
  if (category === 'All') {
    return data;
  }
  return data.filter(item => item.name === category);
};

/**
 * Search data by text
 * @param data - Array of items to search
 * @param searchText - Text to search for
 * @returns Filtered array matching search text
 */
export const searchData = (data: any[], searchText: string): any[] => {
  if (!searchText || searchText.trim() === '') {
    return data;
  }

  const searchLower = searchText.toLowerCase().trim();
  return data.filter(
    item =>
      item.name.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower) ||
      item.special_ingredient?.toLowerCase().includes(searchLower),
  );
};

