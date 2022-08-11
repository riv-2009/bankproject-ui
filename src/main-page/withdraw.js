import Menu from "./menu";
import AccountFilter from "./account-filter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Withdraw = ({ userid }) => {
	const [selectedAccount, setSelectedAccount] = useState(1);
	const [amount, setAmount] = useState("");
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();
	const [accountTypes, setAccountTypes] = useState([]);
	const user = sessionStorage.getItem("userID");
	const getAccountType = (accountType) => {
		switch (Number(accountType)) {
			case 1:
				return "Checking";
			case 2:
				return "Savings";
			default:
				return "Money Market";
		}
	};
	const handleSubmit = (e) => {
		console.log(user, "user");
		console.log(selectedAccount);
		let newid;
		if (selectedAccount) {
			newid = selectedAccount;
		} else {
			newid = selectedAccount.id;
		}
		console.log(newid);

		if (amount <= 0 || isNaN(amount)) {
			setMsg("Enter a valid amount");
		} else if (
			selectedAccount === undefined ||
			selectedAccount === "Select an Account"
		) {
			setMsg("Select an account");
		}
		//if withdrawel successful redirect to Transactions
		else {
			axios({
				method: "get",
				url: `http://localhost:5000/api/account/user/${user}`,
			})
				.then((res) => {
					if (res?.data) {
						let id = res.data.find((a) => a.type == selectedAccount).id;
						return axios({
							method: "patch",
							url: "http://localhost:5000/api/account/balance",
							data: {
								amount: -parseInt(amount * 100),
								accountId: id,
								userId: user,
								accountType: getAccountType(selectedAccount),
							},
						});
					}
				})
				.then((res) => {
					if (res.status === 200) {
						navigate("../transactions");
					}
				})
				.catch((err) => {
					console.log("there were an errer");
				});
		}
	};

	const getallTypes = () => {
		axios.get("http://localhost:5000/api/account/type").then((response) => {
			setAccountTypes(response.data);
		});
	};

	useEffect(() => {
		getallTypes();
	}, []);

	return (
		<div className="container">
			<div className="row text-center myBorder mt-4">
				<div className="col-sm-12 mt-4">
					<Menu />
					<h2>Withdraw</h2>
				</div>
				<div className="alert-danger col-sm-4 offset-4">{msg}</div>
				<div className="offset-3 col-sm-3">
					<h5 className="m30">Withdraw funds from:</h5>
					<AccountFilter
						msg="Select an Account"
						accountType={selectedAccount}
						setAccountType={setSelectedAccount}
						types={accountTypes}
					/>
				</div>
				<div className="col-sm-3">
					<h5 className="m30">amount:</h5>
					<input
						id="withdrawAmount"
						type="text"
						className="text-end"
						placeholder="Amount: $"
						value={amount}
						onChange={(e) => {
							setAmount(e.target.value);
						}}
					/>
					<button
						className="btn btn-primary submitTransferMargin bMargin"
						onClick={handleSubmit}
					>
						Withdraw funds
					</button>
				</div>
			</div>
		</div>
	);
};
export default Withdraw;
