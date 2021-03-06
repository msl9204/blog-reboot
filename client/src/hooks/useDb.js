import { firestore_db } from "../cloud/firebase_init";

export default function useDb() {
    const getContentList = () => {
        const postsRef = firestore_db.collection("posts");

        return postsRef
            .orderBy("timestamp", "desc")
            .get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                }

                return snapshot.docs;
            })
            .catch((err) => {
                console.log("Error getting documents", err);
                return;
            });
    };

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

    const writeContent = ({ title }) => {
        const postRef = firestore_db.collection("posts");
        const date = Date.now();

        return postRef
            .add({
                title,
                timestamp: date,
            })
            .then(function (ref) {
                return ref.id;
            });
    };

    const editContent = (id, { title }) => {
        const postRef = firestore_db.collection("posts").doc(id);
        const date = Date.now();
        postRef.update({
            title,
            updated: date,
        });
    };

    const deleteContent = (id) => {
        id.forEach((item) => {
            const postRef = firestore_db.collection("posts").doc(item);
            postRef.delete();
        });
    };

    return {
        getContentList,
        getContent,
        writeContent,
        deleteContent,
        editContent,
    };
}
