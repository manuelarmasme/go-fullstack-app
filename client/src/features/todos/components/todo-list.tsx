import type { Todo } from '../types/index';
import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import TodoItem from './todo-item';
import { useQuery } from '@tanstack/react-query';
import { APP_CONFIG_VARIABLES } from '@/lib/constant/constant';

function TodoList() {
    const {data: todosData, isLoading } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: async () => {
            try {
                const response = await fetch(APP_CONFIG_VARIABLES.API_GO_URL_GET_TODOS);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const todos = await response.json();
                return todos ?? [];

            } catch (error) {
                console.error(error as Error);
            }
        }
    })

    return (
        <>
            { isLoading && (
                <Flex flexDirection={"column"} justifyContent="center" alignItems="center" height="100px">
                    <Spinner size="lg" />
                    Cargando tareas...
                </Flex>
            )}

            {!isLoading && todosData?.length === 0 &&(
                <Flex flexDirection={"column"} justifyContent="center" alignItems="center" height="100px">
                    <Text fontSize={"lg"}>No hay tareas disponibles.</Text>
                </Flex>
            )}

            {!isLoading && todosData?.length! > 0 && (

                <Stack gap={3} mt={4}>
                    <Text fontSize={"xl"} fontWeight={"bold"}>Todo List</Text>
                    {todosData?.map((todo, index) =>
                        <TodoItem key={index} todo={todo} />
                    )}
                </Stack>
            )}
        </>
    );
}

export default TodoList;