import './Form.css';

const Form = () => {
    const handleOutsideClick = e => {
        if (e.target.className === 'from-to') {
            e.target.childNodes.forEach(node => {
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

    return (
        <section className='form-container'>
            <div className='form'>
                <form className='from-to' onClick={handleOutsideClick}>
                    <div className='input-container from' onClick={handleInputClick}>
                        <p className='input-label default'>From*</p>
                        <input className='form-input hide' type="text"></input>
                    </div>
                    <div className='input-container to' onClick={handleInputClick}>
                        <p className='input-label default'>To*</p>
                        <input className='form-input hide' type="text"></input>
                    </div>
                </form>
                <form className='second-form'>
                    <div className='trip-type'>
                        <input type='radio' id='oneway' name="trip" value='One way' defaultChecked></input>
                        <label htmlFor='oneway'>One way</label>
                        <input type='radio' id='roundtrip' name="trip" value='Round trip'></input>
                        <label htmlFor='roundtrip'>Round trip</label>
                    </div>
                    <div className='date-form'>
                        <div className='input-container from'>
                            <p className='date-label'>Departure date*</p>
                            <input className='form-input show' type="text"></input>
                        </div>
                        <div className='input-container to'>
                            <p className='date-label'>Return date*</p>
                            <input className='form-input show' type="text"></input>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Form;
