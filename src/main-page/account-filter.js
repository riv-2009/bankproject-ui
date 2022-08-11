import { useState } from "react";

const AccountFilter = ({ msg, setAccountType, accountType, types }) => {

    const getAccounts = () => {
        return (
            <>
                {types?.map((e) => (
                    <option key={e.id} value={e.id}>
                        {e.typeName}
                    </option>
                ))}
                ;
            </>
        );
    };
    return (
        <form>
            <select
                value={accountType}
                onChange={(e) => {
                    setAccountType(e.target.value);
                }}
            >
                {getAccounts()}
            </select>
        </form>
    );
};
export default AccountFilter;
