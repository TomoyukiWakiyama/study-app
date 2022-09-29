import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export const getTasks = async () => {
  let tasks: any[] = [];
  const tasksRef = collection(db, "tasks");
  const querySnapshot = await getDocs(tasksRef);

  querySnapshot.forEach((doc) => {
    tasks.push({
      id: doc.id,
      content: doc.data().content,
      createdAt: doc.data().createdAt,
    });
  });
  return tasks;
};

export const createTask = async (content: string) => {
  const docRef = await addDoc(collection(db, "tasks"), {
    content: content,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};
