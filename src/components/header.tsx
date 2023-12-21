import localFont from "next/font/local";
import clsx from "clsx";
import { useEffect, useState } from "react";


const pacifico = localFont({
    src: "./fonts/Pacifico.ttf",
    display: "swap",
})

const patua = localFont({
    src: "./fonts/PatuaOne.ttf",
    display: "swap",
})

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={clsx("font-medium duration-500 bg-opacity-90 transition-all linear z-40 w-[85%] sm:w-[75%] md:w-[70%] lg:w-[55%] xl:w-[50%] max-w-6xl mx-auto bg-base-200 drop-shadow-xs backdrop-blur-sm top-4 sticky rounded-2xl", { "bg-opacity-[0.7] shadow-md drop-shadow-lg": isScrolled })}>
            <div className="flex justify-between md:space-x-10 lg:space-x-12 xl:space-x-16 md:flex items-center place-items-center py-3 md:px-10 px-8">
                <div className="select-none order-2 md:order-1 cursor-pointer flex items-center text-gray-800">
                    <p className={pacifico.className}>
                        <span className="text-3xl font-semibold dark:font-normal text-base-content">Palette</span>
                    </p>
                </div>

                <div className={patua.className}>
                    Task Board
                </div>
            </div>
        </nav>
    )
}
