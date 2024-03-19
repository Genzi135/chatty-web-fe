import React, { useState } from "react";
import { COLORS } from "../utils/COLORS";

function DateInput({ onDateChange }) {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const daysInMonth = (month, year) => {
        const daysMap = {
            1: 31,
            2: isLeapYear(year) ? 29 : 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        };
        return daysMap[month];
    };

    const handleDateChange = () => {
        const numericDay = parseInt(day, 10);
        const numericMonth = parseInt(month, 10);
        const numericYear = parseInt(year, 10);

        if (
            numericDay > 0 &&
            numericDay <= daysInMonth(numericMonth, numericYear) &&
            numericMonth > 0 &&
            numericMonth <= 12 &&
            numericYear > 0
        ) {
            // Format ngày với số 0 trước nếu cần
            const formattedDay = numericDay < 10 ? `0${numericDay}` : numericDay;
            const date = `${year}-${month}-${formattedDay}`;
            if (onDateChange && typeof onDateChange === 'function') {
                onDateChange(date);
            }
        }
    };

    const generateOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

    return (
        <div style={{ color: COLORS.text }}>
            <div>Birthday</div>
            <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <select style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} onChange={(e) => { setDay(e.target.value); handleDateChange(); }} value={day}>
                        <option value="">Day</option>
                        {generateOptions(1, 31)}
                    </select>
                </div>
                <div>
                    <select style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} onChange={(e) => { setMonth(e.target.value); handleDateChange(); }} value={month}>
                        <option value="">Month</option>
                        {generateOptions(1, 12)}
                    </select>
                </div>
                <div>
                    <select style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} onChange={(e) => { setYear(e.target.value); handleDateChange(); }} value={year}>
                        <option value="">Year</option>
                        {generateOptions(1900, new Date().getFullYear())}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DateInput;