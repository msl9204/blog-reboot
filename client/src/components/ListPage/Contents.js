import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useDb from "../../hooks/useDb";
import { Link } from "react-router-dom";
import moment from "moment";

const hoverBar = keyframes`
    0%{opacity: 0}
    100%{opacity: 1}

`;

const hoverContentsSlide = keyframes`
    0%{transform: translatex(0px)}
    100%{transform: translatex(5px)}

`;

const ContentsContainer = styled(Link)`
    display: flex;
    width: 50%;
    height: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);

    padding-bottom: 30px;
    margin-top: 30px;

    text-decoration: none;
    color: black;

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

function RenderElements({ id, title, timestamp }) {
    const UnixTimeToDate = (time) => {
        return moment(time).calendar();
    };

    console.log(timestamp);

    return (
        <ContentsContainer to={`/detail/${id}`}>
            <ContentsContent>
                <TitleElements>{title}</TitleElements>
                <TimeElements>{UnixTimeToDate(timestamp)}</TimeElements>
            </ContentsContent>
        </ContentsContainer>
    );
}

export default function Contents() {
    const db = useDb();
    const [Data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setData(await db.getContentList());
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            {Data &&
                Data.map((doc) => {
                    return (
                        <RenderElements
                            key={doc.id}
                            id={doc.id}
                            title={doc.data().title}
                            timestamp={doc.data().timestamp}
                        />
                    );
                })}
        </React.Fragment>
    );
}
