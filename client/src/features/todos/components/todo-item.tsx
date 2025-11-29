import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"
import type { Todo } from "../types"
import { FaCheckCircle } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useColorMode } from "@/components/ui/color-mode"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { APP_CONFIG_VARIABLES } from "@/lib/constant/constant"


function TodoItem({todo}: {todo: Todo}) {
    const { colorMode } = useColorMode()

    const queryClient = useQueryClient()

    const {mutate: updateTodo, isPending: isUpdating} = useMutation({
        mutationKey: ['update-todo'],
        mutationFn: async () => {
            if (todo.completed) return toaster.warning({
                title: "Esta tarea ya está completada",
                closable: true,
            });

            try {
                const res = await fetch(APP_CONFIG_VARIABLES.API_GO_URL_UPDATE_TODO + todo._id,{
                    method: 'PATCH'
                })

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();
                return data;
            } catch (error) {
                console.error(error as Error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    })

    const {mutate: deleteTodo, isPending: isDeleting} = useMutation({
        mutationKey: ['delete-todo'],
        mutationFn: async () => {


            try {
                const res = await fetch(APP_CONFIG_VARIABLES.API_GO_URL_DELETE_TODO + todo._id,{
                    method: 'DELETE'
                })

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();
                return data;
            } catch (error) {
                console.error(error as Error);
            }
        },
        onSuccess: () => {
            toaster.success({
                title: "Tarea eliminada con éxito",
                closable: true,
            });
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    })

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
                <Box color="gray.400" cursor={"pointer"} onClick={() => updateTodo()}>
                    {isUpdating ? <Spinner /> : <FaCheckCircle color={todo.completed ? "green" : "gray"} cursor={"pointer"}/>}
                </Box>
                <Box color={"red.400"} cursor={"pointer"} onClick={() => deleteTodo()}>
                    {isDeleting ? <Spinner /> : <MdDelete />}
                </Box>
            </Flex>

        </Flex>
    )
}

export default TodoItem