import React, { useState, useEffect } from "react";
import { COLORS } from "../utils/COLORS";

function DateInput({ onDateChange }) {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        handleDateChange();
    }, [day, month, year]);

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const daysInMonth = (month, year) => {
        if (month === 2) {
            return isLeapYear(year) ? 29 : 28;
        }
        const daysMap = {
            1: 31,
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
            numericMonth > 0 &&
            numericYear > 0 &&
            numericMonth <= 12
        ) {
            const maxDay = daysInMonth(numericMonth, numericYear);
            if (numericDay > maxDay) {
                setDay(maxDay.toString());
                return;
            }

            const formattedDay = numericDay < 10 ? `0${numericDay}` : numericDay;
            const formattedMonth = numericMonth < 10 ? `0${numericMonth}` : numericMonth;
            const date = `${year}-${formattedMonth}-${formattedDay}`;
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
                    <select style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} onChange={(e) => { setYear(e.target.value); }} value={year}>
                        <option value="">Year</option>
                        {generateOptions(1950, new Date().getFullYear())}
                    </select>
                </div>
                <div>
                    <select style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} onChange={(e) => { setMonth(e.target.value); }} value={month}>
                        <option value="">Month</option>
                        {generateOptions(1, 12)}
                    </select>
                </div>
                <div>
                    <select style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} onChange={(e) => { setDay(e.target.value); }} value={day}>
                        <option value="">Day</option>
                        {generateOptions(1, daysInMonth(parseInt(month), parseInt(year)))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DateInput;
