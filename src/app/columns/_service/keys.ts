export const columnKey = {
  getKey: (id: string) => `column:${id}`,
  getPrefix: () => 'column:',
}

export const columnByUserKey = {
  getKey: (user_id: string, col_id: string) => `col_by_user:${user_id}:${col_id}`,
  getPrefix: (user_id: string) => `col_by_user:${user_id}:`,
}

export const columnStatsKey = {
  getKey: (id: string) => `col_stats:${id}`,
  getPrefix: () => 'col_stats:',
}