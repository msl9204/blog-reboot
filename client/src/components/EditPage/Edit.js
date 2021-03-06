import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown/with-html";

import styled from "styled-components";

import useDb from "../../hooks/useDb";
import useStorage from "../../hooks/useStorage";
import { useHistory, useParams } from "react-router-dom";

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

    height: 700px;
    font-size: 1rem;
    align-self: flex-start;
`;

const PreviewContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    padding: 30px;
`;

const ShowTitle = styled.h1``;

const ShowField = styled.div``;

const ButtonContainer = styled.div`
    display: flex;
    align-self: flex-start;
`;

const UploadButton = styled.div`
    margin: 30px 10px;
    width: 100px;
    height: 50px;
    border-radius: 30px;
    background: #3498db;
    line-height: 45px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
`;

const CancelButton = styled(UploadButton)`
    background: #ff7675;
`;

export default function EditPage() {
    const [Content, setContent] = useState("");
    const [Title, setTitle] = useState("");
    const { id } = useParams();
    const history = useHistory();
    const db = useDb();
    const storage = useStorage();

    const saveTofile = async () => {
        const file = new Blob([Content], { type: "text/plain" });

        return file;
    };

    const forEditFetchData = async (id) => {
        if (id) {
            // 수정하는 경우,
            const Data = await db.getContent(id);
            storage.getMdFile(`${id}.txt`);

            setTitle(Data.title);
        } else {
            // 새로작성하는 경우
            return;
        }
    };
    // 이런부분 redux로 구현하면 편할듯
    useEffect(() => {
        setContent(storage.Markdown);
    }, [storage.Markdown]);

    useEffect(() => {
        forEditFetchData(id);
    }, [id]);

    const dataProcessing = async () => {
        const file = await saveTofile();
        const sendData = { title: Title };

        if (id) {
            // 수정하는 경우,
            await db.editContent(id, sendData);
            storage.uploadMdfile(id, file);
        } else {
            // 새로작성하는 경우,
            const getWrittenId = await db.writeContent(sendData);
            storage.uploadMdfile(getWrittenId, file);
        }

        history.push("/admin");
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
                    <ButtonContainer>
                        <UploadButton onClick={() => dataProcessing()}>
                            쓰기
                        </UploadButton>
                        <CancelButton onClick={() => history.push("/admin")}>
                            취소
                        </CancelButton>
                    </ButtonContainer>
                </WriteContainer>
                <PreviewContainer>
                    <ShowTitle>{Title}</ShowTitle>
                    <ShowField>
                        <ReactMarkdown source={Content} />
                    </ShowField>
                </PreviewContainer>
            </EditContainer>
        </React.Fragment>
    );
}
