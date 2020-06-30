import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ModalPortal from "../Modal/ModalPortal";
import Modal from "../Modal/Modal";
import { useHistory } from "react-router-dom";
import useDb from "../../hooks/useDb";
import useStorage from "../../hooks/useStorage";

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

let SelectList = [];

const RenderLists = ({ id, item }) => {
    const [isCheck, setIsCheck] = useState(false);

    function onClickEvent(prev, id) {
        setIsCheck((prev) => {
            return !prev;
        });

        if (prev === false) {
            SelectList.push(id);
        } else {
            const find_index = SelectList.indexOf(id);
            SelectList.splice(find_index, 1);
        }
    }

    return (
        <ListContent
            onClick={() => {
                onClickEvent(isCheck, id);
            }}
        >
            <CheckBox isCheck={isCheck} />
            {item}
        </ListContent>
    );
};

// TODO : 아무것도 체크안했을 때 모달창 만들기 => Done
// 글 삭제는 여러개 선택가능 하고, 글 수정은 하나만 선택해야함. (여러개 선택 시 modal 띄워서 재선택하게) => Done
// 체크유무에 따라 reference 처리 어떻게 할지 생각해보기. => 해야함. 선택한 reference들 가져오기 => reference랑 상관있나?? 그냥 isCheck true 인것들 id값 list에 저장해두고, false이면 pop 시키면 될듯??
// 날짜순으로 정렬되게 하기.
export default function AdminPage() {
    const db = useDb();
    const storage = useStorage();
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [DataList, setDataList] = useState(null);
    const [ButtonCheck, setButtonCheck] = useState(0);
    const history = useHistory();

    const fetchData = async () => {
        const data = await db.getContentList();
        setDataList(data);
    };
    console.log(ButtonCheck);
    useEffect(() => {
        SelectList = [];

        fetchData();
    }, [ButtonCheck]);

    async function checkModalRender(list, type = "edit") {
        if (list.length === 0) {
            setMessage("선택한 항목이 없습니다. 선택해주세요!");
            setIsVisible((prev) => !prev); // modal창 보여주는 부분
        } else if (list.length >= 2 && type === "edit") {
            setMessage("수정하실 1개 게시물만 선택해주세요!");
            setIsVisible((prev) => !prev);
        } else {
            // 조건에 문제가 없을 때 처리 => TODO : 삭제 되었을 때, 리스트를 다시 불러와야함.
            // 리스트 불러오는거 처리 어떻게 해야함.
            if (type === "delete") {
                await db.deleteContent(list);
                await storage.deleteMdfile(list);
                await setButtonCheck((prev) => prev + 1);
            }
        }
    }

    return (
        <AdminPageContainer
            onClick={(event) => {
                if (
                    isVisible &&
                    !event.target.classList.contains("modal-class")
                ) {
                    setIsVisible((prev) => !prev);
                }
            }}
        >
            <ButtonContainer>
                <WriteButton
                    onClick={() => {
                        history.push("/edit");
                    }}
                >
                    <span>글 쓰기</span>
                </WriteButton>
                <EditButton
                    onClick={() => {
                        checkModalRender(SelectList);
                    }}
                >
                    <span>글 수정</span>
                </EditButton>
                <DeleteButton
                    onClick={() => {
                        checkModalRender(SelectList, "delete");
                    }}
                >
                    <span>글 삭제</span>
                </DeleteButton>
            </ButtonContainer>
            <ListContainer>
                {DataList &&
                    DataList.map((item) => {
                        return (
                            <RenderLists
                                key={item.id}
                                id={item.id}
                                item={item.data().title}
                            />
                        );
                    })}
            </ListContainer>
            <ModalPortal>
                <Modal isVisible={isVisible} message={message} />
            </ModalPortal>
        </AdminPageContainer>
    );
}
