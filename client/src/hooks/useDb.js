import React, { useState, useEffect } from "react";
import { firestore_db } from "../cloud/firebase_init";

export default function useDb() {
    const [Data, setData] = useState([]);

    const postsRef = firestore_db.collection("posts");

    useEffect(() => {
        postsRef
            .get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                }

                setData(snapshot.docs);
            })
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }, []);

    const getContent = (id) => {
        const postRef = firestore_db.collection("posts").doc(id);

        return postRef
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("No such document!");
                } else {
                    return doc.data();
                }
            })
            .catch((err) => {
                console.log("Error getting document", err);
            });
    };

    return { Data, getContent };
}
