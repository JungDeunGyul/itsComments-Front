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
      <div className="font-bold text-red-500 m-80">
        로그인에 실패하였습니다...
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
