import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { Role } from '../../../store/interfaces/role';
import { fetchRoles, updateEmployeeRole } from '../../../store/actions/roleActions';


const EmployeesPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {list: employees} = useSelector((state:RootState)=> state.employees)
  const {list: roles} = useSelector((state:any)=> state.roles)

  const [selectedRoles, setSelectedRoles] = useState<{[key:number]:number}> ({}); //[employeeId]: roleId

  useEffect(() => {
    dispatch(fetchRoles());
}, [dispatch]);

  const handleRoleChange = (employeeId:number, roleId: number) => {
    setSelectedRoles(prevState => ({
      ...prevState,
      [employeeId] : roleId
    }));
  };

  const handleSubmit = () => {
    Object.keys(selectedRoles).forEach(employeeId => {
      const employeeIdNumber = Number(employeeId)
      const roleId = selectedRoles[employeeIdNumber];
      dispatch(updateEmployeeRole({employeeIdNumber,roleId}));
    })
  }

  return (
    <section>
      <h2>Employees</h2>
      <ul>
        {employees.map((employee)=>(
          <li key={employee.id}>
            {employee.first_name} {employee.last_name} - 
            <select 
            name="roles" 
            id="roles"
            value={selectedRoles[employee.id] || employee.role_id} 
            onChange = {(e)=> handleRoleChange(employee.id,Number(e.target.value))}
            >
             {roles.map((role:Role)=> (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
             ))}
            </select>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit changes</button>
    </section>

  )
}

export default EmployeesPage