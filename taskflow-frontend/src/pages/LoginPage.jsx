    /* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async(e) =>{

    e.preventDefault();
try{
    const res = await login(email, password);
    if(res?.accessToken){
        localStorage.setItem("accessToken", res.accessToken);
        navigate("/dashboard");
    }
}
catch(err){
    console.error(err);
    return;
}  }




useEffect(() => {console.log("in login pag")}, []);


 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Login to TaskFlow
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {"Login"}
        </button>

        {error && <p className="text-red-600 text-center mt-3">{error}</p>}

        <p className="text-center mt-3 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}