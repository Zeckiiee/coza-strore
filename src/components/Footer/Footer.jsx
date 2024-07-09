import React from 'react'
import { FaFacebookF, FaInstagram,FaPinterestP } from "react-icons/fa6";

function Footer() {
    //#8f98a0
    //#edf7fd
  return (
    <>
    <div className='w-screen bg-[#222222] flex justify-around items-center '>
        <div className=''>
            <h1 className='font-bold py-5 text-[#edf7fd] text-[13px]'>CATEGORIES</h1>
            <ul className='text-[#8f98a0]'>
                <li>Women</li>
                <li>Men</li>
                <li>Shoes</li>
                <li>Watches</li>
            </ul>
        </div>
        <div className='bg-green-200'>
            <h1 className='font-bold py-5'>HELP</h1>
            <ul>
                <li>Track Order</li>
                <li>Returns</li>
                <li>Shipping</li>
                <li>FAQs</li>
            </ul>
        </div>
        <div className='bg-pink-200'>
            <h1 className='font-bold py-5'>GET IN TOUCH</h1>
            <p className=''>Any questions? Let us know in store at 8th floor,<br/> 379 Hudson St, New York, NY 10018 or <br/> call us on (+1) 96 716 6879</p>
            <div className='flex'>
            <FaFacebookF/>
            <FaInstagram/>
            <FaPinterestP/>
            </div>
        </div>
        <div className='bg-blue-200'>
            <h1 className='font-bold py-5'>NEWSLETTER</h1>
            <p>email@example.com</p>
            <hr className='bg-[#2d2d2d]'/>
            <button className='bg-[#717fe0] font-semibold px-10 py-2 rounded-full'>
                SUBSCRIBE
            </button>
        </div>
    </div>
    <div className='w-full block'>
            CARDS
        </div>
    </>
  )
}

export default Footer