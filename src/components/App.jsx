import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import useUserStore from "../store/useUser.js";
import useCommentsStore from "../store/useComments.js";
import Header from "./Header";
import Dashboard from "./Dashboard/index.jsx";
import SingleView from "./SingleView/index.jsx";
import Friends from "./Friends/index.jsx";
import { SingleComment } from "./SingleComment/SingleComment.jsx";

function App() {
  const { setUserData } = useUserStore();
  const { setUserComments } = useCommentsStore();
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

        setUserComments({
          createdComments: user.createdComments,
          receivedComments: user.receivedComments,
          feedComments: user.feedComments,
        });

        setLoginCheck("success");
      } catch (error) {
        setLoginCheck("fail");
      }
    }

    verifyToken();
  }, []);

  if (loginCheck === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
          <p className="text-xl font-bold text-gray-700">로딩중입니다...</p>
        </div>
      </div>
    );
  }

  if (loginCheck === "fail") {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center p-8 rounded-lg shadow-lg bg-white">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            로그인에 실패하였습니다
          </h1>
        </div>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen overflow-hidden">
      <Header className="fixed top-0 left-0" />
      <div className="w-full h-full">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/single" exact element={<SingleView />} />
          <Route path="/friend" exact element={<Friends />} />
          <Route
            path="/comments/:commentId"
            exact
            element={<SingleComment />}
          />
        </Routes>
      </div>
    </main>
  );
}

export default App;
