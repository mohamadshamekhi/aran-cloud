import type { Pagination } from "./common.types";

export type { Pagination };

export interface Tags {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export type TagsListResponse = string[];

export interface CreateTagsRequest {
  title: string;
  description: string;
  body: string;
  userId: number;
}

export type CreateTagsResponse = Tags;
