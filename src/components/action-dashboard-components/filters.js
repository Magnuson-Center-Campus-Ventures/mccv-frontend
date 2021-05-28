/*eslint-disable*/
import React from 'react';
import Select from 'react-select'

export const UserFields = {
    signed: 'Signed',
    phone_number: 'Phone Number',
    email: 'Email',
    status: "Status",
}
export const UserInputMap = {
    signed: ['input', 'mm/yyyy or mm/dd/yyyy'],
    phone_number: ['input', 'xxxxxxxxxx'],
    email: ['input', 'X@domain.com'],
    status: ['select', ['Approved', 'Pending', 'Archived']],
}

export const StudentFields = {
    first_name: 'First Name',
    last_name: 'Last Name',
    grad_year: 'Grad Year',
    job_search_status: 'Job Search Status',
    interested_industries: 'Interested Industries',
    desired_start_date: 'Desired Start Date',
    desired_end_date: 'Desired End Date',
}

export const StudentInputMap = {
    first_name: ['input', 'Enter First Name'],
    last_name: ['input', 'Enter Last Name'],
    grad_year: ['input', 'yyyy'],
    job_search_status: ['select', ['Active', 'Inactive']],
    interested_industries: ['multiple', 'industries'],
    desired_start_date: ['input', 'mm/yyyy or mm/dd/yyyy'],
    desired_end_date: ['input', 'mm/yyyy or mm/dd/yyyy'],
}

export const StartUpFields = {
    city: 'City',
    state: 'State',
}

export const StartUpInputMap = {
    city: ['input', 'Enter City'],
    state: ['input', 'Enter State'],
}

export const getFieldName = (raw) => {
    return raw.toLowerCase().trim().split(" ").join("_")
}

export const handleMap = (map, key, onChange, value, props) => {
    if (map[key][0] === 'input') {
        return <input value={value||""} onChange={onChange} placeholder={map[key][1]} className={".filter-value form-control"}/>
    } else if (map[key][0] === 'select') {
        return (
            <Select options={map[key][1].map(op => {
                    return { value: op, label: op }
                })}
                value={value || ""} onChange={onChange} className={".filter-value"}/>
        )
    } else if (map[key][0] === 'multiple') {
        const seen = {}
        const ops = []
        props[map[key][1]].forEach(op => ops.push(op))
        return (
            <Select options={ops.map(op => {
                if (!seen.hasOwnProperty(op)) return { value: op, label: op }
                return null
            })} value={value || []} onChange={onChange} isMulti={true} className={".filter-value"}/>
        )
    }
}