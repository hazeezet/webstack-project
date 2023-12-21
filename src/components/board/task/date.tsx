import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import moment from "moment-timezone";
import { FaFlag } from "react-icons/fa";
import clsx from "clsx";

import "./style.css";
import 'react-date-picker/dist/DatePicker.css';
import "react-calendar/dist/Calendar.css";
import { useBoard } from "../state";

type ValuePiece = Date | null;

export default function DateRange({ dueDate, editMode, taskIndex }: { dueDate: string, editMode: boolean, taskIndex: number }) {
    const [updateDueDate] = useBoard(state => [state.updateDueDate]);

    const now = moment.tz();

    const due = moment.tz(dueDate, "MMM DD, YYYY", process.env.NEXT_PUBLIC_TIMEZONE as string)

    let dateRangeStarting = due.isSameOrBefore(moment(now).startOf("month")) ? moment(now).startOf("month") : due;

    const [dateSelect, setDateSelect] = useState<ValuePiece>(dateRangeStarting.toDate());

    useEffect(() => {
        updateDueDate(taskIndex, moment(dateSelect).format("MMM DD, YYYY"))
    }, [dateSelect])

    return (
        <>

            {!editMode && (
                <div className="flex items-center justify-start gap-3 text-opacity-70 text-base-content">
                    <FaFlag className={clsx({ "text-red-500": due.isSameOrBefore(moment(now)) })} />
                    <span className={clsx({ "text-red-400": due.isSameOrBefore(moment(now)) })}>
                        {moment(dateSelect).format("MMM DD, YYYY")}
                    </span>
                </div>
            )}

            {editMode && (
                <div tabIndex={0} className="datepicker">
                    <div className="datepicker__container">
                        <main className="datepicker__container__content">
                            <DatePicker
                                calendarAriaLabel="Toggle calendar"
                                clearAriaLabel="Clear value"
                                dayAriaLabel="Day"
                                monthAriaLabel="Month"
                                nativeInputAriaLabel="Date"
                                onChange={(e) => setDateSelect(e as ValuePiece)}
                                closeCalendar={false}
                                shouldCloseCalendar={() => { return false }}
                                value={dateSelect}
                                minDate={now.toDate()}
                                isOpen={true}
                                yearAriaLabel="Year"
                            />
                        </main>
                    </div>
                </div>
            )}

        </>
    );
}

