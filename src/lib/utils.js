/**
 * Helper function for filters
 * */ 

export function buildFilterParams(filters = {}) {
  const params = {};
  if (filters.category && filters.category !== 'everything') params.category = filters.category;
  if (filters.location && filters.location !== 'everywhere') params.location = filters.location;
  if (filters.year && filters.year !== 'all-time') params.year = filters.year;
  return params;
}