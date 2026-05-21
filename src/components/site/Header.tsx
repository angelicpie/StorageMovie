import { FaRegHeart } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { LinkGroup } from "@/components";
import { ICON_SIZE } from "@/core";
import { useUserContext } from "@/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const { userName, favorites } = useUserContext();

  return (
    <header className="border-gray-700 border-b bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl space-y-2 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="font-bold text-2xl">TMDB Explorer</h1>
            <LinkGroup
              options={[
                { label: "Now Playing", to: "/now-playing" },
                { label: "Trending", to: "/trending?interval=day" },
                { label: "Search", to: "/search" },
              ]}
            />
          </div>
          <div className="flex items-center">
            <h1 className="mr-4 text-gray-300 text-xl">{userName}</h1>
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/favorites")}>
              <FaRegHeart size={ICON_SIZE} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {favorites.size}
                </span>
              )}
            </button>
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/settings")}>
              <GoGear size={ICON_SIZE} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};