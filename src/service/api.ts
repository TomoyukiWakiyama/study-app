import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

export const getSnapTasks = async (setFn: any) => {
  const taskData = collection(db, "tasks");
  const q = query(taskData, orderBy("createdAt", "desc"));
  onSnapshot(q, (querySnapShot) => {
    setFn(querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

export const getSnapProgressTask = async (id: string, setFn: any) => {
  const docRef = doc(db, "tasks", id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  await setFn([{ ...docSnap.data(), id: id }]);
};

export const createTask = async (content: string) => {
  const docRef = await addDoc(collection(db, "tasks"), {
    content: content,
    createdAt: serverTimestamp(),
    endAt: null,
  });
  return docRef.id;
};

export const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, "tasks", id));
};
