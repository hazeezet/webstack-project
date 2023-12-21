import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "@palette/board/type";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import BoardTask from "@palette/board/task";
import { useBoard } from "../state";

interface Props {
    column: Column;
    columnIndex: number;
    tasks: Task[];
}

function BoardColumn({ column, tasks, columnIndex }: Props) {

    const [updateColumn, deleteColumn, newTask] = useBoard(state => [state.updateColumn, state.deleteColumn, state.newTask]);

    const [editMode, setEditMode] = useState(false);
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode,
    });

    const getRandomColor = () => {
        const colors = ['border-t-red-500', 'border-t-blue-500', 'border-t-green-500', 'border-t-yellow-500', 'border-t-pink-500'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
    const borderClass = getRandomColor();
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} className=" bg-columnBackgroundColor opacity-40 border-2 border-pink-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-[#0f150e47] min-w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col pb-5 ${borderClass} border-t-2`}>
            {/* Column title */}
            <div
                {...attributes}
                {...listeners}

                className="text-md h-[60px] cursor-grab rounded-lg p-3 mt-2 mx-2 font-bold flex items-center justify-between bg-base-200">
                <div className="flex gap-2">
                    {!editMode && (
                        <span
                            onClick={() => {
                                setEditMode(true);
                            }}
                            className="cursor-pointer"
                        >
                            {column.title}
                        </span>
                    )}
                    {editMode && (
                        <input
                            className="input input-sm bg-base-200"
                            defaultValue={column.title}
                            autoFocus
                            onBlur={(e) => {
                                updateColumn(columnIndex, e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.shiftKey) {
                                    setEditMode(false);
                                }
                            }}
                        />
                    )}
                </div>
                <button onClick={() => { deleteColumn(column.id) }} className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </button>
            </div>

            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto custom-scroll">
                <SortableContext items={tasksIds}>
                    {tasks.map((task, index) => (
                        <BoardTask
                            key={task.id}
                            task={task}
                            taskIndex={index}
                        />
                    ))}
                </SortableContext>
            </div>

            <button
                className="btn mt-2 mx-2 bg-base-100 hover:bg-base-100"
                onClick={() => {
                    newTask(column.id);
                }}
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
                Add task
            </button>
        </div>
    );
}

export default BoardColumn;
