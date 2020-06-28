import React, { useState, useRef } from "react";
import styled from "styled-components";

const AdminPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 50%;
    margin-top: 50px;
`;

const WriteButton = styled.div`
    display: flex;
    margin: 0 10px;
    height: 50px;
    background: #00a8ff;
    border-radius: 15px;

    cursor: pointer;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

const EditButton = styled(WriteButton)`
    background: #78e08f;
`;

const DeleteButton = styled(WriteButton)`
    background: #e84118;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 100px;
`;

const ListContent = styled.div`
    display: flex;
    background: lightgoldenrodyellow;
    height: 50px;
    margin: 10px;
    align-items: center;
    cursor: pointer;
`;

const CheckBox = styled.div`
    border: 2px solid black;
    margin: 0 20px;
    width: 15px;
    height: 15px;

    background: ${(props) => (props.isCheck ? "black" : "white")};
`;

const Lists = ["title1", "title2", "title3", "title4", "title5"];

function RenderLists({ item }) {
    const Ref = useRef();
    const [isCheck, setIsCheck] = useState(false);

    console.log(Ref.current);

    return (
        <ListContent
            ref={Ref}
            onClick={() => {
                setIsCheck((prev) => !prev);
            }}
        >
            <CheckBox isCheck={isCheck} />
            {item}
        </ListContent>
    );
}
// TODO : 아무것도 체크안했을 때 모달창 만들기
// 글 삭제는 여러개 선택가능 하고, 글 수정은 하나만 선택해야함. (여러개 선택 시 modal 띄워서 재선택하게)
// 체크유무에 따라 reference 처리 어떻게 할지 생각해보기.
export default function AdminPage() {
    return (
        <AdminPageContainer>
            <ButtonContainer>
                <WriteButton>
                    <span>글 쓰기</span>
                </WriteButton>
                <EditButton>
                    <span>글 수정</span>
                </EditButton>
                <DeleteButton>
                    <span>글 삭제</span>
                </DeleteButton>
            </ButtonContainer>
            <ListContainer>
                {Lists.map((item) => {
                    return <RenderLists item={item} />;
                })}
            </ListContainer>
        </AdminPageContainer>
    );
}
