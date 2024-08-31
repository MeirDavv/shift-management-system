import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchShiftSettings, updateShiftSettingsAction } from "../../../store/actions/shiftSettingsActions";
import { shiftSettings } from "../../../store/interfaces/shiftSettings";

const SettingsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list: shiftSettings } = useSelector(
    (state: RootState) => state.shiftSettings
  );
  
  const [formValues,setFormValues] = useState<shiftSettings[]>([]);

  useEffect(() => {
    dispatch(fetchShiftSettings());
  }, [dispatch]);

  useEffect(() => {
    setFormValues(shiftSettings);
  }, [shiftSettings]);

  console.log("Form values",formValues)

  const handleChange = (index:number, field: keyof shiftSettings, value:any) => {
    const updatedFormValues = [...formValues];
    const currentShift = updatedFormValues[index]

    if(field === "min_employee_count"){
      const minValue = parseInt(value);
      if (minValue <= currentShift.max_employee_count){
        updatedFormValues[index] = { ...currentShift, min_employee_count:minValue};
      } else{
        alert("Min Employee Count can't be greater than Max Employe Count");
        return;
      }
    }
    else if(field === "max_employee_count"){
      const maxValue = parseInt(value);
      if (maxValue >= currentShift.min_employee_count){
        updatedFormValues[index] = { ...currentShift, max_employee_count:maxValue};
      } else{
        alert("Max Employee Count can't be smaller than Min Employe Count");
        return;
      }
    } else{
    updatedFormValues[index] = {...updatedFormValues[index], [field]:value};
    }
    setFormValues(updatedFormValues);
  };

  const handleSubmit = (e:React.FormEvent) =>{
    e.preventDefault();
    formValues.forEach(shift=>dispatch(updateShiftSettingsAction({shiftSettings:shift})));
  }

  return (
    <section>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <td>Shift</td>
            <td>Start Time</td>
            <td>End Time</td>
            <td>Min Employee Count</td>
            <td>Max Employe Count</td>
          </thead>
          <tbody>
            {formValues.map((row, index)=> (
              <tr key={row.id}>
                <td>{row.name} Shift:</td>
                <td><input required type="time" value={row.start_time} onChange={(e)=>handleChange(index,"start_time",e.target.value)} /></td>
                <td><input required type="time" value={row.end_time} onChange={(e)=>handleChange(index,"end_time",e.target.value)} /></td>
                <td><input required type="number" value={row.min_employee_count} onChange={(e)=>handleChange(index,"min_employee_count",e.target.value)} /></td>
                <td><input required type="number" value={row.max_employee_count} onChange={(e)=>handleChange(index,"max_employee_count",e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>    
        <button type="submit">Save Changes</button>   
      </form>
    </section>
  );
};

export default SettingsPage;
