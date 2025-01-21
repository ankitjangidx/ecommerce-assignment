import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./Button";
import { logout } from "../../services/authAPI";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("logout is called");
    dispatch(logout(navigate));
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 
              onClick={() => navigate('/')} 
              className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors"
            >
              E-Commerce Store
            </h1>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <IoMdClose className="h-6 w-6" />
              ) : (
                <MdMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">
                  Welcome, {user.username}!
                </span>
                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <TbLogout className="w-5 h-5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 p-4">
          <div className="space-y-3">
            {user ? (
              <>
                <span className="block text-gray-700">
                  Welcome, {user.username}!
                </span>
                <Button className="w-full flex items-center gap-2 justify-center">
                  <LiaCartPlusSolid className="w-5 h-5" />
                  Cart
                </Button>
                <Button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 justify-center"
                >
                  <TbLogout className="w-5 h-5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center gap-2 justify-center"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="w-full flex items-center gap-2 justify-center"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;