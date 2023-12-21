"use client";

import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, KeyboardSensor, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { SortableContext } from "@dnd-kit/sortable";
import { Column, Task } from "@palette/board/type";
import BoardColumn from "@palette/board/column";
import BoardTask from "@palette/board/task";
import Header from "@palette/header";
import { useBoard } from "@palette/board/state";

const defaultColumn: Column[] = [
    {
        id: "todo",
        title: "Todo",
    },
    {
        id: "progress",
        title: "In progress",
    },
    {
        id: "done",
        title: "Done",
    },
]

const defaultTask: Task[] = [
    {
        id: "1",
        columnId: "todo",
        title: "selection of category",
        category: {
            content: "awaiting",
            background: getRandomColor()
        },
        description: "ability to select and change category instead of typing",
        dueDate: "Oct 08, 2023"
    },
    {
        id: "2",
        columnId: "todo",
        title: "Custom category color",
        category: {
            content: "awaiting",
            background: getRandomColor()
        },
        description: "Each category should have different color, should support both light and dark mode",
        dueDate: "Nov 18, 2023"
    },
    {
        id: "3",
        columnId: "progress",
        title: "Fix light mode theme",
        category: {
            content: "doing",
            background: getRandomColor()
        },
        description: "Light theme color is yet to be done, though it is supported. fix it",
        dueDate: "Nov 18, 2023"
    },
    {
        id: "4",
        columnId: "done",
        title: "Task board",
        category: {
            content: "doing",
            background: getRandomColor()
        },
        description: "columns representing different stages of task completion (e.g., To-Do, In Progress, Done",
        dueDate: "Nov 18, 2023"
    },
    {
        id: "5",
        columnId: "done",
        title: "add tasks to the board",
        category: {
            content: "doing",
            background: getRandomColor()
        },
        description: "Each task should have a title, description, category, and due date",
        dueDate: "Nov 18, 2023"
    },
    {
        id: "6",
        columnId: "done",
        title: "edit and delete tasks",
        category: {
            content: "doing",
            background: getRandomColor()
        },
        description: "User should able to edit and delete task",
        dueDate: "Nov 18, 2023"
    },
    {
        id: "7",
        columnId: "done",
        title: "Due Dates",
        category: {
            content: "doing",
            background: getRandomColor()
        },
        description: "Implement a calendar or date picker for setting due dates for tasks. • Highlight overdue tasks for better visibility.",
        dueDate: "Nov 18, 2023"
    },
    {
        id: "8",
        columnId: "done",
        title: "Drag-and-Drop",
        category: {
            content: "doing",
            background: getRandomColor()
        },
        description: "Implement drag-and-drop functionality to allow users to move tasks between different columns",
        dueDate: "Nov 18, 2023"
    },
]

export default function Home() {
    const [columns, tasks, newColumn, sortColumn, sortTask, setBoard] = useBoard(state => [state.columns, state.tasks, state.newColumn, state.sortColumn, state.sortTask, state.setBoard]);

    const [mount, setMount] = useState(false);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("BoardData");
        const taskData = storedData ? JSON.parse(storedData) as { columns: Column[], tasks: Task[] } : { tasks: defaultTask, columns: defaultColumn };
        setBoard(taskData);
        setTimeout(() => setMount(true), 2000);
    }, [])

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );
    const id = useId()

    return (
        <div className="min-h-screen">
            <Header />

            {!mount && (
                <div className="h-screen w-full flex justify-center items-center">
                    <span className="loading loading-dots loading-md"></span>
                </div>
            )}

            {mount && (
                <div className="mt-20 w-full mx-auto">
                    <main className="">

                        <div className="m-auto flex h-max w-full items-center overflow-x-auto custom-scroll overflow-y-hidden px-40 pb-20">
                            <DndContext
                                id={id}
                                sensors={sensors}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                onDragOver={onDragOver}
                            >
                                <div className="m-auto flex gap-4">
                                    <div className="flex gap-4">
                                        <SortableContext items={columnsId}>
                                            {columns.map((col, index) => (
                                                <BoardColumn
                                                    key={col.id}
                                                    column={col}
                                                    columnIndex={index}
                                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                                />
                                            ))}
                                        </SortableContext>
                                    </div>
                                    <button
                                        onClick={newColumn}
                                        className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2 "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Add Column
                                    </button>
                                </div>

                                {mount && createPortal(
                                    <DragOverlay>
                                        {activeColumn && (
                                            <BoardColumn
                                                column={activeColumn}
                                                columnIndex={-0}
                                                tasks={tasks.filter(
                                                    (task) => task.columnId === activeColumn.id
                                                )}
                                            />
                                        )}
                                        {activeTask && (
                                            <BoardTask
                                                task={activeTask}
                                                taskIndex={-0}
                                            />
                                        )}
                                    </DragOverlay>,
                                    document.body
                                )}
                            </DndContext>
                        </div>
                    </main>
                </div>
            )}

        </div>

    )

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        sortColumn(activeId, overId)
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {

            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const overIndex = tasks.findIndex((t) => t.id === overId);

            if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                // Fix introduced after video recording
                tasks[activeIndex].columnId = tasks[overIndex].columnId;
                sortTask(activeIndex, overIndex - 1)
            }

            sortTask(activeIndex, overIndex);

        }

        const isOverAColumn = over.data.current?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);

            tasks[activeIndex].columnId = overId;
            sortTask(activeIndex, activeIndex);

        }
    }
}

//TODO:
function getRandomColor() {
    const randomColor = () => Math.floor(Math.random() * 256);

    const luminance = (r: number, g: number, b: number) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    const color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    const [r, g, b] = color.match(/\d+/g)?.map(Number) as unknown as number[];
    const isLight = luminance(r, g, b) > 0.5;

    // Adjust luminance for better contrast
    const adjustedLuminance = isLight ? luminance(r, g, b) - 0.2 : luminance(r, g, b) + 0.2;

    // Convert back to RGB
    const adjustedColor = `rgb(${Math.round(r * adjustedLuminance)}, ${Math.round(g * adjustedLuminance)}, ${Math.round(b * adjustedLuminance)})`;

    return adjustedColor;
}