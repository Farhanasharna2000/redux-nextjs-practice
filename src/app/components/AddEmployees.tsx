"use client";
import React, { useState } from "react";
import Button from "../../../components/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";

const AddEmployees = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const dataDispatch = () => {
    // console.log(name)
    dispatch(addEmployee(name));
    setName("");
  };
  return (
    <div className="my-10">
      <h2 className="text-center text-5xl font-bold text-red-600">
        Add Employees
      </h2>
      <div className="flex items-center gap-2 w-3/12 mx-auto justify-center mt-10">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter employee data"
        />
        <Button onClick={dataDispatch} variant="outline">
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddEmployees;
