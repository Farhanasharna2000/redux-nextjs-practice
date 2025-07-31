import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: string;
  name: string;
}

export interface EmployeesState {
  Employees: Employee[];
}
const initialState: EmployeesState = {
  Employees: [],
};
export const EmployeesSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<string>) => {
      // console.log(action)
      const data = {
        id: nanoid(),
        name: action.payload,
      };
      state.Employees.push(data);
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      const data = state.Employees.filter((employee) => {
        return employee.id !== action.payload;
      });
      state.Employees = data;
    },
  },
});
export const { addEmployee, removeEmployee } = EmployeesSlice.actions;

export default EmployeesSlice.reducer;
