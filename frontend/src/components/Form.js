import './Form.css';
import { useState, useRef } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const Form = ({setFlightResults}) => {
    const [outgoingDate, setOutgoingDate] = useState();
    const [adultPassengers, setAdultPassengers] = useState(0);
    const [childPassengers, setChildPassengers] = useState(0);
    const firstPickerRef = useRef(null);
    const secondPickerRef = useRef(null);
    const firstFormRef = useRef(null);
    const fromRef = useRef(null);
    const toRef = useRef(null);

    const handleOutsideClick = e => {
        if (e.target.classList.contains('clickable')) {
            firstFormRef.current.childNodes.forEach(node => {
                if (node.firstChild.className === 'input-label animate') {
                    node.firstChild.className = 'input-label deanimate';
                    node.lastChild.className = 'form-input hide';
                }
            })
            e.target.focus();
        }
    }

    const handleInputClick = e => {
        e.preventDefault();
        e.currentTarget.firstChild.className = 'input-label animate';
        e.currentTarget.lastChild.className = 'form-input show';
        e.currentTarget.lastChild.focus();
    }

    const tripTypeHandler = e => {
        if (firstPickerRef.current.classList.contains('longPicker')) {
            firstPickerRef.current.classList.remove('longPicker');
            return secondPickerRef.current.classList.remove('displayNone');
        }
        firstPickerRef.current.classList.add('longPicker');
        return secondPickerRef.current.classList.add('displayNone');
    }

    const handleMinusClick = e => {
        if (e.target.parentElement.previousSibling.innerHTML === 'Adults (12+):') {
            if (adultPassengers === 0) return;
            setAdultPassengers(adultPassengers-1);
        }
        if (e.target.parentElement.previousSibling.innerHTML === 'Children:') {
            if (childPassengers === 0) return;
            setChildPassengers(childPassengers-1);
        }
    }
    const handlePlusClick = e => {
        if (e.target.parentElement.previousSibling.innerHTML === 'Adults (12+):') {
            if (adultPassengers === 5) return;
            setAdultPassengers(adultPassengers+1);
        }
        if (e.target.parentElement.previousSibling.innerHTML === 'Children:') {
            if (childPassengers === 5) return;
            setChildPassengers(childPassengers+1);
        }
    }

    const handleSearchClick = e => {
        e.preventDefault();
        const newSearch = {
            fromLocation: fromRef.current.value,
            toLocation: toRef.current.value,
            date: outgoingDate
        }
        axios.post('http://localhost:4000/api/flights', newSearch)
          .then(res => {
            setFlightResults(res.data);
          })
          .catch(err => {
            console.log(err);
          })
    }

    return (
        <section className='form-container'>
            <div className='form' onClick={handleOutsideClick}>
                <form className='from-to clickable' ref={firstFormRef}>
                    <div className='input-container from' onClick={handleInputClick}>
                        <p className='input-label default'>From*</p>
                        <input className='form-input hide' type="text" ref={fromRef}></input>
                    </div>
                    <span className="material-symbols-outlined swapIcon">swap_horiz</span>
                    <div className='input-container to' onClick={handleInputClick}>
                        <p className='input-label default'>To*</p>
                        <input className='form-input hide' type="text" ref={toRef}></input>
                    </div>
                </form>
                <form className='second-form clickable'>
                    <div className='trip-type clickable' onChange={tripTypeHandler}>
                        <input className='oneway' type='radio' id='oneway' name="trip" value='One way' defaultChecked></input>
                        <label htmlFor='oneway'>One way</label>
                        <input className='roundtrip' type='radio' id='roundtrip' name="trip" value='Round trip'></input>
                        <label htmlFor='roundtrip'>Round trip</label>
                    </div>
                    <div className='date-form clickable'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className='clickable'>
                                <p className='date-label'>Departure date*</p>
                                <DatePicker className='date-picker longPicker' ref={firstPickerRef} 
                                    onChange={date => setOutgoingDate(`${date.$y}-${(date.$M+1)/10 >= 1 ? date.$M+1 : `0${date.$M+1}`}-${date.$D/10 >= 1 ? date.$D : `0${date.$D}`}`)}/>
                            </div>
                            <div className='displayNone clickable' ref={secondPickerRef}>
                                <p className='date-label'>Return date*</p>
                                <DatePicker className='date-picker'/>
                            </div>
                        </LocalizationProvider>
                    </div>
                    <div className='quantity clickable'>
                        <p className='quantity-label'>Passengers*</p>
                        <div className='quantity-input-container'>
                            <p>Adults (12+):</p>
                            <div className='number-container'>
                                <p className='number-button' onClick={handleMinusClick}>-</p>
                                <p className='number'>{adultPassengers}</p>
                                <p className='number-button' onClick={handlePlusClick}>+</p>
                            </div>
                        </div>
                        <div className='quantity-input-container'>
                            <p>Children:</p>
                            <div className='number-container'>
                                <p className='number-button' onClick={handleMinusClick}>-</p>
                                <p className='number'>{childPassengers}</p>
                                <p className='number-button' onClick={handlePlusClick}>+</p>
                            </div>
                        </div>
                    </div>
                    <button className='search' onClick={handleSearchClick}>Search</button>
                </form>
            </div>
        </section>
    )
}

export default Form;
