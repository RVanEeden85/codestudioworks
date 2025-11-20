import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
    return ( 

        <nav className="px-2 md:pl-2 pr-4 md:pr-6 py-2 flex items-center justify-center gap-3 md:gap-5 rounded-full border border-white/20 fixed top-1 md:top-5 left-1/2 transform -translate-x-1/2 backdrop-blur-sm z-50 shadow-md bg-white/10 text-white font-medium">
            <Link className="bg-white/10 rounded-full p-2 md:p-3 hover:bg-white/40 hover:scale-110 transition duration-500 text-2xl" href="#home"><FaHome /></Link>
            <Link href="#about">About</Link>
            <Link href="#services">Services</Link>
            <Link href="#process">Process</Link>
            <Link href="#info">Info</Link>
            {/* <Link href="#instant-quote">Instant Quote</Link> */}
            <Link href="#contact">Contact</Link>
        </nav>

     );
}
 
export default Navbar;