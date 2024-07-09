import CarouselHeader from "../../components/CarouselHeader/CarouselHeader"
import Navbar from "../../components/Navbar/Navbar"
import CardCategoryData from "../../data/CardCategoryData/CardCategoryData"
import { IoFilterSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { ProductData } from "../../data/ProductData/ProductData"
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  const [products, setProducts] = useState(ProductData);
  const [showEffect, setShowEffect] = useState(false);
  
const handleEffect = () =>{
  setShowEffect(!showEffect)
}

const filterProduct = (type) => {
  setProducts(
    ProductData.filter((product) => {
      return product.type === type
    })
  )

};
  return (
    <div className=" overflow-hidden">
        <Navbar/>
        <CarouselHeader/>
       <div className="flex w-full justify-center gap-8 py-20">
            {CardCategoryData.map((data, index)=>{
              return(
                <div key={index} className="w-3/12 h-60 border-[1px] border-gray-200 bg-center bg-cover  group " style={{backgroundImage:`url(${data.url})`}}>
                    <div className="w-full h-full group-hover:bg-[#717fe0] duration-300 group-hover:bg-opacity-70 flex justify-start items-center">
                    <div className="space-y-20 pl-10">
                        <div>
                           <h1 className="text-[28px] poppins-bold group-hover:text-white">{data.title}</h1>
                           <p className="text-[14px] poppins-regular group-hover:text-white">{data.header}</p>
                        </div>
                        <div className="relative">
                          <button className="opacity-0 group-hover:opacity-100 group-hover:translate-y-[-8px] duration-500 group-hover:text-white">SHOP NOW</button>
                          <div className="absolute bottom-0 w-[85px] h-[2px] bg-white duration-500 scale-x-0 group-hover:scale-x-100"></div>
                        </div>
                    </div>
                    </div>
                </div>
              )
            })}
       </div>

       <div className="w-[80%] mx-auto flex justify-between ">
        <div className=" space-y-5">
          <h1 className="text-[36px] poppins-bold">PRODUCT OVERVIEW</h1>
          <div className=" space-x-8 text-[15px] poppins-regular text-[#888888]">
            <button onClick={()=>setProducts(ProductData)}>All Products</button>
            <button onClick={()=>filterProduct("Women")}>Women</button>
            <button onClick={()=>filterProduct("Men")}>Men</button>
            <button onClick={()=>filterProduct("")}>Bag</button>
            <button onClick={()=>filterProduct("Shoes")}>Shoes</button>
            <button onClick={()=>filterProduct("Watches")}>Watches</button>
          </div>
        </div>

        <div className="flex items-end gap-5 poppins-regular">
           <div className="relative group">
             <button onClick={handleEffect} className="z-40  border-[1px] border-[#888888] text-[#888888] py-1 px-5 flex items-center gap-1 rounded-sm group-hover:text-white group-hover:bg-[#717fe0] duration-300"><IoFilterSharp className="text-black group-hover:text-white"/>Filter</button>
              <div className={`${showEffect ? " group-hover:bg-[#717fe0] duration-300 absolute w-5 h-5 rotate-45 bottom-0 top-[1.45rem] left-10 bg-white border-b-[1px] border-[#888888] border-r-[1px]" : "hidden" } `}/>
            </div>
            <button className=" group border-[1px] border-[#888888] text-[#888888] py-1 px-5 flex items-center gap-1 rounded-sm hover:text-white hover:bg-[#717fe0] duration-300"><IoMdSearch className="text-black group-hover:text-white"/> Search</button>
        </div>
       </div>

       <div className="transition-all ease-in duration-500">
        
       {showEffect ? <div className={` w-[80%] min-h-96 bg-green-500 mx-auto translate-y-[15px] transition-all ease-in duration-500`}>
       <div className={` translate-y-1 `}> 
           <div className="w-[40%] h-full bg-red-200 translate-y-[-25rem] group-hover:translate-y-0 duration-300">

           </div>
           <div className="w-[40%] h-full bg-green-200 translate-y-[25rem] group-hover:translate-y-0 duration-300">

           </div>
        </div>
       </div> : ""}
       </div>
  


       <div>
      <div className="w-[80%] mx-auto flex justify-center flex-wrap py-8 gap-5">
          {products.map((data)=>{
            return(
              <div key={data.id} className=" w-72 h-auto relative overflow-hidden group">
                <div className="p-2 px-7 translate-y-[50rem]  rounded-full absolute  group-hover:translate-y-[15rem] duration-300 z-10 bg-white left-20">
                  <button>Quick View</button>
                </div>
                <img className="w-full object-cover object-center hover:scale-110 duration-700" src={data.url} alt="" />
                <div className="bg-white absolute bottom-0 w-full z-20">
                  <div className="flex justify-between items-center">
                  <h1>{data.title}</h1>
                  <FaHeart className="mr-2 text-white"/>
                  </div>
                  <p>{data.price}</p>
                </div>
                
              </div>
            )
          })}
          <div className=" py-14">
            <button className=" bg-[#e6e6e6] px-10 py-3 font-semibold rounded-full hover:bg-black hover:text-white duration-300">LOAD MORE</button>
          </div>
        </div>
       </div>
       <Footer/>
    </div>
  )
}
