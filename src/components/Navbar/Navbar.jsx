import { useEffect, useRef, useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import logo1 from "../../assets/pictures/logo-01.png";

function Navbar({
  cartCount,
  cartItems,
  cartSubtotal,
  isCartOpen,
  onToggleCart,
  onCloseCart,
  onUpdateCartQuantity,
  onRemoveFromCart,
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isCartOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onCloseCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, onCloseCart]);

  return (
    <div
      className={`fixed z-50 flex w-full justify-center border-[1px] border-[#333333] border-opacity-20 duration-500 ${
        scrollPosition > 0 || isCartOpen ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="relative w-[80%] max-w-6xl py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-10">
            <div>
              <img src={logo1} alt="Coza Store" />
            </div>
            <ul className="relative hidden gap-5 text-[15px] text-[#333333] poppins-regular lg:flex">
              <div className="group">
                <li className="duration-100 group hover:text-[#727fe1]">Home</li>
                <ul className="absolute top-10 display-none w-48 flex-col items-start gap-2 bg-white px-5 py-5  opacity-0 shadow-lg duration-200 group-hover:display-block group-hover:opacity-100">
                  <li>Homepage 1</li>
                  <li>Homepage 2</li>
                  <li>Homepage 3</li>
                </ul>
              </div>
              <li className="duration-100 hover:text-[#727fe1]">Shop</li>
              <li className="duration-100 hover:text-[#727fe1]">Features</li>
              <li className="duration-100 hover:text-[#727fe1]">Blog</li>
              <li className="duration-100 hover:text-[#727fe1]">About</li>
              <li className="duration-100 hover:text-[#727fe1]">Contact</li>
            </ul>
          </div>

          <div className="flex items-center gap-5 text-[#333333]">
            <IoSearchSharp size={20} className="duration-100 hover:text-[#727fe1]" />
            <button
              onClick={onToggleCart}
              className="relative transition duration-100 hover:text-[#727fe1]"
            >
              <FaShoppingCart size={20} />
              {cartCount > 0 ? (
                <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#717fe0] px-1 text-[11px] text-white">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <FaRegHeart size={20} className="duration-100 hover:text-[#727fe1]" />
          </div>
        </div>

        <div
          ref={cartRef}
          className={`absolute right-0 top-full mt-4 w-full max-w-sm rounded-3xl border border-[#e6e6e6] bg-white p-6 shadow-2xl transition-all duration-300 sm:w-[24rem] ${
            isCartOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#888888]">Cart</p>
              <h2 className="mt-1 text-2xl text-[#333333] poppins-semibold">Your bag</h2>
            </div>
            <button
              onClick={onCloseCart}
              className="rounded-full p-2 text-[#888888] transition hover:bg-[#f5f5f5] hover:text-[#333333]"
            >
              <IoClose size={18} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-2xl bg-[#f7f7f7] px-5 py-10 text-center">
              <p className="text-lg text-[#333333] poppins-medium">
                Your cart is empty.
              </p>
              <p className="mt-2 text-sm text-[#888888]">
                Add products below and they will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="max-h-80 space-y-4 overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-2xl border border-[#f0f0f0] p-3"
                    >
                      <img
                        className="h-20 w-16 rounded-xl object-cover object-center"
                        src={item.url}
                        alt={item.title}
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="line-clamp-2 text-sm text-[#333333] poppins-medium">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-[#888888]">{item.price}</p>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-xs uppercase tracking-[0.2em] text-[#717fe0]"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center rounded-full border border-[#e6e6e6]">
                            <button
                              onClick={() => onUpdateCartQuantity(item.id, -1)}
                              className="px-3 py-1 text-lg text-[#333333]"
                            >
                              -
                            </button>
                            <span className="min-w-10 text-center text-sm text-[#333333]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateCartQuantity(item.id, 1)}
                              className="px-3 py-1 text-lg text-[#333333]"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm text-[#333333] poppins-semibold">
                            $
                            {(
                              Number(item.price.replace("$", "")) * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-[#111111] p-5 text-white">
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/70">
                  <span>Subtotal</span>
                  <span>{cartCount} item(s)</span>
                </div>
                <p className="mt-3 text-3xl poppins-semibold">${cartSubtotal.toFixed(2)}</p>
                <button className="mt-5 w-full rounded-full bg-[#717fe0] px-5 py-3 text-sm uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-[#333333]">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
