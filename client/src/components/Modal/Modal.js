import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
    display: flex;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
    display: flex;
    background: white;
    border-radius: 20px;
    width: 500px;
    height: 200px;
    align-items: center;
    justify-content: center;
`;

function RenderModal({ content }) {
    return (
        <React.Fragment>
            <ModalContainer>
                <ModalContent className="modal-class">{content}</ModalContent>
            </ModalContainer>
        </React.Fragment>
    );
}

export default function Modal({ isVisible, message }) {
    return (
        <React.Fragment>
            {isVisible && <RenderModal content={message} />}
        </React.Fragment>
    );
}
