import { useState, useEffect } from "react"
import slidePic1 from "../../assets/pictures/slide-01.jpg"
import slidePic2 from "../../assets/pictures/slide-02.jpg"
import slidePic3 from "../../assets/pictures/slide-03.jpg"
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

function Home() {
    const slides = [
        { 
            id:1,
            link: slidePic1,
            header2:<h2 className="text-[28px] firstAnimation">Women Collection 2018</h2>,
            header1:<h1 className="secondAnimation text-[60px] font-serif font-bold">NEW SEASON</h1>,
            button:<button className="buttonAnimation text-[15px] bg-[#717fe0] w-40 py-3 rounded-3xl poppins-medium text-white hover:bg-[#333333] duration-500">SHOP NOW</button>

        },
        {
            id:3,
            link: slidePic2,
            header2:<h2 className="text-[28px] sFirstAnimation">Men New-Season</h2>,
            header1: <h1 className="text-[60px] font-serif font-bold sSecondAnimation">JACKET & COATS</h1>,
            button:<button className="sButton text-[15px] bg-[#717fe0] w-40 py-3 rounded-3xl poppins-medium text-white hover:bg-[#333333] duration-500">SHOP NOW</button>
        },
        {
            id:4,
            link: slidePic3,
            header2:<h2 className="text-[28px] tFirstAnimation">Men Collection 2018</h2>,
            header1: <h1 className="text-[60px] font-serif font-bold tSecondAnimation">NEW ARRIVALS</h1>, 
            button:<button className="tButton text-[15px] bg-[#717fe0] w-40 py-3 rounded-3xl poppins-medium text-white hover:bg-[#333333] duration-500">SHOP NOW</button>
        },
    ]
    const[currentIndex, setCurrentIndex] = useState(0);

    const nextPage =()=>{
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }
    const currentPage =()=>{
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextPage();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

  return (
    <div className=" relative w-screen h-screen group overflow-hidden">
        <div className="w-full h-full flex justify-start items-center bg-cover bg-center duration-500" style={{backgroundImage:`url(${slides[currentIndex].link})`}}>
            <div className="pl-40 flex flex-col gap-5" key={slides[currentIndex].id}>
                {slides[currentIndex].header2}
                {slides[currentIndex].header1}
                {slides[currentIndex].button}
            </div>
        </div>
        <div className=" opacity-0 group-hover:opacity-100 absolute text-[#333333] top-[50%] px-20 duration-500">
            <IoMdArrowDropleft onClick={currentPage} size={50}/>
        </div>
        <div  className="opacity-0 group-hover:opacity-100 absolute text-[#333333] top-[50%] right-0 px-20 duration-500" >
            <IoMdArrowDropright onClick={nextPage} size={50}/>
        </div>
    </div>
  )
}

export default Home