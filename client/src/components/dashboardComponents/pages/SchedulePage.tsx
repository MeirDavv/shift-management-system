import React from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../store';


const SchedulePage = () => {
  const schedule = useSelector((state:RootState) => state.schedule.list);
  return (
    <section>
      <h2>Schedule</h2>
      <ul>
        {schedule.map((item)=>(
          <li key={item.id}>
            Employee ID: {item.employeeId}, Date: {item.date}, Shift: {item.shift}
          </li>
        ))}
      </ul>
    </section>
  )
};

export default SchedulePage;
