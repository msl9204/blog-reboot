import ReactDOM from "react-dom";

export default function ModalPortal({ children }) {
    const el = document.getElementById("modal");

    return ReactDOM.createPortal(children, el);
}
