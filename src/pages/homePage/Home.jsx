import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import CarouselHeader from "../../components/CarouselHeader/CarouselHeader";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CardCategoryData from "../../data/CardCategoryData/CardCategoryData";
import { ProductData } from "../../data/ProductData/ProductData";

const FILTER_LABELS = ["All Products", "Women", "Men", "Bag", "Shoes", "Watches"];
const DEFAULT_VISIBLE_PRODUCTS = 8;
const CART_STORAGE_KEY = "coza-store-cart";

const getPriceValue = (price) => Number(price.replace("$", ""));

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [visibleProducts, setVisibleProducts] = useState(DEFAULT_VISIBLE_PRODUCTS);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setVisibleProducts(DEFAULT_VISIBLE_PRODUCTS);
  }, [activeCategory, searchTerm, sortBy]);

  useEffect(() => {
    if (!feedbackMessage) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setFeedbackMessage("");
    }, 2200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [feedbackMessage]);

  const filteredProducts = ProductData.filter((product) => {
    const matchesCategory =
      activeCategory === "All Products" || product.type === activeCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  }).sort((firstProduct, secondProduct) => {
    if (sortBy === "price-low") {
      return getPriceValue(firstProduct.price) - getPriceValue(secondProduct.price);
    }

    if (sortBy === "price-high") {
      return getPriceValue(secondProduct.price) - getPriceValue(firstProduct.price);
    }

    return firstProduct.id - secondProduct.id;
  });

  const displayedProducts = filteredProducts.slice(0, visibleProducts);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + getPriceValue(item.price) * item.quantity,
    0
  );

  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    setFeedbackMessage(`${product.title} added to cart.`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId, change) => {
    setCartItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.id !== productId) {
          return [item];
        }

        const nextQuantity = item.quantity + change;
        return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
      })
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  const handleResetFilters = () => {
    setActiveCategory("All Products");
    setSearchTerm("");
    setSortBy("featured");
  };

  return (
    <div className="overflow-x-hidden bg-white text-[#333333]">
      <Navbar
        cartCount={cartCount}
        cartItems={cartItems}
        cartSubtotal={cartSubtotal}
        isCartOpen={isCartOpen}
        onCloseCart={() => setIsCartOpen(false)}
        onRemoveFromCart={handleRemoveFromCart}
        onToggleCart={() => setIsCartOpen((currentValue) => !currentValue)}
        onUpdateCartQuantity={handleUpdateCartQuantity}
      />

      <CarouselHeader />

      <div className="mx-auto grid w-[80%] max-w-6xl gap-8 py-20 md:grid-cols-2 xl:grid-cols-3">
        {CardCategoryData.map((data) => {
          return (
            <div
              key={data.id}
              className="group h-60 border-[1px] border-gray-200 bg-cover bg-center"
              style={{ backgroundImage: `url(${data.url})` }}
            >
              <div className="flex h-full w-full items-center justify-start duration-300 group-hover:bg-[#717fe0] group-hover:bg-opacity-70">
                <div className="space-y-20 pl-10">
                  <div>
                    <h1 className="text-[28px] poppins-bold group-hover:text-white">
                      {data.title}
                    </h1>
                    <p className="text-[14px] poppins-regular group-hover:text-white">
                      {data.header}
                    </p>
                  </div>
                  <div className="relative">
                    <button className="opacity-0 duration-500 group-hover:translate-y-[-8px] group-hover:text-white group-hover:opacity-100">
                      SHOP NOW
                    </button>
                    <div className="absolute bottom-0 h-[2px] w-[85px] scale-x-0 bg-white duration-500 group-hover:scale-x-100" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto flex w-[80%] max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-5">
            <h1 className="text-[36px] poppins-bold">PRODUCT OVERVIEW</h1>
            <div className="flex flex-wrap gap-4 text-[15px] text-[#888888] poppins-regular">
              {FILTER_LABELS.map((label) => {
                const isActive = activeCategory === label;

                return (
                  <button
                    key={label}
                    onClick={() => setActiveCategory(label)}
                    className={`border-b pb-1 transition ${
                      isActive
                        ? "border-[#717fe0] text-[#333333] poppins-medium"
                        : "border-transparent hover:text-[#333333]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-4 poppins-regular">
            <div className="group relative">
              <button
                onClick={() => setShowFilters((currentValue) => !currentValue)}
                className={`flex items-center gap-2 rounded-sm border-[1px] px-5 py-2 text-[#888888] duration-300 ${
                  showFilters
                    ? "border-[#717fe0] bg-[#717fe0] text-white"
                    : "border-[#888888] group-hover:bg-[#717fe0] group-hover:text-white"
                }`}
              >
                <IoFilterSharp
                  className={showFilters ? "text-white" : "text-black group-hover:text-white"}
                />
                Filter
              </button>
            </div>

            <button
              onClick={() => setShowSearch((currentValue) => !currentValue)}
              className={`group flex items-center gap-2 rounded-sm border-[1px] px-5 py-2 text-[#888888] duration-300 ${
                showSearch
                  ? "border-[#717fe0] bg-[#717fe0] text-white"
                  : "border-[#888888] hover:bg-[#717fe0] hover:text-white"
              }`}
            >
              <IoMdSearch
                className={showSearch ? "text-white" : "text-black group-hover:text-white"}
              />
              Search
            </button>
          </div>
        </div>

        {showFilters || showSearch ? (
          <div className="rounded-[28px] border border-[#e6e6e6] bg-white p-6 shadow-sm">
            <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr_0.8fr]">
              {showFilters ? (
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#888888]">
                    Category
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {FILTER_LABELS.map((label) => {
                      const isActive = activeCategory === label;

                      return (
                        <button
                          key={label}
                          onClick={() => setActiveCategory(label)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            isActive
                              ? "border-[#717fe0] bg-[#717fe0] text-white"
                              : "border-[#e6e6e6] text-[#333333] hover:border-[#717fe0] hover:text-[#717fe0]"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {showSearch ? (
                <div>
                  <label
                    className="text-sm uppercase tracking-[0.3em] text-[#888888]"
                    htmlFor="product-search"
                  >
                    Search
                  </label>
                  <input
                    id="product-search"
                    className="mt-4 w-full rounded-2xl border border-[#e6e6e6] px-4 py-3 outline-none transition focus:border-[#717fe0]"
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
              ) : null}

              <div>
                <label
                  className="text-sm uppercase tracking-[0.3em] text-[#888888]"
                  htmlFor="sort-products"
                >
                  Sort
                </label>
                <select
                  id="sort-products"
                  className="mt-4 w-full rounded-2xl border border-[#e6e6e6] bg-white px-4 py-3 outline-none transition focus:border-[#717fe0]"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-sm uppercase tracking-[0.2em] text-[#717fe0]"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between pt-8 text-sm text-[#888888]">
          <p>
            Showing {displayedProducts.length} of {filteredProducts.length} product(s)
          </p>
          {searchTerm ? <p>Search: &quot;{searchTerm}&quot;</p> : null}
        </div>

        <div className="mx-auto grid w-full gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedProducts.map((data) => {
            return (
              <div key={data.id} className="group relative overflow-hidden rounded-[20px] bg-white">
                <div className="relative overflow-hidden rounded-[20px]">
                  <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full justify-center p-5 transition duration-300 group-hover:translate-y-0">
                    <button
                      onClick={() => handleAddToCart(data)}
                      className="rounded-full bg-white px-7 py-3 text-sm uppercase tracking-[0.2em] text-[#333333] shadow-lg transition hover:bg-[#717fe0] hover:text-white"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <img
                    className="h-[360px] w-full object-cover object-center transition duration-700 group-hover:scale-110"
                    src={data.url}
                    alt={data.title}
                  />
                </div>

                <div className="flex items-start justify-between gap-4 px-2 py-5">
                  <div>
                    <h1 className="text-[15px] text-[#333333] poppins-medium">{data.title}</h1>
                    <p className="mt-2 text-[#666666]">{data.price}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#888888]">
                      {data.type}
                    </p>
                  </div>
                  <button className="mt-1 text-[#d8d8d8] transition hover:text-[#717fe0]">
                    <FaHeart />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[#d9d9d9] px-6 py-12 text-center">
            <p className="text-xl text-[#333333] poppins-medium">
              No products matched your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 text-sm uppercase tracking-[0.25em] text-[#717fe0]"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        {filteredProducts.length > displayedProducts.length ? (
          <div className="py-8 text-center">
            <button
              onClick={() =>
                setVisibleProducts(
                  (currentValue) => currentValue + DEFAULT_VISIBLE_PRODUCTS
                )
              }
              className="rounded-full bg-[#e6e6e6] px-10 py-3 font-semibold transition duration-300 hover:bg-black hover:text-white"
            >
              LOAD MORE
            </button>
          </div>
        ) : null}
      </div>

      {feedbackMessage ? (
        <div className="fixed bottom-6 right-6 z-[60] rounded-2xl bg-[#111111] px-5 py-4 text-sm text-white shadow-2xl">
          {feedbackMessage}
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
