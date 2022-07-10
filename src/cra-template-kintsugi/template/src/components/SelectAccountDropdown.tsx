import React, { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import styled from "styled-components";
import { useAccount } from "../hooks/useAccount";
import { useExtension } from "../hooks/useExtension";
import { toShortAddress } from "../utils/toShortAddress";

const StyledDropdown = styled(Dropdown)`
  float: right;
  margin-bottom: 20px;

  > * {
    font-size: 35px;

    :hover {
      cursor: pointer;
    }
  }
`;

function SelectAccountDropdown() {
  const { currentAccount, onSelectAccount } = useAccount();
  const { allAccounts } = useExtension();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <StyledDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="span"
        caret
        onClick={toggle}
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
      >
        {currentAccount
          ? currentAccount.meta.name || toShortAddress(currentAccount.address)
          : "Select Account"}
      </DropdownToggle>
      <DropdownMenu>
        {allAccounts?.map((account) => (
          <DropdownItem
            key={account.address}
            onClick={() => {
              console.log(account);
              onSelectAccount(account);
              toggle();
            }}
          >
            {account.meta.name || toShortAddress(account.address)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </StyledDropdown>
  );
}

export default React.memo(SelectAccountDropdown);
