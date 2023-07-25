import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';



const ShowDeposits = (props) => {
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


    // custom function that loops through all of the expenses, and saves ONLY the deposit expenses
    // this way our deposit page only displays deposits, and not the withdraws as it was displaying both before
    let arr = [];
    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].depositName !== undefined) {
            console.log("Expense at ", i, allExpenses[i].depositName);
            arr.push(allExpenses[i])
        }
        console.log(arr);
    }

    // go to the update route
    const updateExpenseButton = (updateID) => {
        // check to make sure the edit click is giving the correct id
        // console.log(updateID);

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
                <Link className='btn btn-success' to={'/api/allExpenses'}>Checking</Link>
                <Link className='btn btn-success' to={'/api/allDeposits'}>Deposits</Link>
                <Link className='btn btn-success' to={'/api/allWithdraws'}>Deductions</Link>
                <Link className='btn btn-success' to={'/api/newDeposit'}>New Deposit</Link>
                <Link className='btn btn-success' to={'/api/newWithdraw'}>New Deduction</Link>
            </div>

            <h1 className='text-white'>Deposits</h1><br></br>

            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Deposits</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arr.map((eachExpense) => (
                            <tr>
                                <td><Link className='bg-transparent text-white text-decoration-none' to={`/api/oneDeposit/${eachExpense._id}`}>{eachExpense.depositName}</Link></td>
                                <td>${eachExpense.depositAmount}</td>
                                <td>{eachExpense.expenseDate}</td>
                                <td><button className='btn btn-danger' onClick={() => deleteExpenseButton(eachExpense._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Link className='btn btn-primary' to={'/api/newDeposit'}>Add Deposit</Link>
        </div>
    )
}

export default ShowDeposits;