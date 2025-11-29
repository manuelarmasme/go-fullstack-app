import { APP_CONFIG_VARIABLES } from "@/lib/constant/constant"
import { Button, Flex, Input, Spinner } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useRef, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { Toaster, toaster } from "@/components/ui/toaster"

function TodoForm() {
    const [newTodo, setNewTodo] = useState('')
    const queryClient = useQueryClient()
    const inputRef = useRef<HTMLInputElement>(null)

    const {mutate: createTodo, isPending: isCreating} = useMutation({
        mutationKey: ['create-todo'],
        mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
            try {
                e.preventDefault()

                const response = await fetch(APP_CONFIG_VARIABLES.API_GO_URL_CREATE_TODO, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ body: newTodo }),
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                return data;
            } catch (error) {
                toaster.error({
                    title: "Hubo un error al crear la tarea",
                    closable: true,
                });
            }
        },
        onSuccess: () => {
            setNewTodo('')

            inputRef.current?.focus()
                toaster.success({
                    title: "Tarea creada con éxito",
                    closable: true,
                });

            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    })

    return (
        <form onSubmit={createTodo}>
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
                            createTodo(e as unknown as React.FormEvent<HTMLFormElement>);
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