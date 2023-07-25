import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checking = (props) => {
    const [allExpenses, setAllExpenses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/allExpenses')
            .then((response) => {
                console.log(response);
                setAllExpenses(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // custom function that loops through all of the expenses,
    // and totals all of the numbers up of each deposit and withdraw
    let total = 0;
    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].depositAmount !== undefined) {
            total += allExpenses[i].depositAmount;
            // console.log("Number", allExpenses[i].depositAmount);
        }

        if (allExpenses[i].withdrawAmount !== undefined) {
            total += allExpenses[i].withdrawAmount;
            // console.log("Number", allExpenses[i].withdrawAmount);
        }
    }
    console.log("Total: ", total);

    // go to the update route
    const updateExpenseButton = (updateID) => {
        // check to make sure the edit click is giving the correct id
        console.log(updateID);

        navigate(`/oneExpense/${updateID}`);
    }

    // go to the delete route
    const deleteExpenseButton = (deleteID) => {
        // check to make sure the delete click is giving the correct id
        console.log(deleteID);

        // send the deleted expense object to the server using the delete route and it's id
        axios.delete(`http://localhost:8000/api/deleteExpense/${deleteID}`)
            .then((response) => {
                // console log to the browser
                console.log("Delete Success", response.data);

                // remove from the DOM after a successful delete so the component refreshes
                // ! loop through all the expenses, if the expense doesn't match the id passed in, setAllExpenses will store it in a new array
                // ! if it matches, we don't add it
                setAllExpenses(allExpenses.filter((allExpenses) => allExpenses._id !== deleteID));
            })
            .catch((err) => {
                console.log("Client error", err);
            })
    }

    return (
        <div className="container">

            <div className='navbar navbar-dark bg-dark mb-5 px-5'>
                <Link className='btn btn-success ' to={'/api/allExpenses'}>Checking</Link>
                <Link className='btn btn-success' to={'/api/allDeposits'}>Deposits</Link>
                <Link className='btn btn-success' to={'/api/allWithdraws'}>Deductions</Link>
                <Link className='btn btn-success' to={'/api/newDeposit'}>New Deposit</Link>
                <Link className='btn btn-success' to={'/api/newWithdraw'}>New Deduction</Link>
            </div>

            <h1 className='text-white'>Checking</h1><br></br>

            <table className='table table-dark table-bordered table-hover'>
                <thead>
                    <tr>
                        <th >Deposits/Deductions</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allExpenses.map((eachExpense) => (
                            <tr>
                                <td>
                                    <Link className='bg-transparent text-white text-decoration-none' to={`/api/oneDeposit/${eachExpense._id}`}>{eachExpense.depositName}</Link>
                                    <Link className='bg-transparent text-white text-decoration-none' to={`/api/oneWithdraw/${eachExpense._id}`}>{eachExpense.withdrawName}</Link>
                                </td>
                                <td>${eachExpense.depositAmount}{eachExpense.withdrawAmount}</td>
                                <td>{eachExpense.expenseDate}</td>
                                <td><button className='btn btn-danger' onClick={() => deleteExpenseButton(eachExpense._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <h2 className='text-white'>Total: ${total}</h2>
        </div >
    )
}

export default Checking;