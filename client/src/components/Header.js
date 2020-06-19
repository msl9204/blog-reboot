import React from "react";
import styled, { keyframes } from "styled-components";

const FromTop = keyframes`
    0%{
        transform: translatey(-100px);
        opacity: 0;
    }
    100%{
        transform: translatey(0px);
        opacity: 1;
    }
`;

const RightToLeft = keyframes`
    0% {
        transform: translatex(100px);
        opacity: 0;
}
    100% {
        transform: translatex(0px);
        opacity: 1;
}
`;

const HeaderContainer = styled.div`
    display: flex;
    width: 50%;
    margin: 30px 0;
    justify-content: space-between;
`;

const HeaderContents = styled.div`
    font-size: 1.5rem;
    animation: ${FromTop} 0.5s;
`;

const AboutPostContainer = styled.div`
    display: flex;
`;

const AboutPostContents = styled(HeaderContents)`
    margin: 0 30px;
    animation: ${RightToLeft} 2s;
`;

export default function Header() {
    return (
        <HeaderContainer>
            <HeaderContents>MinSooBlog</HeaderContents>
            <AboutPostContainer>
                <AboutPostContents>About</AboutPostContents>
                <AboutPostContents>Post</AboutPostContents>
            </AboutPostContainer>
        </HeaderContainer>
    );
}
