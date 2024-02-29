import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface Props {
    rating: number;
    onClick?: (i: number) => void;
    style?: React.CSSProperties;
}

const Ratings: React.FC<Props> = ({ rating, onClick, style }) => {
    return (
        <>
            {
                [...Array(5)].map((_, i) =>
                    <span key={i} onClick={() => onClick?.(i)} style={style}>
                        {Math.round(rating) > i ? <AiFillStar fontSize="15px" /> : <AiOutlineStar fontSize="15px" />}
                    </span>)
            }
            <div>

            </div>
        </>
    )
}

export default Ratings