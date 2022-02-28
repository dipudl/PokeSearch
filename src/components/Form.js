import React from 'react';

const Form = (props) => {
    const { query, search, searchChange} = props;
    return (
        <div className='pa2'>
            <input
                className='pa3 ba b--green bg-lightest-blue'
                type='search'
                placeholder='pokemon name'
                onChange={searchChange}
            />
            <button
                className='pa3 ba b--green bg-lightest-blue'
                onClick={search}>
                    Submit
            </button>
        </div>
    );
}

export default Form;