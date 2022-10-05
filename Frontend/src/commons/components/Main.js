import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import { mainRoute } from "../utils/APIRoutes";
import DocsList from "./DocsList";

export default function Main() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    nick: "",
    id: "",
  });
  const [docsData, setDocsData] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("docs-app-user");

      if (!token) {
        return navigate("/login");
      }

      await axios.get(mainRoute, {
        headers: {
            "Authorization": token
        }
      });
      const user = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      setUserData({ email: user.email, nick: user.name, id: user.id });
    };
    getUser();
  }, []);

  useEffect(() => {
    const getDocsData = async () => {
      const docsArray = await axios.get(mainRoute);
      setDocsData(docsArray.data.docses);
    };
    getDocsData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("docs-app-user");

    return navigate("/login");
  };
// <Link to={`/${docsList._id}`} state={{ docsList }}>
  return (
    <div>
      <div>환영합니다. {userData.nick}님</div>
      <div>작성 진행중인 목록입니다.</div>
      {docsData.map((docs, index) => {
        return <DocsList docsList={docs} key={index} />;
      })}
      
      <Link to={`/own/${userData.id}`}>내가 작성한 작업 문서로 이동하기</Link>
      <Link to="/makeDocs">새로운 문서 작성하기</Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button>로그아웃</button>
      </form>
    </div>
  );
}
