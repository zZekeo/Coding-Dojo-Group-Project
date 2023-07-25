import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checking from './components/Checking';
import NewDeposit from './components/NewDeposit';
import ShowDeposits from './components/ShowDeposits';
import ShowWithdraws from './components/ShowWithdraws';
import NewWithdraw from './components/NewWithdraw';
import EditDeposit from './components/EditDeposit';
import EditWithdraw from './components/EditWithdraw';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* Read All */}
                    <Route path='/api/allExpenses' element={<Checking />} />
                    <Route path='/api/allDeposits' element={<ShowDeposits />} />
                    <Route path='/api/allWithdraws' element={<ShowWithdraws />} />

                    {/* Create */}
                    <Route path='/api/newDeposit' element={<NewDeposit />} />
                    <Route path='/api/newWithdraw' element={<NewWithdraw />} />

                    {/* Update */}
                    <Route path='/api/oneDeposit/:id' element={<EditDeposit />} />
                    <Route path='/api/oneWithdraw/:id' element={<EditWithdraw />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;