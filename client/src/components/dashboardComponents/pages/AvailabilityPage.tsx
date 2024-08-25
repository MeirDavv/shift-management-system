import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../../store';
import { fetchShifts } from "../../../store/actions/shiftActions";


const ShiftsPage = () => {
  const dispatch:AppDispatch = useDispatch();
  const {list : listShifts} = useSelector((state:any)=>state.shifts)

  
  useEffect(() => {
    dispatch(fetchShifts());
}, [dispatch]);

  
  const days = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shifts = ['Morning', 'Evening', 'Night'];
  const board = new Array(shifts.length+1);
  // Initialize the two-dimensional array
  for(let i = 0; i < shifts.length + 1; i++) {
    board[i] = new Array(days.length + 1);
  }

  // Set the top left corner to empty
  board[0][0] = '';
  
  // Set the first row with shift headers
  for(let i = 0; i < shifts.length; i++) {
    board[i + 1][0] = shifts[i]; // Horizontal headers
  }
  
  // Set the first column with day headers
  for(let j = 0; j < days.length; j++) {
    board[0][j + 1] = days[j]; // Vertical headers
  }

 

  return (
    <section>
      <h2>Availability</h2>
      {
        board.map((row,i) =>(
          <tr key = {i}>
            {row.map((cell: string | null,j:number)=>(
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))
      }
    </section>
  )
};

export default ShiftsPage;
