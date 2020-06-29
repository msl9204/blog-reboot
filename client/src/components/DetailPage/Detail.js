import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown/with-html";

import styled from "styled-components";
import useDb from "../../hooks/useDb";
import { useParams } from "react-router-dom";
import useStorage from "../../hooks/useStorage";
import moment from "moment";

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
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const DetailTitleContents = styled(ReactMarkdown)``;

const DetailContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    width: 100%;
    height: auto;
`;

const DetailContentsTime = styled.div`
    margin-bottom: 50px;
    color: #bdc3c7;
`;

const DetailContentsContents = styled.div``;

function BreakLine(props) {
    return (
        <div
            style={{
                border: "1px solid #aaa",
                borderRadius: 10,
                paddingLeft: 10,
                margin: 5,
            }}
        >
            {props.children}
        </div>
    );
}

function BlockQuoteBlock(props) {
    return (
        <div
            style={{
                border: "1px dashed #aaa",
                borderRadius: 10,
                paddingLeft: 10,
                margin: 5,
            }}
        >
            {props.children}
        </div>
    );
}

function TableCellBlock(props) {
    let style = {
        textAlign: props.align ? props.align : "center",
        padding: 5,
    };

    if (props.isHeader) {
        style.border = "1px solid #ccc";
        style.borderLeft = 0;
        style.borderRight = 0;
    } else {
        style.borderButtom = "1px solid #eee";
    }

    return <td style={style}>{props.children}</td>;
}

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
                        <DetailContentsTime>
                            {moment(Item.timestamp).calendar()}
                        </DetailContentsTime>
                        <ReactMarkdown
                            source={Data}
                            renderers={{
                                blockquote: BlockQuoteBlock,
                                thematicBreak: BreakLine,
                                tableCell: TableCellBlock,
                            }}
                        />
                    </DetailContentsContainer>
                </DetailContainer>
            )}
        </React.Fragment>
    );
}
