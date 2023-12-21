import { useEffect, useState } from "react";
import { Id, Task } from "@palette/board/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai"
import DateRange from "./date";
import { useBoard } from "../state";

interface Props {
    task: Task;
    taskIndex: number;
}

function BoardTask({ task, taskIndex }: Props) {

    const [updateTiltle, updateDescription, deleteTask] = useBoard(state => [state.updateTitle, state.updateDescription, state.deleteTask]);

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [update, setUpdate] = useState(task);

    const updateCategory = () => {

    }


    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-base-200 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-base-100 cursor-grab relative"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-base-200 transition-all duration-75 px-3 text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-base-100 cursor-grab"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={(e) => {
                setMouseIsOver(false);
            }}
        >

            {/* TASK CATEGORY */}
            <div className="flex w-full items-center justify-between my-3">
                {!editMode && (
                    <div className="badge bg-orange-500">{task.category.content}</div>
                )}

                {editMode && (
                    <input className="input input-sm w-max bg-base-200 input-bordered" defaultValue={task.category.content} placeholder="category"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.shiftKey) {
                                toggleEditMode();
                            }
                        }}
                    />
                )}

                {mouseIsOver && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                deleteTask(task.id);
                            }}
                            className="stroke-white rounded opacity-60 hover:opacity-100"
                        >
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

                        {!editMode && (
                            <button
                                onClick={toggleEditMode}
                                className="stroke-white rounded opacity-60 hover:opacity-100"
                            >
                                <FaEdit className="w-6 h-6" />
                            </button>
                        )}

                        {editMode && (
                            <button
                                onClick={toggleEditMode}
                                className="stroke-white rounded opacity-60 hover:opacity-100"
                            >
                                <AiFillCloseCircle className="w-6 h-6" />
                            </button>
                        )}
                    </div>

                )}
            </div>
            {/* TASK CATEGORY END */}

            {/* TASK TITLE */}
            <div className="">
                {!editMode && (
                    <span className="text-lg font-semibold">
                        {task.title}
                    </span>
                )}

                {editMode && (
                    <input className="input input-sm text-lg w-full bg-base-200 input-bordered" defaultValue={task.title}
                        onBlur={(e) => {
                            updateTiltle(taskIndex, e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.shiftKey) {
                                toggleEditMode();
                            }
                        }}
                    />
                )}
            </div>
            {/* TASK TITLE END */}

            {/* TASK DESCRIPTION */}
            <div>
                {editMode && (
                    <textarea
                        onInput={(e) => {
                            e.currentTarget.style.height = "auto"
                            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                        }}
                        className="w-full min-h-[100px] h-auto !overflow-hidden mt-3 resize-none bg-transparent p-2 textarea textarea-bordered"
                        defaultValue={task.description}
                        placeholder="Task content here"
                        onBlur={(e) => {
                            updateDescription(taskIndex, e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.shiftKey) {
                                toggleEditMode();
                            }
                        }}
                    />
                )}

                {!editMode && (
                    <p className="my-auto min-h-[100px] w-full overflow-y-auto overflow-x-hidden cursor-pointer whitespace-pre-wrap">
                        {task.description}
                    </p>
                )}
            </div>
            {/* TASK DESCRIPTION END */}

            {/* DUE DATE */}
            <div className="w-full my-3">
                <DateRange taskIndex={taskIndex} editMode={editMode} dueDate={task.dueDate} />
            </div>
            {/* DUE DATE END */}

        </div>
    );
}

export default BoardTask;
