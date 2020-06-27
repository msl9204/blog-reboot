import React, { useState } from "react";
import ReactMarkdown from "react-markdown/with-html";

import styled from "styled-components";

import useDb from "../../hooks/useDb";
import useStorage from "../../hooks/useStorage";
import { useHistory } from "react-router-dom";

const EditContainer = styled.div`
    display: flex;

    width: 100%;

    align-self: flex-start;
`;

const WriteContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 50px;
`;

const InputField = styled.input`
    width: 100%;
    height: 50px;
    margin-top: 200px;
    font-size: 1.5rem;
`;

const TypeField = styled.textarea`
    width: 100%;

    margin-top: 30px;

    height: 500px;
    font-size: 1rem;
    align-self: flex-start;
`;

const PreviewContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
`;

const ShowField = styled.div``;

const ButtonContainer = styled.div`
    display: flex;
    align-self: flex-start;
`;

const UploadButton = styled.div`
    margin: 50px 100px;
    width: 100px;
    height: 50px;
    border-radius: 30px;
    background: #3498db;
    line-height: 45px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
`;

export default function EditPage() {
    const [Content, setContent] = useState("");
    const [Title, setTitle] = useState("");
    const history = useHistory();
    const db = useDb();
    const storage = useStorage();

    const saveTofile = async () => {
        const file = new Blob([Content], { type: "text/plain" });

        return file;
    };

    const dataProcessing = async () => {
        const file = await saveTofile();
        const sendData = { title: Title };

        const getWrittenId = await db.writeContent(sendData);
        storage.uploadMdfile(getWrittenId, file);

        history.push("/");
    };

    return (
        <React.Fragment>
            <EditContainer>
                <WriteContainer>
                    <InputField
                        placeholder="title"
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TypeField
                        placeholder="Content"
                        value={Content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </WriteContainer>
                <PreviewContainer>
                    <ShowField>
                        <ReactMarkdown source={Content} />
                    </ShowField>
                </PreviewContainer>
            </EditContainer>
            <ButtonContainer>
                <UploadButton onClick={() => dataProcessing()}>
                    쓰기
                </UploadButton>
            </ButtonContainer>
        </React.Fragment>
    );
}
