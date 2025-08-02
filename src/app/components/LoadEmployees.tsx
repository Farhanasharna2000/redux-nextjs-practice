'use client';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadEmployeesFromStorage } from "../redux/employeeSlice";

const LoadEmployees = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (stored) {
      dispatch(loadEmployeesFromStorage(JSON.parse(stored)));
    }
  }, [dispatch]);

  return null;
};

export default LoadEmployees;
