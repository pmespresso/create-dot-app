import React from "react";
import { Col, Row, Table } from "reactstrap";
import styled from "styled-components";
import { Vault } from "../hooks/useVaults";
import SelectAccountDropdown from "./SelectAccountDropdown";

const StyledVaultsTable = styled(Table)`
  color: white;
  padding: 10px;
  margin: 20px 0;
`;

interface Props {
  vaults: Vault[];
}
function VaultsTable(props: Props) {
  return (
    <>
      <Row>
        <Col>
          <h3>My Vaults</h3>
        </Col>
        <Col>
          <SelectAccountDropdown />
        </Col>
      </Row>
      <StyledVaultsTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Wrapped Token</th>
            <th>Collateral Token</th>
            <th>Registration Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {props.vaults?.map((vault: any, i: number) => {
            return (
              <tr>
                <th scope="row">{i}</th>
                <td>{vault.wrappedToken}</td>
                <td>{vault.collateralToken}</td>
                <td>{new Date(vault.registrationTimestamp).toDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledVaultsTable>
    </>
  );
}

export default React.memo(VaultsTable);
