import React from "react";
import styled, { keyframes } from "styled-components";

const hoverBar = keyframes`
    0%{opacity: 0}
    100%{opacity: 1}

`;

const hoverContentsSlide = keyframes`
    0%{transform: translatex(0px)}
    100%{transform: translatex(5px)}

`;

const ContentsContainer = styled.div`
    display: flex;
    width: 50%;
    height: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);

    padding-bottom: 30px;
    margin-top: 30px;

    &:hover {
        color: gray;
        animation: ${hoverContentsSlide} 1s forwards;
        &:before {
            content: "";

            animation: ${hoverBar} 1s;
            border-left: 5px solid #0984e3;
            border-radius: 30px;
        }
    }
`;

const ContentsContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;

    padding: 0px 20px 20px 20px;
`;

const TitleElements = styled.h1``;

const TimeElements = styled.div`
    color: gray;
`;

export default function Contents() {
    return (
        <React.Fragment>
            <ContentsContainer>
                <ContentsContent>
                    <TitleElements>~~~ 정리</TitleElements>
                    <TimeElements>0월0일</TimeElements>
                </ContentsContent>
            </ContentsContainer>
            <ContentsContainer>
                <ContentsContent>
                    <TitleElements>~~~ 정리</TitleElements>
                    <TimeElements>0월0일</TimeElements>
                </ContentsContent>
            </ContentsContainer>
            <ContentsContainer>
                <ContentsContent>
                    <TitleElements>~~~ 정리</TitleElements>
                    <TimeElements>0월0일</TimeElements>
                </ContentsContent>
            </ContentsContainer>
            <ContentsContainer>
                <ContentsContent>
                    <TitleElements>~~~ 정리</TitleElements>
                    <TimeElements>0월0일</TimeElements>
                </ContentsContent>
            </ContentsContainer>
        </React.Fragment>
    );
}
