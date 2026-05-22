import { useNavigate } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import { cartAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const navigate = useNavigate();
  const { cart, toggleCart, clearCart } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Movies</h1>
        {cart.size > 0 && (
          <button
            className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/40"
            onClick={clearCart}
          >
            Clear All
          </button>
        )}
      </div>
      {cart.size === 0 ? (
        <p className="mt-10 text-gray-400">You have no items in your cart yet.</p>
      ) : (
        <ImageGrid images={Array.from(cart.values())} onClick={(image) => navigate(`/movie/${image.id}/credits`)}>
          {(image) => (
            <ImageOverlay actions={[cartAction((image: ImageCell) => cart.has(image.id), toggleCart)]} image={image} />
          )}
        </ImageGrid>
      )}
    </section>
  );
};