import "./main-page.css";
import LoginForm from "./login";
import SignUpForm from "./Signup";
import Transfer from "./transfer";
import Transaction from "./transactions";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
    const [userid, setUserID] = useState(1);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="deposit"
                    element={<Deposit userid={userid} />}
                />
                <Route
                    path="withdraw"
                    element={<Withdraw userid={userid} />}
                />
                <Route
                    path="signup"
                    element={
                        <SignUpForm userid={userid} setUserID={setUserID} />
                    }
                />
                <Route
                    path="transfer"
                    element={<Transfer userid={userid} />}
                />
                <Route
                    path="transactions"
                    element={
                        <Transaction userid={userid} />
                    }
                />
                <Route
                    path="/"
                    element={
                        <LoginForm userid={userid} setUserID={setUserID} />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
