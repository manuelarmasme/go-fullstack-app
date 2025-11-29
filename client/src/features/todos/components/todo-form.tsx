import { Button, Flex, Input, Spinner } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { Toaster } from "@/components/ui/toaster"
import { useTodos } from "../hooks/useTodos"

function TodoForm() {
    const [newTodo, setNewTodo] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const { createTodo } = useTodos()

    const { mutate: createTodoMutate, isPending: isCreating} = createTodo

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const trimmed = newTodo.trim();
            if (!trimmed) return;

            createTodoMutate(trimmed, {
            onSuccess: () => {
                setNewTodo('');
                inputRef.current?.focus();
            },
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Toaster />
            <Flex mt={4} gap={2}>
                <Input
                    ref={inputRef}
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new todo"
                    disabled={isCreating}
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                        }
                    }}
                    required
                />
                <Button type="submit" disabled={isCreating || !newTodo.trim()}>
                    {isCreating ?  <Spinner size={"xs"} /> : <>Add Todo <LuPlus /></>}
                </Button>
            </Flex>
        </form>
    )
}

export default TodoForm