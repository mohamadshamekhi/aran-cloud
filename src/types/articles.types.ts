import type { Pagination } from "./common.types";

export type { Pagination };

export interface Article {
  id: number;
  title: string;
  body: string;
  tags: string[];
  description?: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface ArticleListResponse extends Pagination {
  status: string;
  posts: Article[];
}

export interface CreateArticleRequest {
  title: string;
  description: string;
  body: string;
  userId: number;
  tags: string[];
  created_at: number;
}

export type CreateArticleResponse = Article;

export interface UpdateArticleRequest {
  title: string;
  description: string;
  body: string;
  tags: string[];
}

export interface UpdateArticleResponse {
  status: string;
  data: Record<string, never>;
}

export interface DeleteArticleResponse extends Article {
  isDeleted: boolean;
  deletedOn: string;
}

export type ArticleDetailResponse = Article;
