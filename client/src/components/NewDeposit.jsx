import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const NewDeposit = (props) => {

    // form's state variables
    const [depositName, setDepositName] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [errors, setErrors] = useState({});

    // useNavigate so we can go to other routes
    const navigate = useNavigate();

    const createDeposit = (e) => {
        e.preventDefault();

        // make sure the state is coming through on submit
        console.log(depositName);
        console.log(depositAmount);
        console.log(expenseDate);

        // create a new deposit object to be sent to the server
        const newDeposit = {
            depositName: depositName,
            depositAmount: depositAmount,
            expenseDate: expenseDate
        }

        // send the new deposit object to the server using the POST route
        axios.post('http://localhost:8000/api/newDeposit', newDeposit)
            .then((response) => {
                // console log success to the browser if it works
                console.log("Client success");

                // log what is coming back so we can see
                console.log(response.data);

                navigate(`/api/allDeposits`);
            })
            .catch((err) => {
                console.log("Client error", err);
                setErrors(err.response.data.errors);
            })

        // reset the state values
        setDepositName('');
        setDepositAmount('');
        setExpenseDate('');
    }

    const cancelHandler = () => {
        navigate('/api/allDeposits');
    }

    return (
        <div className='container'>

            <div className='navbar navbar-dark bg-dark mb-5 px-5'>
                <Link className='btn btn-success' to={'/api/allExpenses'}>Checking</Link>
                <Link className='btn btn-success' to={'/api/allDeposits'}>Deposits</Link>
                <Link className='btn btn-success' to={'/api/allWithdraws'}>Deductions</Link>
                <Link className='btn btn-success' to={'/api/newDeposit'}>New Deposit</Link>
                <Link className='btn btn-success' to={'/api/newWithdraw'}>New Deduction</Link>
            </div>

            <h1 className='text-white'>Add Deposit</h1><br></br>

            <form onSubmit={createDeposit}>
                <label className='form-label text-white' htmlFor='depositName'>Name:</label>
                <input className='form-control form-control mb-4 bg-dark text-white' type="text" onChange={(e) => setDepositName(e.target.value)} value={depositName} id='depositName' />
                {
                    errors.depositName ?
                        <p className='text-danger'>{errors.depositName.message}</p> :
                        null
                }

                <label className='form-label text-white' htmlFor='depositAmount'>Amount:</label>
                <input className='form-control form-control mb-4 bg-dark text-white' type="number" onChange={(e) => setDepositAmount(e.target.value)} value={depositAmount} id='depositAmount' />
                {
                    errors.depositAmount ?
                        <p className='text-danger'>{errors.depositAmount.message}</p> :
                        null
                }

                <label className='form-label text-white' htmlFor='expenseDate'>Date:</label>
                <input className='form-control form-control mb-4 bg-dark text-white' type="date" onChange={(e) => setExpenseDate(e.target.value)} value={expenseDate} id='expenseDate' />
                {
                    errors.expenseDate ?
                        <p className='text-danger'>{errors.expenseDate.message}</p> :
                        null
                }

                <button className='btn btn-secondary' onClick={cancelHandler}>Cancel</button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button className='btn btn-danger'>Submit</button>
            </form>
        </div>
    )

}

export default NewDeposit;