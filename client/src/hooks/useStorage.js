import { useState, useEffect } from "react";

import { firebase_storage } from "../cloud/firebase_init";

export default function useStorage() {
    const reader = new FileReader();
    const storage = firebase_storage.ref();
    const [Data, setData] = useState(null);
    const [Markdown, setMarkdown] = useState(null);

    async function BlobToMarkdown() {
        if (Data) {
            reader.onload = function () {
                setMarkdown(reader.result);
            };

            reader.readAsText(Data);
        }
    }

    useEffect(() => {
        BlobToMarkdown();
    });

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

    const deleteMdfile = (fileName) => {
        fileName.forEach((item) => {
            const htmlRef = storage.child(`html/${item}.txt`);

            htmlRef.delete();
        });
    };

    return { Markdown, getMdFile, uploadMdfile, deleteMdfile };
}
