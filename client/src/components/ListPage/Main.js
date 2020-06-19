import React, { useEffect } from "react";
import styled from "styled-components";
import Contents from "./Contents";

const IntroduceContainer = styled.div`
    display: flex;
    width: 50%;
    /* border: 1px solid black; */
    height: 200px;

    align-items: center;
    justify-content: center;
`;
const IntroductContents = styled.div`
    font-size: 2rem;
`;

export default function MainPage() {
    return (
        <React.Fragment>
            <IntroduceContainer>
                <IntroductContents>
                    <span role="img" aria-label="book">
                        📚
                    </span>{" "}
                    메인 메세지 입니다.
                </IntroductContents>
            </IntroduceContainer>
            <Contents />
        </React.Fragment>
    );
}
