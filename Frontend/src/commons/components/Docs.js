import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { host, typingDocsRoute } from "../utils/APIRoutes";
import useInterval from "../../hooks/intervalHook";
import useVerifyToken from "../../hooks/veifyHook";

const TextContainer = styled.div`
  textarea {
    width: 100%;
    height: 700px;
    resize: vertical;
  }
`;

export default function Docs() {
  const [text, setText] = useState("");
  const [docsData, setDocsData] = useState("");
  const [socket, setSocket] = useState(undefined);
  const [isChanging, setIsChanging] = useState(false);
  const location = useLocation();
  const { id: documentId } = useParams();

  useVerifyToken();

  useEffect(() => {
    if (socket === undefined) return;

    socket.emit("get-document", documentId);
  }, [socket, documentId]);

  useEffect(() => {
    const newSocket = io(host);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === undefined) return;

    socket.emit("send-text", text);
  }, [socket, isChanging]);

  useEffect(() => {
    if (socket === undefined) return;

    socket.on("receive-changes", (data) => {
      setText(data);
    });
    setIsChanging(false);

    return () => {
      socket.off("recieve-changes");
    };
  }, [socket, isChanging]);

  useEffect(() => {
    const docs = location.state.docsList;
    setDocsData(docs);

    if (docs.content) {
      return setText(docs.content);
    }
  }, [location.state.docsList]);

  const handleSetValue = (e) => {
    if (!isChanging) {
      setIsChanging(true);
    }

    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${typingDocsRoute}/${docsData._id}`, {
      typingText: text,
      _id: docsData._id,
    });
  };

  useInterval(async () => {
    await axios.post(`${typingDocsRoute}/${docsData._id}`, {
      typingText: text,
      _id: docsData._id,
    });
  }, [20000]);

  return (
    <TextContainer>
      <div>
        <h2>{docsData.title}</h2>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button>저장</button>
        <textarea
          rows="auto"
          cols="100"
          name="typingText"
          value={text}
          onChange={(e) => handleSetValue(e)}
        ></textarea>
      </form>
      <Link to="/">문서 목록으로 돌아가기</Link>
    </TextContainer>
  );
}
