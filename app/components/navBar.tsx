import AccountIcon from "./accountIcon";
interface Navbar{
  className? : string
}

export default function NavBar({className} : Navbar) {
  return (
    <div>
    <nav className={`z-50 bg-[#1b1b1b] px-6 py-4 shadow-md flex items-center ${className}`}>
      <h1 className="text-white text-2xl font-bold tracking-wide">NOTEFLOW</h1>
      <AccountIcon className="ml-auto mr-10"/>
      {}
    </nav>
    <div className="transparent-height-nav h-20 bg-[#111111]">

    </div>
    </div>

    
  );
}
