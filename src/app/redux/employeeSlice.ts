// redux/employeeSlice.ts
import { createAsyncThunk, createSlice, current, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
interface Employee {
  id: string;
  name: string;
}

interface ApiEmployee {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
}

interface EmployeesState {
  Employees: Employee[];
  EmployeesApiData: ApiEmployee[];
  isLoading: boolean;
  error: string | null;
}

// Initial state (no localStorage here)
const initialState: EmployeesState = {
  Employees: [],
  EmployeesApiData: [],
  isLoading: false,
  error: null,
};

// Async thunk
export const fetchEmployees = createAsyncThunk<ApiEmployee[]>(
  "employee/fetchEmployees",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return await res.json();
  }
);

// Create slice
const EmployeesSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    loadEmployeesFromStorage: (state, action: PayloadAction<Employee[]>) => {
      state.Employees = action.payload;
    },
    addEmployee: (state, action: PayloadAction<string>) => {
      const newEmployee: Employee = {
        id: nanoid(),
        name: action.payload,
      };
      state.Employees.push(newEmployee);
      if (typeof window !== 'undefined') {
        localStorage.setItem("employee", JSON.stringify(current(state.Employees)));//current unmuteable state k muteable kore
      }
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      state.Employees = state.Employees.filter(emp => emp.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem("employee", JSON.stringify(state.Employees));//filter korar jonno muteable state e ashe tai current use korar dorkar hoy na
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.EmployeesApiData = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

// Exports
export const { addEmployee, removeEmployee, loadEmployeesFromStorage } = EmployeesSlice.actions;
export default EmployeesSlice.reducer;
