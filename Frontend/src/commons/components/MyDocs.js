import axios from "axios";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

import { userRoute } from "../utils/APIRoutes";
import DocsList from "./DocsList";
import useVerifyToken from "../../hooks/veifyHook";

export default function MyDocs() {
  const [myDocs, setMyDocs] = useState([]);
  useVerifyToken();

  useEffect(() => {
    const getDocsData = async () => {
      const token = await localStorage.getItem("docs-app-user");
      const user = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      const docsArray = await axios.get(`${userRoute}/${user.id}`);
      setMyDocs(docsArray.data.myDocs);
    };
    getDocsData();
  }, []);

  return (
    <div>
      {myDocs.length === 0 ? (
        <div>만드신 문서가 존재하지 않습니다.</div>
      ) : (
        myDocs.map((docs, index) => {
          return <DocsList docsList={docs} key={index} />;
        })
      )}
      <Link to="/makeDocs">새로운 문서 작성하기</Link>
      <Link to="/">문서 목록으로 돌아가기</Link>
    </div>
  );
}
