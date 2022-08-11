import AccountFilter from "./account-filter";
import Menu from "./menu";
import Table from "./table";
import { useEffect, useState } from "react";
import axios from "axios";

const Transaction = ({ userid }) => {
	const [selectedAccount, setSelectedAccount] = useState();
	const [accountTypes, setAccountTypes] = useState([]);
	const [allTransactions, setAllTransactions] = useState([]);
	const [transactions, setTransactions] = useState([]);

	const handleChange = (selectedAccount) => {
		setSelectedAccount(selectedAccount);
		//TODO display transactions based on selected account
		console.log(selectedAccount);
	};
	const getallTypes = () => {
		axios.get("http://localhost:5000/api/account/type").then((response) => {
			const types = [{ id: 0, typeName: "All" }];
			response.data.forEach((d) => {
				types.push(d);
			});
			setAccountTypes(types);
		});
	};

	useEffect(() => {
		getallTypes();
		getTransactions();
	}, []);

	useEffect(() => {
		switch (Number(selectedAccount)) {
			case 0:
				setTransactions(allTransactions);
				break;
			case 1:
				setTransactions(
					allTransactions.filter(
						(t) => (t.transferAccountName.toLowerCase() === "checking" || t.accountName.toLowerCase() === "checking")
					)
				);
				break;
			case 2:
				setTransactions(
					allTransactions.filter(
						(t) =>( t.transferAccountName.toLowerCase() === "savings"|| t.accountName.toLowerCase() === "savings")
					)
				);
				break;
			case 3:
				setTransactions(
					allTransactions.filter(
						(t) => (t.transferAccountName.toLowerCase() === "moneymarket"|| t.accountName.toLowerCase() === "moneymarket")
					)
				);
				break;
			default:
				break;
		}
	}, [selectedAccount]);

	const getTransactions = () => {
		const user = sessionStorage.getItem("userID");

		axios
			.get(`http://localhost:5000/api/transaction/account/${user}`)
			.then((response) => {
				console.log(response.data);
				setAllTransactions(
					response.data.sort((a, b) => a.transactionDate - b.transactionDate)
				);
				setTransactions(
					response.data.sort((a, b) => a.transactionDate - b.transactionDate)
				);
			});
	};

	return (
		<div className="container">
			<Menu />
			<div className="m75 text-center">
				<AccountFilter
					msg="Transactions for all accounts"
					accountType={selectedAccount}
					handleChange={handleChange}
					types={accountTypes}
					setAccountType={setSelectedAccount}
				/>
			</div>
			<div className="m75"></div>
			<Table data={transactions} />
		</div>
	);
};

export default Transaction;
