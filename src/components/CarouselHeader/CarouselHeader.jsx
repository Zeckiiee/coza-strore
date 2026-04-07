import { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import slidePic1 from "../../assets/pictures/slide-01.jpg";
import slidePic2 from "../../assets/pictures/slide-02.jpg";
import slidePic3 from "../../assets/pictures/slide-03.jpg";

const slides = [
  {
    id: 1,
    link: slidePic1,
    subtitle: "Women Collection 2018",
    title: "NEW SEASON",
  },
  {
    id: 2,
    link: slidePic2,
    subtitle: "Men New-Season",
    title: "JACKET & COATS",
  },
  {
    id: 3,
    link: slidePic3,
    subtitle: "Men Collection 2018",
    title: "NEW ARRIVALS",
  },
];

function CarouselHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPage = () => {
    setCurrentIndex((currentValue) =>
      currentValue === slides.length - 1 ? 0 : currentValue + 1
    );
  };

  const previousPage = () => {
    setCurrentIndex((currentValue) =>
      currentValue === 0 ? slides.length - 1 : currentValue - 1
    );
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((currentValue) =>
        currentValue === slides.length - 1 ? 0 : currentValue + 1
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setCurrentIndex((currentValue) =>
          currentValue === 0 ? slides.length - 1 : currentValue - 1
        );
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((currentValue) =>
          currentValue === slides.length - 1 ? 0 : currentValue + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const activeSlide = slides[currentIndex];

  return (
    <section className="group relative h-[50vh] min-h-[420px] w-full overflow-hidden sm:h-[60vh] sm:min-h-[520px] md:h-[70vh] lg:h-screen">
      <div
        key={currentIndex}
        className="absolute inset-0 scale-105 bg-cover bg-center transition-all duration-700 ease-out"
        style={{ backgroundImage: `url(${activeSlide.link})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative flex h-full items-center">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40">
          <div key={activeSlide.id} className="max-w-4xl animate-fade-in">
            <h2 className="mb-2 text-lg text-gray-800 animate-slide-down sm:mb-4 sm:text-xl md:text-2xl lg:text-[28px]">
              {activeSlide.subtitle}
            </h2>

            <h1 className="mb-4 font-serif text-3xl font-bold leading-tight text-gray-900 animate-slide-up sm:mb-6 sm:text-4xl md:text-5xl lg:text-[60px]">
              {activeSlide.title}
            </h1>

            <button className="rounded-full bg-[#717fe0] px-6 py-2.5 text-sm text-white transition-all duration-500 hover:scale-105 hover:bg-[#333333] hover:shadow-lg sm:px-8 sm:py-3 sm:text-[15px] poppins-medium animate-fade-in">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={previousPage}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-gray-800 opacity-0 transition-all duration-300 hover:scale-110 hover:text-[#717fe0] focus:opacity-100 group-hover:opacity-100 sm:left-4 sm:p-2 md:left-8 lg:left-20"
        aria-label="Previous slide"
      >
        <IoMdArrowDropleft size={32} className="sm:h-10 sm:w-10 md:h-12 md:w-12" />
      </button>

      <button
        onClick={nextPage}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-800 opacity-0 transition-all duration-300 hover:scale-110 hover:text-[#717fe0] focus:opacity-100 group-hover:opacity-100 sm:right-4 sm:p-2 md:right-8 lg:right-20"
        aria-label="Next slide"
      >
        <IoMdArrowDropright size={32} className="sm:h-10 sm:w-10 md:h-12 md:w-12" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:gap-3">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
                isActive ? "w-6 bg-[#717fe0] sm:w-8" : "bg-white/70 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default CarouselHeader;
