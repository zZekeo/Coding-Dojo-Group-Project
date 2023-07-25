import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditDeposit = (props) => {

    // form's state variables
    const [depositName, setDepositName] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [errors, setErrors] = useState({});

    // useNavigate so we can go to other routes
    const navigate = useNavigate();

    // grab the variable :id from the url and save it
    const { id } = useParams();

    // trigger when the component has finished loading
    useEffect(() => {
        // get this specific deposit by passing in it's id we got from the url
        axios.get(`http://localhost:8000/api/oneDeposit/${id}`)
            // store that expense in response
            .then((response) => {
                // see what's coming back from the server
                console.log(response.data);

                // set each state's value as what is currently in the deposit so the values are pre-populated
                setDepositName(response.data.depositName);
                setDepositAmount(response.data.depositAmount);
                setExpenseDate(response.data.expenseDate);
            })
            .catch((err) => {
                console.log("Client error", err);
            })
    }, [id])

    const updateDeposit = (e) => {
        e.preventDefault();

        // make sure the state is coming through on submit
        console.log(depositName);
        console.log(depositAmount);
        console.log(expenseDate);

        // create a new deposit object to be sent to the server
        const updatedDeposit = {
            depositName: depositName,
            depositAmount: depositAmount,
            expenseDate: expenseDate
        }

        // send the updated deposit object to the server using the PUT route
        axios.put(`http://localhost:8000/api/updateExpense/${id}`, updatedDeposit)
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
        <div className="container">

            <div className='navbar mb-5'>
                <Link className='btn btn-success' to={'/api/allExpenses'}>Checking</Link>
                <Link className='btn btn-success' to={'/api/allDeposits'}>Deposits</Link>
                <Link className='btn btn-success' to={'/api/allWithdraws'}>Deductions</Link>
                <Link className='btn btn-success' to={'/api/newDeposit'}>New Deposit</Link>
                <Link className='btn btn-success' to={'/api/newWithdraw'}>New Deduction</Link>
            </div>

            <h1 className='text-white'>Edit Deposit</h1><br></br>

            <form onSubmit={updateDeposit}>
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

export default EditDeposit;