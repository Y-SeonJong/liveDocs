import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import { makeDocsRoute } from "../utils/APIRoutes";
import useVerifyToken from "../../hooks/veifyHook";

export default function MakeDocs() {
  const [values, setValues] = useState({
    title: "",
  });
  const navigate = useNavigate();

  useVerifyToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title } = values;
    const token = localStorage.getItem("docs-app-user");
    const user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    await axios.post(makeDocsRoute, {
      title,
      createdByUserId : user.id
    });

    return navigate("/");
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>생성하실 문서의 제목을 입력해주세요</div>
        <input
          type="text"
          placeholder="제목"
          name="title"
          onChange={(e) => handleChange(e)}
        />
        <button>제출</button>
      </form>
      <Link to="/">문서 목록으로 돌아가기</Link>
    </div>
  );
}
