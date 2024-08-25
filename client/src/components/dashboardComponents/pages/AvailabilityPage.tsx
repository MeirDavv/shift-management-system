import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../../store';
import { fetchUnavailability,submitUnavailability } from "../../../store/actions/availabilityActions";
import { updateUnavailability } from "../../../store/slices/unavailabilitySlice";

const AvailabilityPage = () => {
  const dispatch:AppDispatch = useDispatch();
  const {unavailability, loading, error} = useSelector((state:RootState)=>state.unavailability);
  console.log("unavailability: ",unavailability);

  useEffect(()=>{
    dispatch(fetchUnavailability());
  }, [dispatch]);



  const handleCheckboxChange = (shift_id: number, day_id:number)=>{
    const is_unavailable = !unavailability[`${shift_id}-${day_id}`];
    dispatch(updateUnavailability({shift_id, day_id, is_unavailable}));
  };

  const handleSubmit = () => {
    console.log("Submitting state: ", unavailability);
    dispatch(submitUnavailability());
  }
  
  const days = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shifts = ['Morning', 'Evening', 'Night'];

  return(
    <section>
      <h2>Availability</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day,index)=>(
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift,shiftIndex) => (
            <tr key={shiftIndex}>
              <td>{shift}</td>
              {days.map((day, dayIndex)=>{
                const key = `${shiftIndex+1}-${dayIndex+1}`;
                return (
                  <td key={dayIndex}>
                    <input type="checkbox" checked = {!!unavailability[key]} onChange={()=> handleCheckboxChange(shiftIndex + 1,dayIndex +1)}/>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit Changes</button>
    </section>
  );
};

export default AvailabilityPage;
