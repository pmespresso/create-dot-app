import React, { useContext } from "react";
import { Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import SelectAccountDropdown from "./components/SelectAccountDropdown";
import VaultsTable from "./components/VaultsTable";
import { AppContext } from "./contexts/AppContext";
import { useVaults } from "./hooks/useVaults";

const Background = styled.div`
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  min-height: 100vh;
  color: white;
`;

const Title = styled.h1`
  font-family: aktiv-grotesk, sans-serif;
  font-size: 76px;
  width: 100%;
  font-weight: 300;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  > h1 {
    margin: 10px 0;
  }
`;

const Section = styled(Row)`
  justify-content: center;
  align-items: center;

  padding: 10em 0;
`;

function App() {
  const { currentAccount } = useContext(AppContext);
  const { vaults } = useVaults(currentAccount?.address);

  console.log("vaults => ", vaults);

  return (
    <Background>
      <Container>
        <Section>
          <Col span={10}>
            <TitleArea>
              <Title>Use Your Bitcoin.</Title>
              <Title>Anywhere.</Title>
            </TitleArea>
          </Col>
          <Col span={2}>{vaults && <VaultsTable vaults={vaults} />}</Col>
        </Section>
      </Container>
    </Background>
  );
}

export default App;
