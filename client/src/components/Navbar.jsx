import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44"
      />
      <button
        className="cursor-pointer flex items-center gap-2 rounded-full bg-primary text-white px-10 py-2.5"
        onClick={() => navigate("/admin")}
      >
        {token ?"Dashboard" :"Login"}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
