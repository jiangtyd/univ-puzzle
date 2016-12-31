import React from 'react';
import Face from './Face';

const data = [
  {
    fill: "#774444",
    width: 40,
    height: 40,
    x: 1,
    y: 1,
    id: "c0_0"
  }, 
  {
    fill: "#1151aa",
    width: 40,
    height: 40,
    x: 42,
    y: 1,
    id: "c1_0"
  }, 
  {
    fill: "#777700",
    width: 40,
    height: 40,
    x: 1,
    y: 42,
    id: "c0_1"
  }, 
  {
    fill: "#770077",
    width: 40,
    height: 40,
    x: 42,
    y: 42,
    id: "c1_1"
  }, 
];

function Grid(props) {
  return (
    <svg>
      {data.map(cell => <Face key={cell.id} {...cell} />)}
    </svg>
  );
}

export default Grid;
