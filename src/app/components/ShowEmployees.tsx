"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeEmployee } from "../redux/employeeSlice";

const ShowEmployees = () => {
  const dispatch = useDispatch();
  const EmployeesData = useSelector(
    (state: RootState) => state.employee.Employees
  );
  //state.reducername in store.ts.initialstatevalue name in slice.ts

  return (
    <div className="text-center ">
      <h2 className="text-5xl font-bold text-red-800">Show Employees</h2>
      {EmployeesData.map((employee) => (
        <div
          key={employee.id}
          className="flex items-center justify-center gap-2 my-10"
        >
          <h4 className="text-xl my-2">{employee.name}</h4>
          <button onClick={() => dispatch(removeEmployee(employee.id))}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
                fill="#9f0712"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowEmployees;
