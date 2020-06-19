import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const InputField = styled.input`
    width: 50%;
    height: 50px;
    margin-top: 200px;
    font-size: 1.5rem;
`;

const TypeField = styled.textarea`
    margin-top: 30px;
    width: 50%;
    height: 500px;
    font-size: 1rem;
`;
const ShowField = styled.div``;

export default function EditPage() {
    const [Content, setContent] = useState("");
    const [Title, setTitle] = useState("");

    return (
        <React.Fragment>
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
            <ShowField>
                <ReactMarkdown source={Content} />
            </ShowField>
        </React.Fragment>
    );
}
