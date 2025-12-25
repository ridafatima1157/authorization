import { Link, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loggingOut, setLoggingOut] = useState(false); // ✅ track logout state

  let decoded = null;
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  //university grants commission
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/");
    }, 1500);
  };

  return (
    <div>
      <div className="bg-[#144fa8] h-[50px] flex items-center ">
        <ul className="flex justify-around list-none w-full">
          <li><h4><Link to="/home" className="no-underline text-[#ffffff]">Home</Link></h4></li>

          <li><h4><Link to="/about" className="no-underline text-[#ffffff]">About</Link></h4></li>

          <li><h4><Link to="/help" className="no-underline text-[#ffffff]">Help</Link></h4></li>

          {decoded?.role === "admin" && (
            <>
              <li><h4><Link to="/reports" className="no-underline text-[#ffffff]">Reports</Link></h4></li>
              <li><h4><Link to="/users" className="no-underline text-[#ffffff]">Manage Users</Link></h4></li>
            </>
          )}

          {token && (
            <li><h4><Link onClick={handleLogout} disabled={loggingOut} className="no-underline text-[#ffffff]" > {loggingOut ? "Logging out..." : "Logout"} </Link></h4></li>
          )}
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default Navbar;
