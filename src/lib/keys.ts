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

export const articleKey = {
  getKey: (id: string) => `article:${id}`,
  getPrefix: 'article:'
}

export const articleByColumnKey = {
  getKey: (column_id: string, id: string) => `article_by_column:${column_id}:${id}`,
  getPrefix: (column_id: string) => `article_by_column:${column_id}:`,
}

export const articleByUserKey = {
  getKey: (user_id: string, id: string) => `article_by_user:${user_id}:${id}`,
  getPrefix: (user_id: string) => `article_by_user:${user_id}:`,
}

export const articleStatsKey = {
  getKey: (id: string) => `article_stats:${id}`,
  getPrefix: () => 'article_stats:',
}

export const articleLikeKey = {
  getKey: (user_id: string, article_id: string) => `article_like:${user_id}:${article_id}`,
  getPrefix: (user_id: string) => `article_like:${user_id}:`,
}