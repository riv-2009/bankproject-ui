const Table = ({ data }) => {
	if (data === "")
		return <h1 className="text-center">No Transaction History</h1>;
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Date</th>
					<th>From Account</th>
					<th>To Account</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, i) => {
					return (
						<tr key={i}>
							<td key={item.transactionDate}>{item.transactionDate}</td>
							<td key={item.accountId}>{item.accountName}</td>
							<td key={item.transferAccountId}>{item.transferAccountName}</td>
							<td key={item.amount}>{item.amount / 100}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
