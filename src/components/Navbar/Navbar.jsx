import { IoSearchSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import logo1 from "../../assets/pictures/logo-01.png"
import { useEffect, useState } from "react";

function Navbar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`w-full fixed z-50 flex justify-center duration-500 border-[#333333] border-[1px] border-opacity-20 ${scrollPosition > 0 ? 'bg-white' : 'bg-transparent'}`}>
        <div className=" w-[80%] flex justify-between py-7">
            <div className="flex gap-10 justify-center">
               <div>
               <img src={logo1} alt="" />
               </div>
                <ul className="flex poppins-regular text-[#333333] text-[15px] gap-5 relative ">
                    <div className="group">
                    <li className="hover:text-[#727fe1] duration-100 group">Home</li>
                      <ul className="w-48 bg-white absolute top-10 py-5 px-5 shadow-lg gap-2 duration-200 opacity-0 group-hover:opacity-100 flex flex-col items-start">
                        <li>Homepage 1</li>
                        <li>Homepage 2</li>
                        <li>Homepage 3</li>
                      </ul>
                    </div>
                    <li className="hover:text-[#727fe1] duration-100">Shop</li>
                    <li className="hover:text-[#727fe1] duration-100">Features</li>
                    <li className="hover:text-[#727fe1] duration-100">Blog</li>
                    <li className="hover:text-[#727fe1] duration-100">About</li>
                    <li className="hover:text-[#727fe1] duration-100">Contact</li>
                </ul>

            </div>
            <div className="flex text-[#333333] gap-5">
                <IoSearchSharp size={20} className="hover:text-[#727fe1] duration-100"/>
                <FaShoppingCart size={20} className="hover:text-[#727fe1] duration-100"/>
                <FaRegHeart size={20} className="hover:text-[#727fe1] duration-100"/>   
            </div>
        </div>
    </div>
  )
}

export default Navbar