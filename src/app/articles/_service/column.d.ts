interface ArticleMeta {
  column_id: string;
  title: string;
  content: string;
}

interface ArticleStats {
  views: number;
  likes: number;
}

interface Article extends ArticleMeta {
  id: string;
  createdAt: number;
  updatedAt: number;
  user_id: string;
  user_name: string;
  user_avatar: string;
  isLiked: boolean;
}

interface ArticleFull extends Article, ArticleStats {}