import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { APP_CONFIG_VARIABLES } from '@/lib/constant/constant';
import { toaster } from '@/components/ui/toaster';
import type { Todo } from '../types';

const TODOS_KEY = ['todos'];

export function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: TODOS_KEY,
    queryFn: async (): Promise<Todo[]> => {
      const res = await fetch(APP_CONFIG_VARIABLES.API_GO_URL_GET_TODOS);
      if (!res.ok) throw new Error('Failed to fetch todos');
      return (await res.json()) ?? [];
    },
  });

  const createTodo = useMutation({
    mutationKey: ['create-todo'],
    mutationFn: async (body: string) => {
      const res = await fetch(APP_CONFIG_VARIABLES.API_GO_URL_CREATE_TODO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) throw new Error('Failed to create todo');
      return res.json();
    },
    onSuccess: () => {
      toaster.success({ title: 'Tarea creada con éxito', closable: true });
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
    onError: () =>
      toaster.error({ title: 'Hubo un error al crear la tarea', closable: true }),
  });

  const updateTodo = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(APP_CONFIG_VARIABLES.API_GO_URL_UPDATE_TODO + id, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to update todo');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(APP_CONFIG_VARIABLES.API_GO_URL_DELETE_TODO + id, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete todo');
      return res.json();
    },
    onSuccess: () => {
      toaster.success({ title: 'Tarea eliminada con éxito', closable: true });
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
  });

  return { todosQuery, createTodo, updateTodo, deleteTodo };
}