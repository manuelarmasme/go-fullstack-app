import { Container, Stack } from '@chakra-ui/react'
import Navbar from './components/ui/navbar';
import TodoForm from './features/todos/components/todo-form';
import TodoList from './features/todos/components/todo-list';

function App() {

  return (
    <Stack h="100vh" w="90vw" mx={"auto"} alignContent={"center"}>
      <Navbar />
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  )
}

export default App
