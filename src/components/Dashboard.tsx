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
import {
  getSnapTasks,
  getSnapProgressTask,
  createTask,
  deleteTask,
} from "../service/api";

type TypeTasks = {
  id: string;
  content: string;
  createdAt: any;
  endAt: any;
};
const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TypeTasks[]>([]);
  const [taskName, setTaskName] = useState("");
  const [progressTask, setProgressTask] = useState<TypeTasks[]>([]);

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
    await getSnapProgressTask(progressId, setProgressTask);

    console.log(progressTask);
    console.log(tasks);
    console.log("create New Task!");
    setTaskName("");
  };
  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    console.log("Success Delete!");
  };
  const handleCheck = () => {
    console.log(progressTask[0].content);
    console.log(progressTask);
  };

  return (
    <>
      <Header />
      <Box px={4} h="calc(100vh - 60px)" overflowY="scroll">
        <Button onClick={handleCheck}>PROGRESS</Button>
        <Box w="90%" mx="auto">
          <Box mt={8}>
            {
              <>
                {/* <Text>タスク名：{progressTask[0].content}</Text> */}
                {/* <Text>
                  開始時間：
                  {progressTask[0].createdAt
                    ? new Date(
                        progressTask[0].createdAt?.toDate()
                      ).toLocaleString()
                    : null}
                </Text> */}
                <Text>終了時間：</Text>
              </>
            }
          </Box>

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
                        <Td>
                          {task.createdAt
                            ? new Date(
                                task.createdAt?.toDate()
                              ).toLocaleString()
                            : null}
                        </Td>
                        <Td></Td>
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
