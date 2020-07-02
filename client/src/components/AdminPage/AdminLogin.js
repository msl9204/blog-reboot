import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";

const LoginPageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;

    justify-content: center;
    align-items: center;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 800px;

    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.div`
    display: flex;

    align-items: center;
    border: 1px solid black;
    box-sizing: border-box;
    width: 300px;
    height: 50px;
    margin: 15px 0;
    z-index: 100;
`;

const LoginInput = styled.input`
    display: flex;
    height: 100%;
    width: 100%;
    background: none;
    outline-width: 0;
    font-size: 1.2rem;
    border: none;
    z-index: 1;
`;

const LoginButton = styled.div`
    display: flex;
    width: 200px;
    height: 50px;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background: #74b9ff;
    cursor: pointer;
`;

export default function AdminLogin() {
    const auth = useAuth();
    const history = useHistory();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    useEffect(() => {
        if (auth.user) {
            history.push("/admin");
        }
    }, [auth.user]);

    return (
        <LoginPageContainer>
            <LoginContainer>
                관리자 페이지
                <InputContainer>
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        size="lg"
                        style={{ padding: "0 10px", opacity: 0.5 }}
                    />
                    <LoginInput
                        value={Email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></LoginInput>
                </InputContainer>
                <InputContainer>
                    <FontAwesomeIcon
                        icon={faKey}
                        size="lg"
                        style={{ padding: "0 10px", opacity: 0.5 }}
                    />
                    <LoginInput
                        value={Password}
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </InputContainer>
                <LoginButton
                    onClick={() => {
                        auth.signin(Email, Password)
                        .catch((error) =>
                            alert("입력한 정보가 틀렸습니다. 다시 입력해주세요")
                        );
                    }}
                >
                    로그인
                </LoginButton>
            </LoginContainer>
        </LoginPageContainer>
    );
}
