import Menu from "./menu";
import AccountFilter from "./account-filter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Transfer = ({ userid }) => {
    const [selectedFromAccount, setFromSelectedAccount] = useState(1);
    const [selectedToAccount, setToSelectedAccount] = useState(1);
    const [amount, setAmount] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [accountTypes, setAccountTypes] = useState([]);
    const user = sessionStorage.getItem("userID");
    console.log(user)

    const handleSubmitTransfer = (e) => {
        let from;
        let to;
        if(selectedFromAccount== 1) {
            from = 'Checking'
        }else if(selectedFromAccount == 2){
            from ="Savings"
        }else{
            from ="MoneyMarket"
        }
        if(selectedToAccount== 1) {
            to = 'Checking'
        }else if(selectedToAccount == 2){
            to ="Savings"
        }else{
            to ="MoneyMarket"
        }

        if (amount <= 0 || isNaN(amount)) {
            setMsg("Enter a valid amount");
        } else if (
            selectedToAccount === undefined ||
            selectedToAccount === "Select an Account"
        ) {
            setMsg("Select an account to transfer into");
        } else if (
            selectedFromAccount === undefined ||
            selectedToAccount === "Select an Account"
        ) {
            setMsg("Select an account to transfer from");
        } else if (selectedFromAccount === selectedToAccount) {
            setMsg("Select different accounts to transfer between");
        }
        //if deposit successful redirect to Transactions
        else {
            setMsg("");
            axios({
                method: "get",
                url: `http://localhost:5000/api/account/user/${user}`,
            })
                .then((res) => {
                    if (res?.data) {
                        let fid = res.data.find(
                            (a) => a.type == selectedFromAccount
                        ).id;
                        let tid = res.data.find(
                            (a) => a.type == selectedToAccount
                        ).id;
                        return axios({
                            method: "post",
                            url: "http://localhost:5000/api/transaction/",
                            data: {
                                UserId: user,
                                Amount: parseInt((amount*100)),
                                // TransactionTypeId: 1,
                                AccountId: fid,
                                TransferAccountId: tid,
                                TransactionType: "Transfer",
                                AccountName: from,
                                TransferAccountName: to
                            },
                        });
                    }
                })
                .then((res) => {
                    if (res?.status === 200 || res?.status === 204) {
                        navigate("../transactions");
                    }
                })
                .catch((err) => {
                    console.log("there were an error");
                });
        }
    };

    const getallTypes = () => {
        axios.get("http://localhost:5000/api/account/type").then((response) => {
            setAccountTypes(response.data);
        });
        // .catch(error => console.error('Error:' $(error)))
    };

    useEffect(() => {
        getallTypes();
    }, []);

    return (
        <div className="container">
            <div className="row text-center myBorder mt-4">
                <div className="col-sm-12 mt-4">
                    <Menu />
                    <h2>Transfer</h2>
                </div>
                <div className="alert-danger col-sm-4 offset-4">{msg}</div>
                <div className="offset-3 col-sm-3">
                    <h5 className="m30">Transfer funds from:</h5>
                    <AccountFilter
                        msg="Select an Account"
                        accountType={selectedFromAccount}
                        setAccountType={setFromSelectedAccount}
                        name="from"
                        types={accountTypes}
                    />
                    <h5 className="m30">Transfer amount:</h5>
                    <input
                        id="transferAmount"
                        type="text"
                        className="text-end"
                        placeholder="Amount: $"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                </div>
                <div className="col-sm-3">
                    <h5 className="m30">Transfer funds to:</h5>
                    <AccountFilter
                        msg="Select an Account"
                        accountType={selectedToAccount}
                        setAccountType={setToSelectedAccount}
                        name="to"
                        types={accountTypes}
                    />
                    <button
                        className="btn btn-primary submitTransferMargin bMargin"
                        onClick={handleSubmitTransfer}
                    >
                        Submit Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Transfer;
