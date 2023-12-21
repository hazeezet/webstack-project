import { create } from "zustand"
import { Column, Id, Task } from "./type";
import { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import moment from "moment";

interface BoardState {
    columns: Column[];
    tasks: Task[];
    category: string[];
    setBoard: (data: {columns: Column[], tasks: Task[]}) => void;
    updateColumn: (columnIndex: number, value: string) => void;
    deleteColumn: (columnId: Id) => void;
    deleteTask: (taskId: Id) => void;
    sortColumn: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
    sortTask: (activeId: number, overId: number) => void;
    updateTitle: (taskIndex: number, value: string) => void;
    updateDescription: (taskIndex: number, value: string) => void;
    updateDueDate: (taskIndex: number, value: string) => void;
    newColumn: () => void;
    newTask: (columnId: Id) => void;
}

export const useBoard = create<BoardState>((set) => {


    return {
        columns: [],
        tasks: [],
        category: ["In progess", "Listing"],
        setBoard: (data) => set((state) => {
            return {
                columns: data.columns,
                tasks: data.tasks
            }
        }),
        updateColumn: (columnIndex, value) => set((state) => {
            const updatedColumn = [...state.columns];

            updatedColumn[columnIndex] = {
                ...updatedColumn[columnIndex],
                title: value
            };

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                columns: updatedColumn
            }))

            return {
                columns: updatedColumn
            }
        }),
        sortColumn: (activeId, overId) => set((state) => {
            const activeColumnIndex = state.columns.findIndex((col) => col.id === activeId);

            const overColumnIndex = state.columns.findIndex((col) => col.id === overId);

            const updatedColumn = arrayMove(state.columns, activeColumnIndex, overColumnIndex);

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                columns: updatedColumn
            }))

            return {
                columns: updatedColumn
            }
        }),
        sortTask: (activeId, overId) => set((state) => {
            const updatedTask = arrayMove(state.tasks, activeId, overId);

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                tasks: updatedTask
            }))

            return {
                tasks: updatedTask
            }
        }),
        deleteColumn: (columnId) => set((state) => {
            const updatedColumns = state.columns.filter((col) => col.id !== columnId);

            const updatedTasks = state.tasks.filter((t) => t.columnId !== columnId);

            localStorage.setItem("BoardData", JSON.stringify({
                columns: updatedColumns,
                tasks: updatedTasks
            }))

            return {
                columns: updatedColumns,
                tasks: updatedTasks
            }
        }),
        deleteTask: (taskId) => set((state) => {
            const updatedTasks = state.tasks.filter((t) => t.id !== taskId);

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                tasks: updatedTasks
            }))

            return {
                tasks: updatedTasks
            }
        }),
        updateTitle: (taskIndex, value) => set((state) => {
            const updatedTasks = [...state.tasks];

            updatedTasks[taskIndex] = {
                ...updatedTasks[taskIndex],
                title: value
            };

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                tasks: updatedTasks
            }))

            return {
                tasks: updatedTasks
            }
        }),
        updateDescription: (taskIndex, value) => set((state) => {
            const updatedTasks = [...state.tasks];

            updatedTasks[taskIndex] = {
                ...updatedTasks[taskIndex],
                description: value
            };

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                tasks: updatedTasks
            }))

            return {
                tasks: updatedTasks
            }
        }),
        updateDueDate: (taskIndex, value) => set((state) => {
            const updatedTasks = [...state.tasks];

            updatedTasks[taskIndex] = {
                ...updatedTasks[taskIndex],
                dueDate: value
            };

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                tasks: updatedTasks
            }))

            return {
                tasks: updatedTasks
            }
        }),
        newColumn: () => set((state) => {
            const columnToAdd: Column = {
                id: Math.floor(Math.random() * 10001),
                title: `Column ${state.columns.length + 1}`,
            };
            const updatedColumn = [...state.columns, columnToAdd];

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                columns: updatedColumn
            }))

            return {
                columns: updatedColumn
            }
        }),
        newTask: (columnId) => set((state) => {
            const now = moment();
            const taskToAdd: Task = {
                id: Math.floor(Math.random() * 10001),
                columnId,
                title: `Title ${state.tasks.length + 1}`,
                category: {
                    content: "new",
                    background: "yellow"
                },
                description: `Task ${state.tasks.length + 1}`,
                dueDate: moment.tz(now.add(2, 'days'), process.env.NEXT_PUBLIC_TIMEZONE as string).format('MMM DD, YYYY')
            };
            const updatedTask = [...state.tasks, taskToAdd];

            localStorage.setItem("BoardData", JSON.stringify({
                ...state,
                tasks: updatedTask
            }))

            return {
                tasks: updatedTask
            }
        })
    }
})
