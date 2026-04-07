import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="mt-24 bg-[#222222] text-white">
      <div className="mx-auto grid w-[80%] max-w-6xl gap-10 py-16 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h2 className="text-sm uppercase tracking-[0.35em] text-white poppins-semibold">
            Categories
          </h2>
          <ul className="mt-6 space-y-3 text-[#8f98a0]">
            <li className="transition hover:text-white">Women</li>
            <li className="transition hover:text-white">Men</li>
            <li className="transition hover:text-white">Shoes</li>
            <li className="transition hover:text-white">Watches</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm uppercase tracking-[0.35em] text-white poppins-semibold">
            Help
          </h2>
          <ul className="mt-6 space-y-3 text-[#8f98a0]">
            <li className="transition hover:text-white">Track Order</li>
            <li className="transition hover:text-white">Returns</li>
            <li className="transition hover:text-white">Shipping</li>
            <li className="transition hover:text-white">FAQs</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm uppercase tracking-[0.35em] text-white poppins-semibold">
            Get In Touch
          </h2>
          <p className="mt-6 max-w-sm leading-7 text-[#8f98a0]">
            Any questions? Let us know in store at 8th floor, 379 Hudson St, New York,
            NY 10018 or call us on (+1) 96 716 6879.
          </p>
          <div className="mt-6 flex gap-4 text-lg text-white">
            <button className="transition hover:text-[#717fe0]">
              <FaFacebookF />
            </button>
            <button className="transition hover:text-[#717fe0]">
              <FaInstagram />
            </button>
            <button className="transition hover:text-[#717fe0]">
              <FaPinterestP />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-sm uppercase tracking-[0.35em] text-white poppins-semibold">
            Newsletter
          </h2>
          <div className="mt-6 space-y-5">
            <input
              className="w-full border-b border-white/15 bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-[#8f98a0]"
              type="email"
              placeholder="email@example.com"
            />
            <button className="rounded-full bg-[#717fe0] px-10 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-[#333333]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-[80%] max-w-6xl flex-col items-center justify-between gap-4 py-6 text-center text-sm text-[#8f98a0] md:flex-row">
          <p>Copyright © 2026 Coza Store. Built for a cleaner storefront experience.</p>
          <div className="flex gap-3 text-3xl text-white/80">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
