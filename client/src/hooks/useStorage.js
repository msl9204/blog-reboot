import { useState } from "react";

import { firebase_storage } from "../cloud/firebase_init";

export default function useStorage() {
    const storage = firebase_storage.ref();

    const getMdFile = (fileName) => {
        const htmlRef = storage.child("html");
        const fileRef = htmlRef.child(fileName);

        fileRef.getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
                var blob = xhr.response;
                console.log(blob);
            };
            xhr.open("GET", url);
            xhr.send();
        });
    };

    return { getMdFile };
}
