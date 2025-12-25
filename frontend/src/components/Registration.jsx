import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:7001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();
      console.log("Server response:", data);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ffffff] mt-[100px] ml-[450px] mr-[450px] pt-[20px] pb-[20px] flex justify-center shadow-[1px_2px_6px_grey]">
      <div>
        <h2>Sign up</h2>

        <form onSubmit={handleSubmission}>

          <input type="text" id="username" onChange={(event) => setUsername(event.target.value)} placeholder="Enter Username" className="w-[300px] h-[30px] border-0 border-b-2  focus:outline-none focus:border-[#4d4df8]" />
          <br />  <br />

          <input type="password" id="password" onChange={(event) => setPassword(event.target.value)} placeholder="Enter Password" className="w-[300px] h-[30px] border-0 border-b-2  focus:outline-none focus:border-[#4d4df8]" />
          <br /> <br />

          <select
            onChange={(event) => setRole(event.target.value)}
            className="w-[150px] h-[30px] border-b-2 focus:border-[#4d4df8] focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <br />
          <br />

          <button type="submit" disabled={loading} className="p-[10px] w-[90px] h-[35px] border-0 text-[#ffffff] bg-[#2c64b9]">Submit</button>
          {loading && (
            <img
              src="https://media1.tenor.com/images/a6a6686cbddb3e99a5f0b60a829effb3/tenor.gif?itemid=7427055"
              alt="Registering..."
              height="20"
              width="20"
            />
          )}

          <h4>Already have an account? <Link to="/">Click Here</Link></h4>
        </form>
      </div>
    </div>

  );
}

export default Registration;
