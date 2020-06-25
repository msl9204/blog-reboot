import { useState } from "react";

import { firebase_storage } from "../cloud/firebase_init";

export default function useStorage() {
    const storage = firebase_storage.ref();
    const [Data, setData] = useState(null);

    const getMdFile = (fileName) => {
        const htmlRef = storage.child("html");
        const fileRef = htmlRef.child(fileName);

        fileRef.getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
                const blob = xhr.response;
                setData(blob);
            };
            xhr.open("GET", url);
            xhr.send();
        });
    };

    const uploadMdfile = (fileName, file) => {
        const htmlRef = storage.child(`html/${fileName}.txt`);
        htmlRef.put(file).then(function (snapshot) {
            console.log("Uploaded a blob or file!");
        });
    };
    // 파일업로드하는 부분 해야함 20.06.25 firestore 문서 생성 후, storage에 id값을 어떻게 줄지???

    return { Data, getMdFile, uploadMdfile };
}
