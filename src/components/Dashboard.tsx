import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "./parts/Header";
import { getSnapTasks, createTask, deleteTask } from "../service/api";

type TypeTasks = {
  id: number;
  content: string;
  createdAt: any;
};
const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TypeTasks[]>([]);

  const [taskName, setTaskName] = useState("");
  const [progressTaskId, setProgressTaskId] = useState("");

  useEffect(() => {
    const getTaskAPI = async () => {
      await getSnapTasks(setTasks);

      console.log("get SnapShot");
    };
    getTaskAPI();
    console.log("useEffect called!");
  }, []);

  // handle
  const handleCreateTask = async (taskName: string) => {
    const progressId = await createTask(taskName);
    console.log(
      "🚀 ~ file: Dashboard.tsx ~ line 11 ~ createTaskAPI ~ progressId",
      progressId
    );
    setProgressTaskId(progressId);
    console.log(tasks);
    console.log("create New Task!");
    setTaskName("");
  };
  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    console.log("Success Delete!");
  };

  return (
    <>
      <Header />
      <Box px={4} h="calc(100vh - 60px)" overflowY="scroll">
        <Box w="90%" mx="auto">
          <Box mt={8}>
            <Box>
              <Text>タスク名</Text>
              <Input
                mt={2}
                value={taskName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTaskName(e.target.value)
                }
              />
            </Box>
            <Flex mt={4} justifyContent="space-around">
              <Button w="40%" onClick={() => handleCreateTask(taskName)}>
                START
              </Button>
              <Button w="40%">STOP</Button>
            </Flex>
          </Box>

          <Box mt={8}>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>TaskName</Th>
                    <Th>Start</Th>
                    <Th>END</Th>
                    <Th>TOTAL</Th>
                    <Th>DELETE</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tasks?.map((task) => {
                    return (
                      <Tr key={task.id}>
                        <Td>{task.content}</Td>
                        {/* <Td>{task.createdAt}</Td> */}
                        <Td>
                          {new Date(task.createdAt?.toDate()).toLocaleString()}
                        </Td>
                        <Td>16:53</Td>
                        <Td>2:23</Td>
                        <Td>
                          <Button onClick={() => handleDeleteTask(task.id)}>
                            Del
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
