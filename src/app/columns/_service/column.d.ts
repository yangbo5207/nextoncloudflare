interface ColumnMeta {
  title: string;
  tag: string;
  desc: string;
}

interface ColumnStats {
  views: number;
  likes: number;
}

interface Column extends ColumnMeta {
  id: string;
  createdAt: number;
  updatedAt: number;
  user_id: string;
  user_name: string;
  user_avatar: string;
}

interface ColumnFull extends Column, ColumnStats {}