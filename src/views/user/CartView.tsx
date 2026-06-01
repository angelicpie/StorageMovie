import { useUserContext } from '@/hooks';
import { FaHeart, FaTrash } from 'react-icons/fa';

export const CartView = () => {
  const { cart, toggleCart, toggleFavorite, clearCart } = useUserContext();
  const cartItems = Array.from(cart.values());
  const subTotal = cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0);
  const tax = subTotal * 0.13;
  const total = subTotal + tax;

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Cart</h1>
        {cartItems.length > 0 && (
          <button className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500" onClick={clearCart}>
            Empty Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="mt-10 text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-800">
                  <td className="py-4 flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.primaryText} className="w-16 h-24 rounded-lg object-cover shrink-0" />
                    <p className="font-semibold text-white">{item.primaryText}</p>
                  </td>
                  <td className="py-4 text-gray-400">{item.mediaType === 'movie' ? 'Movie' : 'TV Show'}</td>
                  <td className="py-4 text-white font-semibold">${item.price?.toFixed(2) ?? '0.00'}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleFavorite(item)} className="text-gray-400 hover:text-blue-400 transition">
                        <FaHeart size={18} />
                      </button>
                      <button onClick={() => toggleCart(item)} className="text-gray-400 hover:text-red-400 transition">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end gap-10 border-t border-gray-700 pt-4">
            <p className="text-gray-400 font-medium">Subtotal</p>
            <p className="text-white font-bold">${subTotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-end gap-10 border-t border-gray-700 pt-4">
            <p className="text-gray-400 font-medium">Tax</p>
            <p className="text-white font-bold">${tax.toFixed(2)}</p>
          </div>

          <div className="flex justify-end gap-10 border-t border-white-700 pt-4">
            <p className="text-white-500 font-medium">Total</p>
            <p className="text-white font-bold">${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </section>
  );
};