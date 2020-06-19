import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import useDb from "../../hooks/useDb";
import { useParams } from "react-router-dom";

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 50%;
`;

const DetailTitleContainer = styled.div`
    display: flex;
    height: 200px;
    font-size: 3rem;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const DetailTitleContents = styled(ReactMarkdown)``;

const DetailContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    width: 100%;
    height: auto;
    border: 1px solid black;
`;

const DetailContentsTime = styled.div`
    margin-bottom: 50px;
`;

const DetailContentsContents = styled.div``;

export default function DetailPage() {
    const [Item, setItem] = useState("");
    const { id } = useParams();
    const db = useDb();

    useEffect(() => {
        db.getContent(id).then((doc) => setItem(doc));
    }, []);

    return (
        <React.Fragment>
            {Item && (
                <DetailContainer>
                    <DetailTitleContainer>
                        <DetailTitleContents>{Item.title}</DetailTitleContents>
                    </DetailTitleContainer>
                    <DetailContentsContainer>
                        <DetailContentsTime>Time</DetailContentsTime>
                        <ReactMarkdown source={Item.content} />
                    </DetailContentsContainer>
                </DetailContainer>
            )}
        </React.Fragment>
    );
}
