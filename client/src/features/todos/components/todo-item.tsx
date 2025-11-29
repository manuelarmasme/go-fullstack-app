import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react"
import { Toaster } from "@/components/ui/toaster"
import type { Todo } from "../types"
import { FaCheckCircle } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useColorMode } from "@/components/ui/color-mode"
import { useTodos } from "../hooks/useTodos"


function TodoItem({todo}: {todo: Todo}) {
    const { colorMode } = useColorMode()

    const { updateTodo, deleteTodo } = useTodos()

    const {mutate: updateTodoMutate, isPending: isUpdating} = updateTodo
    const {mutate: deleteTodoMutate, isPending: isDeleting} = deleteTodo

    return (
        <Flex gap={2} alignItems={"center"} bg={colorMode === "light" ? "gray.700" : "gray.700"} p={3} borderRadius={"lg"}>
            <Toaster />
            <Flex flex={1} alignItems={"center"} border={"1px"} borderRadius={"lg"} borderColor={"gray.600"} justifyContent={"space-between"}>
                <Text color={todo.completed ? "green.200" : "yellow.100"} textDecoration={todo.completed ? "line-through" : "none"}>{todo.body}</Text>

                {todo.completed ? (
                    <Badge ml={1} colorPalette="green">Done</Badge>
                ) : (
                    <Badge ml={1} colorPalette="red">Pending</Badge>
                )}
            </Flex>

            <Flex gap={2} alignItems={"center"}>
                <Box color="gray.400" cursor={"pointer"} onClick={() => updateTodoMutate(todo._id)}>
                    {isUpdating ? <Spinner /> : <FaCheckCircle color={todo.completed ? "green" : "gray"} cursor={"pointer"}/>}
                </Box>
                <Box color={"red.400"} cursor={"pointer"} onClick={() => deleteTodoMutate(todo._id)}>
                    {isDeleting ? <Spinner /> : <MdDelete />}
                </Box>
            </Flex>

        </Flex>
    )
}

export default TodoItem