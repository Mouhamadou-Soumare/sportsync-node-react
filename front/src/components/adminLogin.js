import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Importez le hook useHistory
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password,
      });
      Cookies.set("auth_token", response.data.token);
      console.log("Authentication successful:", response.data);
      history.push("/");
    } catch (error) {
      console.error("Authentication failed:", error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-white py-24 sm:py-32 flex flex-column h-screen pb-0	">
        <div className="mx-auto max-w-7xl px-24 lg:px-44 flex-sportsync items-center	content-center	">
          <h2 className="text-4xl text-center pb-12">Identification</h2>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Identifiant
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full bg-slate-300	pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block bg-slate-300	pt-3 pb-3 px-3 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>

        <div class="authenticator-cards-container flex-sportsync">
          <div class="column">
            <div class="card">
              <img src="https://i.ibb.co/Pg04bF4/mbappe-real.png" alt="" />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img
                src="https://i.ibb.co/R9Tf6bW/gettyimages-1401702508-612x612.jpg"
                alt=""
              />
            </div>

            <div class="card">
              <img
                src="https://i.ibb.co/cx4QDdf/gettyimages-1715025895-612x612.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img
                src="https://i.ibb.co/cc8Fztf/gettyimages-2003353809-612x612.jpg"
                alt=""
              />
            </div>
            <div class="card">
              <img
                src="https://i.ibb.co/rm05K43/gettyimages-1360149924-612x612.jpg"
                alt=""
              />
            </div>
            <div class="card">
              <img
                src="https://i.ibb.co/k2ZTKfL/gettyimages-523536540-612x612.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img
                src="https://i.ibb.co/Dr8WQR5/gettyimages-1393032559-612x612.jpg"
                alt=""
              />
            </div>
            <div class="card">
              <img
                src="https://i.ibb.co/NSVTLpg/gettyimages-1765625086-612x612.jpg"
                alt=""
              />
            </div>
            <div class="card">
              <img
                src="https://i.ibb.co/Sd6VsTP/gettyimages-1419673558-612x612.jpg"
                alt=""
              />
            </div>
            <div class="card">
              <img
                src="https://i.ibb.co/cLfttCw/gettyimages-1490061795-612x612.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img
                src="https://i.ibb.co/N13XQZM/gettyimages-1474384639-612x612.jpg"
                alt=""
              />
            </div>
            <div class="card">
              <img
                src="https://i.ibb.co/Bjp4P63/gettyimages-1474598436-612x612.jpg"
                alt=""
              />
            </div>
            <div class="card">
              <img
                src="https://i.ibb.co/8DtSthD7/Ousmane-Dembe-le-Getty-Images.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
