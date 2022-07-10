
export const getVaultsByAccountId = `
query getVaultsByAccountId($Account_Id: String!) {
  vaults(where: {accountId_eq: $Account_Id}) {
    wrappedToken
    collateralToken
    registrationTimestamp
    accountId
    lastActivity {
      id
    }
    id
  }
}
`;