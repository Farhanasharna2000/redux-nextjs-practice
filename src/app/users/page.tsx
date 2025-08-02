'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '../redux/store';
import { fetchEmployees } from '../redux/employeeSlice';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employeeApiData = useSelector((state: RootState) => state.employee.EmployeesApiData);
  const isLoading = useSelector((state: RootState) => state.employee.isLoading);
  const error = useSelector((state: RootState) => state.employee.error);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {error && <p>{error}</p>}
      {employeeApiData.length > 0 ? (
        employeeApiData.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
          </div>
        ))
      ) : (
        !isLoading && <p>No data</p>
      )}
    </div>
  );
};

export default Users;
