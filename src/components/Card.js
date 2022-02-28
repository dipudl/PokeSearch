import React from 'react';

const Card = (props) => {
    const { details } = props;
    return (
        <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
            <h2>{details.name}</h2>
            <img src={details.image} />
            <ul className='tl'>
                <li>
                    Height: {details.height}
                </li>
                <li>
                    Weight: {details.weight}
                </li>
                <li>
                    Order: {details.order}
                </li>
                <li>
                    Base Experience: {details.base_experience}
                </li>
            </ul>
        </div>
    );
}

export default Card;