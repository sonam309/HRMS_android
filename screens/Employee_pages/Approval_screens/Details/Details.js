import { View, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import JobOpening from './JobOpening';
import JobRequest from './JobRequest';
import SalaryAllocation from './SalaryAllocation';

const Details = (props) => {
    const { candidate_ID, category, action, jobId } = props.route.params

    // selecting which of hiring pages to show
    const HiringPages = () => {
        switch (category) {
            case "Salary Allocation":
                return <SalaryAllocation candidate_ID={candidate_ID} action={action} />
            case "New Job Opening":
                return <JobOpening jobId={jobId} navigation={props.navigation} action={action} />
            case "New Job Request":
                return <JobRequest jobId={jobId} navigation={props.navigation} action={action} />
        }
    }

    return (
        <>
            {/* Which of hirng, attendance... pages to show */}
            <HiringPages />
        </>
    )
}

export default Details