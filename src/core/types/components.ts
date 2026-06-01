import type { ReactNode } from "react";

export type Media = "movie" | "tv";

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText?: string;
  secondaryText?: string;
  secondaryID?: string;
  media?: Media;
  mediaType?: 'movie' | 'tv';
  price?: number;
};

export type ImageAction = {
  id: string;
  icon: (active: boolean) => ReactNode;
  active: (image: ImageCell) => boolean;
  onClick: (image: ImageCell) => void;
  position: "left" | "right";
};

export type ImagesResponse = {
  profiles: Array<{
    id: number;
    file_path: string;
  }>
};