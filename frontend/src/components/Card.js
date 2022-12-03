import React from 'react';
function Card() {
    return ( 
        <div className="card w-40 sm:w-48 h-36 lg:w-56 lg:h-40 xl:w-64 xl:h-42 rounded-3xl bg-base-300 shadow-xl mb-6 lg:mb-8">
  <div className="card-body p-4 sm:p-6 overflow-y-hidden">
    <h2 className="text-base font-semibold sm:card-title text-primary ">Daily chores</h2>
    <p className='text-xs xl:text-sm text-accent'>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
    </div>
  </div>
</div>
     );
}

export default Card;