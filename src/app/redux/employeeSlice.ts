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
  },
});
export const { addEmployee } = EmployeesSlice.actions;

export default EmployeesSlice.reducer;
