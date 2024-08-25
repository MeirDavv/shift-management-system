import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const EmployeesPage = () => {
  const employees = useSelector((state:RootState)=> state.employees.list);

  return (
    <section>
      <h2>Employees</h2>
      {/* <ul>
        {employees.map((employee)=>(
          <li key={employee.id}>
            {employee.name} - {employee.role}
          </li>
        ))}
      </ul> */}
    </section>

  )
}

export default EmployeesPage