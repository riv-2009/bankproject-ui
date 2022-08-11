import { useNavigate } from "react-router-dom";
const Menu = () => {
    const navigate = useNavigate();

    const handleMenuCLick = (e) => {
        if (e.target.value === "logout") {
            sessionStorage.clear();
            //TODO logout user
            navigate("/");
        } else navigate("/" + e.target.value);
    };
    return (
        <ul className="horizontal-list text-center">
            <li>
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleMenuCLick}
                    value="deposit"
                >
                    Deposit
                </button>
            </li>
            <li>
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleMenuCLick}
                    value="withdraw"
                >
                    Withdraw
                </button>
            </li>
            <li>
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleMenuCLick}
                    value="transfer"
                >
                    Transfer
                </button>
            </li>
            <li>
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleMenuCLick}
                    value="transactions"
                >
                    Transactions
                </button>
            </li>
            <li>
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleMenuCLick}
                    value="logout"
                >
                    Logout
                </button>
            </li>
        </ul>
    );
};
export default Menu;
