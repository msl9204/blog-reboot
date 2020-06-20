import React, { useState } from "react";
import ReactMarkdown from "react-markdown/with-html";

import styled from "styled-components";
import showdown from "showdown";

import useStorage from "../../hooks/useStorage";

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

const TestDownload = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid black;
`;

export default function EditPage() {
    const [Content, setContent] = useState("");
    const [Title, setTitle] = useState("");

    const storage = useStorage("myFile.txt");

    const saveToHtml = (html) => {
        const converter = new showdown.Converter();
        const result = converter.makeHtml(html);

        const element = document.createElement("a");
        const file = new Blob([result], { type: "text/plain" });
        console.log(file);
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        element.click();
    };

    // <ReactMarkdown source={markdown} escapeHtml={false} />

    return (
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
            <TestDownload onClick={() => saveToHtml(Content)}>
                Download!
            </TestDownload>
        </EditContainer>
    );
}
