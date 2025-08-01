import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Local employee (added manually)
interface Employee {
  id: string;
  name: string;
}

// API employee (fetched from API)
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
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// State shape
interface EmployeesState {
  Employees: Employee[];
  EmployeesApiData: ApiEmployee[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: EmployeesState = {
  Employees: [],
  EmployeesApiData: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch API employee data
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
    addEmployee: (state, action: PayloadAction<string>) => {
      const newEmployee: Employee = {
        id: nanoid(),
        name: action.payload,
      };
      state.Employees.push(newEmployee);
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      state.Employees = state.Employees.filter(
        (employee) => employee.id !== action.payload
      );
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

// Export actions and reducer
export const { addEmployee, removeEmployee } = EmployeesSlice.actions;
export default EmployeesSlice.reducer;
