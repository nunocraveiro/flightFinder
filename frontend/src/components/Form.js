import './Form.css';
import { useState, useRef } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Form = () => {
    const [startDate, setStartDate] = useState(new Date());
    const firstPickerRef = useRef(null);
    const secondPickerRef = useRef(null);
    const firstFormRef = useRef(null);

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

    return (
        <section className='form-container'>
            <div className='form' onClick={handleOutsideClick}>
                <form className='from-to clickable' ref={firstFormRef}>
                    <div className='input-container from' onClick={handleInputClick}>
                        <p className='input-label default'>From*</p>
                        <input className='form-input hide' type="text"></input>
                    </div>
                    <div className='input-container to' onClick={handleInputClick}>
                        <p className='input-label default'>To*</p>
                        <input className='form-input hide' type="text"></input>
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
                                <DatePicker className='date-picker longPicker' ref={firstPickerRef}/>
                            </div>
                            <div className='displayNone clickable' ref={secondPickerRef}>
                                <p className='date-label'>Return date*</p>
                                <DatePicker className='date-picker'/>
                            </div>
                        </LocalizationProvider>
                    </div>
                    {/* <div className='quantity clickable'>
                        <p className='input-label default'>To*</p>
                        <input className='form-input hide' type="text"></input>
                    </div> */}
                </form>
            </div>
        </section>
    )
}

export default Form;
