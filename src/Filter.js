import React from 'react';

const Filter = (props) => (
    <>
        <div className="filter">
            Filter by category:
            <select onChange={(e) => props.filterHandler(e.target.value)}>
                {props.categories.map((x, y) => <option key={y}>{x}</option>)}
            </select>
        </div>
    </>
)

export default Filter;