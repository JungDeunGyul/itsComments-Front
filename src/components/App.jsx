import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";

import useUserStore from "../store/useUser.js";
import Dashboard from "./Dashboard/index.jsx";
import SingleView from "./SingleView/index.jsx";
import Friends from "./Friends/index.jsx";

function App() {
  const { setUserData } = useUserStore();
  const [loginCheck, setLoginCheck] = useState("loading");

  useEffect(() => {
    function getTokenFromCookie() {
      const cookies = document.cookie.split(";");
      const authTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("authToken="),
      );

      return authTokenCookie
        ? authTokenCookie.trim().substring("authToken=".length)
        : null;
    }

    const token = getTokenFromCookie();

    async function verifyToken() {
      if (!token) {
        setLoginCheck("fail");
      }
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/login/client`,
          { token },
          { withCredentials: true },
        );

        const user = res.data.user;

        setUserData(user);
        setLoginCheck("success");
      } catch (error) {
        console.log("Login error:", error);
        setLoginCheck("fail");
      }
    }

    verifyToken();
  }, []);

  if (loginCheck === "loading") {
    return <div className="font-bold m-80">로딩중입니다...</div>;
  }

  if (loginCheck === "fail") {
    return (
      <div className="font-bold m-80 text-red-500">
        로그인에 실패하였습니다...
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/single" exact element={<SingleView />} />
        <Route path="/friend" exact element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;
