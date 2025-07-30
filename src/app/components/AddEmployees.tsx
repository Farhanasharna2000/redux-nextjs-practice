import React from 'react';
import Button from '../../../components/button';
import { Input } from '@/components/ui/input';

const AddEmployees = () => {
    return (
        <div className='my-10'>
            <h2 className='text-center text-5xl font-bold text-red-600'>Add Employees</h2>
            <div className='flex items-center gap-2 w-3/12 mx-auto justify-center mt-10'>

            <Input type="text" placeholder='Enter employee data'/>
       <Button variant="outline">Add</Button>
            </div>
        </div>
    );
};

export default AddEmployees;