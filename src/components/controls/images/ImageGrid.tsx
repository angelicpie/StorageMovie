import type { ReactNode } from "react";
import type { ImageCell } from "@/core";
import { useUserContext } from "@/hooks";
import { ICON_SIZE } from "@/core";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type ImageGridProps = {
  images: ImageCell[];
  onClick?: (image: ImageCell) => void;
  children?: (image: ImageCell) => ReactNode;
};

export const ImageGrid = ({ images, onClick, children }: ImageGridProps) => {
  const { favorites, toggleFavorite } = useUserContext();
  return (
    <div className="grid grid-cols-5 gap-5">
      {images.map((image) => (
        <div
          className={`relative overflow-hidden rounded-lg bg-gray-800 ${onClick ? "cursor-pointer transition hover:scale-[1.02]" : ""}`}
          key={image.id}
          onClick={() => onClick?.(image)}
        >
          {children?.(image)}

          <button
            className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-2 transition hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(image);
            }}
          >
            {favorites.has(image.id) ? (
              <FaHeart className="text-blue-500" size={ICON_SIZE} />
            ) : (
              <FaRegHeart className="text-white" size={ICON_SIZE} />
            )}
          </button>
          
          <img alt={image.primaryText} src={image.imageUrl} />
          {(image.primaryText || image.secondaryText) && (
            <div className="flex flex-col p-3 text-center">
              {image.primaryText && <p className="truncate font-semibold text-sm">{image.primaryText}</p>}
              {image.secondaryText && <p className="truncate font-semibold text-blue-400 text-sm">{image.secondaryText}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};