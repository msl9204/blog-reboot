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
    background: #74b9ff;
    box-shadow: 5px 5px 10px 0px rgba(50, 50, 50, 0.4);
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
    background: #ff7675;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 100px;
`;

const ListContent = styled.div`
    position: relative;
    display: flex;
    background: ${(props) => (props.tabColor ? "#dfe6e9" : "#b2bec3")};

    box-shadow: 5px 5px 3px 0px rgba(50, 50, 50, 0.2);
    height: 50px;
    margin: 7px;
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

const MoveToDetail = styled.div`
    position: absolute;
    font-size: 2rem;
    right: 30px;

    &:hover {
        transition: 0.3s;
        color: #e74c3c;
    }
`;

let SelectList = [];

const RenderLists = ({ id, item, history, tabColor }) => {
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
            tabColor={tabColor}
            onClick={() => {
                onClickEvent(isCheck, id);
            }}
        >
            <CheckBox isCheck={isCheck} />
            {item}
            <MoveToDetail
                onClick={() => {
                    history.push(`/detail/${id}`);
                }}
            >
                →
            </MoveToDetail>
        </ListContent>
    );
};

// TODO : 아무것도 체크안했을 때 모달창 만들기 => Done
// 글 삭제는 여러개 선택가능 하고, 글 수정은 하나만 선택해야함. (여러개 선택 시 modal 띄워서 재선택하게) => Done
// 체크유무에 따라 reference 처리 어떻게 할지 생각해보기. => 해야함. 선택한 reference들 가져오기 => reference랑 상관있나?? 그냥 isCheck true 인것들 id값 list에 저장해두고, false이면 pop 시키면 될듯?? => Done
// TODO : 날짜순으로 정렬되게 하기. 메인List랑 같은 기능. => Done (useDb에서 list 불러오는 곳에서 정렬해서 불러옴.)
// TODO : admin 페이지 권한 있는 사람만 접근할 수 있도록 해야함.

export default function AdminPage() {
    const db = useDb();
    const storage = useStorage();
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [DataList, setDataList] = useState(null);

    const history = useHistory();

    const fetchData = async () => {
        const data = await db.getContentList();
        setDataList(data);
    };

    useEffect(() => {
        SelectList = [];

        setTimeout(() => {
            fetchData();
        }, 1000);
    }, []);

    async function checkModalRender(list, type = "edit") {
        if (list.length === 0) {
            setMessage("선택한 항목이 없습니다. 선택해주세요!");
            setIsVisible((prev) => !prev); // modal창 보여주는 부분
        } else if (list.length >= 2 && type === "edit") {
            setMessage("수정하실 1개 게시물만 선택해주세요!");
            setIsVisible((prev) => !prev);
        } else {
            // 조건에 문제가 없을 때 처리 => TODO : 삭제 되었을 때, 리스트를 다시 불러와야함. => Done
            // 리스트 불러오는거 처리 어떻게 해야함. => Done
            if (type === "delete") {
                // 삭제버튼 누르는 경우 처리사항.
                await db.deleteContent(list);
                await storage.deleteMdfile(list);

                setTimeout(() => {
                    fetchData();
                }, 1000);
            } else {
                // 수정버튼 누르는 경우 처리사항.
                history.push(`/edit/${list[0]}`);
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
                        history.push("/write");
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
                                history={history}
                                tabColor={DataList.indexOf(item) % 2}
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
