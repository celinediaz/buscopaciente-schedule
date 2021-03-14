import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
    //example dates
    const passedDates = [moment("03 Mar 2021"), moment("05 Mar 2021")];
    const scheduledDates = [moment("18 Mar 2021"), moment("21 Mar 2021"), moment("07 Apr 2021")];


    const [value, setValue] = useState(moment());
    const [calendar, setCalendar] = useState([]);

    const firstDay = value.clone().startOf("month").startOf("week");
    const lastDay = value.clone().endOf("month").endOf("week");

    useEffect(() => {
        const day = firstDay.clone().subtract(1, "day");
        const temp = []
        while (day.isBefore(lastDay, "day")) {
            temp.push(Array(7).fill(0).map(() => day.add(1, "day").clone()))
        }
        setCalendar(temp)
    }, [value])

    function isPending(day){
        for(let i = 0; i < scheduledDates.length ; i++){
            if(scheduledDates[i].isSame(day, "day")) return true; 
         }
         return false;
    }
    function hasPassed(day){
        for(let i = 0; i < passedDates.length ; i++){
           if(passedDates[i].isSame(day, "day")) return true; 
        }
        return false;
    }

    /*
    // functions for when it's the scheduler
    function isToday(day){
        return day.isSame(new Date(), "day")
    }
    function isSelected(day){
        return value.isSame(day, "day");
    }
    */
    function dayStyle(day){
        if(isPending(day)) return "pending day-container";
        if(hasPassed(day)) return "passed day-container";
        return "day-container"
    }
    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    function pastMonth(){
        return value.clone().subtract(1, "month")
    }
    function nextMonth(){
        return value.clone().add(1, "month")
    }

    return (
        <div className="calendar">
            <div className="month">
            <FontAwesomeIcon icon={faArrowLeft} color="blue" onClick = {() => setValue(pastMonth())}/>
            <h1>{value.format('MMMM')}</h1>
            <FontAwesomeIcon icon={faArrowRight} color="blue" onClick = {() => setValue(nextMonth())} />
            </div>
            <div className="week">
                {weekDays.map(day => <div className ="weekDay"> {day} </div>)}
            </div>
            {calendar.map(week =>
                <div className="week">{
                    week.map(day => <div className={dayStyle(day, value)} onClick={() => setValue(day)}>
                        <div className = {"day"}>
                        {day.format("D")} </div>
                        </div>
                    )}
                </div>)}
                </div>
            )
            }

export default Calendar
