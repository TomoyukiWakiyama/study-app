import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

// export const getTasks = async () => {
//   let tasks: any[] = [];
//   const tasksRef = collection(db, "tasks");
//   const querySnapshot = await getDocs(tasksRef);

//   querySnapshot.forEach((doc) => {
//     tasks.push({
//       id: doc.id,
//       content: doc.data().content,
//       createdAt: doc.data().createdAt,
//     });
//   });
//   return tasks;
// };

export const getSnapTasks = async (setFn: any) => {
  const taskData = collection(db, "tasks");
  const q = query(taskData, orderBy("createdAt", "desc"));
  onSnapshot(q, (querySnapShot) => {
    setFn(querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

export const createTask = async (content: string) => {
  const docRef = await addDoc(collection(db, "tasks"), {
    content: content,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const deleteTask = async (id: number) => {
  await deleteDoc(doc(db, "tasks", id.toString()));
};
