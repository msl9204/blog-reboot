import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const TypeField = styled.textarea`
    width: 500px;
    height: 500px;
`;
const ShowField = styled.div``;

export default function EditPage() {
    const [Text, setText] = useState(null);

    return (
        <React.Fragment>
            <TypeField value={Text} onChange={(e) => setText(e.target.value)} />
            <ReactMarkdown source={Text} />
        </React.Fragment>
    );
}
