import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import TodoItem from './todo-item';
import { useTodos } from '../hooks/useTodos';

function TodoList() {
    const {todosQuery} = useTodos();
    const { data: todosData, isLoading } = todosQuery;

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