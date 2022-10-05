
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import {
  googleLoginRoute,
  googleRegisterRoute,
  loginRoute,
  registerRoute,
} from "../utils/APIRoutes";
import { signInWithGoogle } from "../../firebase";

const FormContainer = styled.div`
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");

  * {
    box-sizing: border-box;
  }

  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebecf0;
  overflow: hidden;

  .container {
    border-radius: 10px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
    position: absolute;
    width: 768px;
    min-height: 480px;
    overflow: hidden;
  }
  form {
    background: #ebecf0;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  form input {
    background: #eee;
    padding: 16px;
    margin: 8px 0;
    width: 85%;
    border: 0;
    outline: none;
    border-radius: 20px;
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  }
  button {
    border-radius: 20px;
    border: none;
    outline: none;
    font-size: 12px;
    font-weight: bold;
    padding: 15px 45px;
    margin: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 80ms ease-in;
  }
  .form_btn {
    box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
  }
  .form_btn:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
  .overlay_btn {
    background-color: #ff4b2b;
    color: #fff;
    box-shadow: -5px -5px 10px #ff6b3f, 5px 5px 8px #bf4b2b;
  }
  .sign-in-container {
    position: absolute;
    left: 0;
    width: 50%;
    height: 100%;
    transition: all 0.5s;
  }
  .sign-up-container {
    position: absolute;
    left: 0;
    width: 50%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
  }
  .overlay-left {
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    opacity: 0;
    background-color: #ff4b2b;
    color: #fff;
    transition: all 0.5s;
  }
  .overlay-right {
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: #ff4b2b;
    color: #fff;
    transition: all 0.5s;
  }
  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
    opacity: 0;
  }
  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 2;
  }
  .container.right-panel-active .overlay-right {
    transform: translateX(-100%);
    opacity: 0;
  }
  .container.right-panel-active .overlay-left {
    transform: translateX(-100%);
    opacity: 1;
    z-index: 2;
  }
  .social-links {
    margin: 20px 0;
  }
  form h1 {
    font-weight: bold;
    margin: 0;
    color: #000;
  }

  p {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }
  span {
    font-size: 12px;
    color: #000;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }
  .social-links div {
    width: 40px;
    height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    border-radius: 50%;
    box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
    cursor: pointer;
  }
  .social-links a {
    color: #000;
  }
  .social-links div:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;

export default function Login() {
  const [isContainerActive, setIsContainerActive] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nick: "",
    email: "",
    password: "",
  });

  const signInBtn = () => {
    setValues({ nick: "", email: "", password: "" });
    setIsContainerActive(false);
  };

  const signUpBtn = () => {
    setValues({ nick: "", email: "", password: "" });
    setIsContainerActive(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setValues({ nick: "", email: "", password: "" });

    try {
      const response = await signInWithGoogle();

      if (isContainerActive) {
        const { data } = await axios.post(googleRegisterRoute, {
          nick: response.user.displayName,
          email: response.user.email,
        });

        if (data.status === false) {
          return alert(data.message);
        }

        setIsContainerActive(false);
        return alert("회원가입 완료");
      } else {
        const { data } = await axios.post(googleLoginRoute, {
          nick: response.user.displayName,
          email: response.user.email,
          password: "googlePassword",
        });

        if (data.status === false) {
          return alert(data.message);
        }

        localStorage.setItem("docs-app-user", JSON.stringify(data.accessToken));
        return navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nick, email, password } = values;
    if (isContainerActive) {
      const { data } = await axios.post(registerRoute, {
        nick,
        email,
        password,
      });

      if (data.status === false) {
        return alert(data.message);
      }

      setIsContainerActive(false);
      return alert("회원가입 완료");
    } else {
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });

      if (data.status === false) {
        return alert(data.message);
      }

      localStorage.setItem("docs-app-user", JSON.stringify(data.accessToken));
      return navigate("/");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <div
        className={`container${isContainerActive ? " right-panel-active" : ""}`}
      >
        <div className="sign-up-container">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1>회원가입</h1>
            <div className="social-links">
              <div onClick={(e) => handleClick(e)}>
                <i className="fa fa-google" aria-hidden="true"></i>
              </div>
            </div>
            <span>이메일로 가입하기</span>
            <input
              type="text"
              placeholder="Name"
              name="nick"
              value={values.nick}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              value={values.password}

              onChange={(e) => handleChange(e)}
            />
            <button className="form_btn">회원가입</button>
          </form>
        </div>
        <div className="sign-in-container">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1>로그인</h1>
            <div className="social-links">
              <div onClick={(e) => handleClick(e)}>
                <i className="fa fa-google" aria-hidden="true"></i>
              </div>
            </div>
            <span>계정이 있으신가요?</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              value={values.password}
              onChange={(e) => handleChange(e)}
            />
            <button className="form_btn">로그인하기</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay-left">
            <h1>안녕하세요!</h1>
            <p>개인 아이디가 있으신가요? 아래 버튼을 통해 로그인을 해주세요</p>
            <button id="signIn" className="overlay_btn" onClick={signInBtn}>
              로그인하기
            </button>
          </div>
          <div className="overlay-right">
            <h1>안녕하세요!</h1>
            <p>문서를 작업 하시고 싶으시다면 회원가입을 해 주세요</p>
            <button id="signUp" className="overlay_btn" onClick={signUpBtn}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}
