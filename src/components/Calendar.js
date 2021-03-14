import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Calendar = () => {
    //example dates
    const passedDates = [moment("03 Mar 2021"), moment("05 Mar 2021")];
    const scheduledDates = [moment("18 Mar 2021"), moment("21 Mar 2021"), moment("07 Apr 2021")];


    const [value, setValue] = useState(moment());
    const [calendar, setCalendar] = useState([]);
    const [selectedDay, selectDay] = useState(scheduledDates[0]);

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

    function isPending(day) {
        for (let i = 0; i < scheduledDates.length; i++) {
            if (scheduledDates[i].isSame(day, "day")) {

                return true;
            }
        }
        return false;
    }
    function hasPassed(day) {
        for (let i = 0; i < passedDates.length; i++) {
            if (passedDates[i].isSame(day, "day")) return true;
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
    function dayStyle(day) {
        if (isPending(day)) return "pending day-container";
        if (hasPassed(day)) return "passed day-container";
        return "day-container"
    }
    const weekDays = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

    function pastMonth() {
        return value.clone().subtract(1, "month")
    }
    function nextMonth() {
        return value.clone().add(1, "month")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (day) => setShow(true);

    function onSelect(day) {
        if (isPending(day)) {
            selectDay(day);
            console.log(selectedDay);
            handleShow();
        }
    }

    return (
        <div className="calendar">
            <div className="month">
                <FontAwesomeIcon icon={faArrowLeft} color="#007bff" onClick={() => setValue(pastMonth())} />
                <h3>{value.format('MMMM')}</h3>
                <FontAwesomeIcon icon={faArrowRight} color="#007bff" onClick={() => setValue(nextMonth())} />
            </div>
            <div className="week">
                {weekDays.map(day => <div className="weekDay"> {day} </div>)}
            </div>
            {calendar.map(week =>
                <div className="week">{
                    week.map(day => <div className={dayStyle(day, value)}>
                        <div className={"day"} onClick={() => onSelect(day)}>
                            {day.format("D")} </div>
                    </div>
                    )}
                </div>)}
            <Modal show={show} onHide={handleClose} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Horario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Fecha: </h1><p>{selectedDay.format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p> Su cita es {selectedDay.startOf('day').fromNow()}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Calendar
