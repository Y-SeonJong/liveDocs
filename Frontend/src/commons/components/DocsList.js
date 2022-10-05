import React from "react";
import { Link } from "react-router-dom";

import useVerifyToken from "../../hooks/veifyHook";

export default function DocsList({ docsList }) {
  useVerifyToken();

  return (
    <div>
      <div>제목 : {docsList.title}</div>
      <div>만든이 : {docsList.createdByUserId.nick} </div>
      <Link to={`/${docsList._id}`} state={{ docsList }}>
        해당 문서 작업하기
      </Link>
    </div>
  );
}
