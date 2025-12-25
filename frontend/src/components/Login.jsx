import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/styles.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:7001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div className="bg-[#ffffff] mt-[100px] ml-[450px] mr-[450px] pt-[20px] pb-[20px] flex justify-center shadow-[1px_2px_6px_grey]">
      <div>
        <h2 className="">Sign in</h2>

        <form onSubmit={handleSubmission}>


          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter Username" className="w-[300px] h-[30px] border-0 border-b-2  focus:outline-none focus:border-[#4d4df8]" />
          <br /><br />

          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter Password" className="w-[300px] h-[30px] border-0 border-b-2  focus:outline-none focus:border-[#4d4df8]" />
          <br /><br />

          <button disabled={loading} type="submit" className="p-[10px] w-[90px] h-[35px] border-0 text-[#ffffff] bg-[#2c64b9]" >{loading ? "Submitting" : "Submit"}</button>
          <br />
          {loading && (
            <img
              src="https://media1.tenor.com/images/a6a6686cbddb3e99a5f0b60a829effb3/tenor.gif?itemid=7427055"
              alt="Logging in..."
              height="60"
              width="60"
            />
          )}

          <h4>Not Registered yet? <Link to="/reg">Click Here</Link></h4>
        </form>
      </div>
    </div>


  );
}

export default Login;
