import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../../store';
import { fetchShifts } from "../../../store/actions/shiftActions";
import { fetchEmployeesNames } from "../../../store/actions/employeeActions";
import { Employee, EmployeeMap } from "../../../store/interfaces/employee";
import RunAIScriptButton from "../../RunAIScriptButton";


const ShiftsPage = () => {
  const dispatch:AppDispatch = useDispatch();
  const {list : listShifts} = useSelector((state:RootState)=>state.shifts)
  const {list : listEmployeesNames} = useSelector((state:any)=>state.employees)

  const employeeObject: EmployeeMap = listEmployeesNames.reduce((acc: EmployeeMap[], employee:Employee) => {
    acc[employee.id] = `${employee.first_name} ${employee.last_name}`;
    return acc;
  }, {});
  
  useEffect(() => {
    dispatch(fetchShifts());
    dispatch(fetchEmployeesNames());
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

  // Populate the contents of the table with empty  space
  for(let i =1; i<shifts.length + 1; i++){
    for(let j=1; j<days.length + 1; j++){
      board[i][j] = ['']
    }
  }

  // Populate the contents of the table with actual shifts from the databasee
  for (const item of listShifts){
    (board[item.shift_id][item.day_id] as string[]).push(employeeObject[item.employee_id]);
  }

  return (
    <section>
      <h2>Shifts</h2>
      {
        board.map((row,i) =>(
          <tr key = {i}>
            {row.map((cell: string | null,j:number)=>(
              <td key={j}>
                {Array.isArray(cell) ? cell.map((name,idx)=> <div key={idx}>{name}</div>) : cell}
                </td>
            ))}
          </tr>
        ))
      }
      <RunAIScriptButton></RunAIScriptButton>
    </section>
  )
};

export default ShiftsPage;
