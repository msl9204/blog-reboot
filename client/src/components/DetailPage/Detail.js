import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown/with-html";
import styled from "styled-components";
import useDb from "../../hooks/useDb";
import { useParams } from "react-router-dom";
import useStorage from "../../hooks/useStorage";

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
    const [Data, setData] = useState(null);
    const { id } = useParams();
    const db = useDb();
    const storage = useStorage();
    const reader = new FileReader();

    useEffect(() => {
        db.getContent(id).then((doc) => setItem(doc));

        storage.getMdFile(`${id}.txt`);
    }, []);

    if (storage.Data) {
        reader.onload = function () {
            setData(reader.result);
        };

        reader.readAsText(storage.Data);
    }

    return (
        <React.Fragment>
            {Item && (
                <DetailContainer>
                    <DetailTitleContainer>
                        <DetailTitleContents>{Item.title}</DetailTitleContents>
                    </DetailTitleContainer>
                    <DetailContentsContainer>
                        <DetailContentsTime>Date Info Area</DetailContentsTime>
                        <ReactMarkdown source={Data} escapeHtml={false} />
                    </DetailContentsContainer>
                </DetailContainer>
            )}
        </React.Fragment>
    );
}
