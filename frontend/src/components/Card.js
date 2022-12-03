import React from 'react';
function Card() {
    return ( 
        <div className="card w-64 rounded-3xl bg-base-300 shadow-xl">
  <div className="card-body">
    <h2 className="card-title text-primary font-mono">Daily chores</h2>
    <p className='text-sm text-accent'>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
    </div>
  </div>
</div>
     );
}

export default Card;