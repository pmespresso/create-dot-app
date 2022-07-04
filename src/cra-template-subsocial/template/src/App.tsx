import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Input, Row } from "reactstrap";
import { AnySpaceId } from "@subsocial/types";
import { idToBn, AnyId } from "@subsocial/utils/bn";
import { SpaceData } from "@subsocial/types/dto";
import styled from "styled-components";

import "./App.css";
import { SpaceCard } from "./SpaceCard";
import { SubsocialContext } from "./contexts/subsocialContext";
import { config } from "./config";

const Background = styled.div`
  background-color: #282c34;
  min-height: 100vh;
`;

const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  padding-top: 200px;
  min-width: 100%;
  color: white;
`;

const SearchBarRow = styled(Row)`
  position: absolute;
  top: 30px;
  left: 40px;
  margin: 0 auto;
  min-width: 100%;
`;

const SearchSpace = styled(Input)``;

function App() {
  const [spaceId, setSpaceId] = useState<AnyId>();
  const [currentSpace, setCurrentSpace] = useState<SpaceData>();
  const [recommendedSpaces, setRecommendedSpaces] = useState<SpaceData[]>();
  const { isApiReady, getRecommendedSpaces, getSpace } =
    useContext(SubsocialContext);

  useEffect(() => {
    async function fetchSpaces() {
      if (isApiReady) {
        const recSpaces = await Promise.all(
          config.recommendedSpaceIds.map(
            async (id: string) => await getSpace(id as unknown as AnySpaceId)
          )
        );

        setRecommendedSpaces(recSpaces);
      }
    }

    fetchSpaces();
  }, [isApiReady]);

  const handleFetchSpace = useCallback(async () => {
    if (spaceId) {
      const sp = await getSpace(idToBn(spaceId));
      setCurrentSpace(sp);
    }
  }, [spaceId]);

  return (
    <Background>
      <AppContainer>
        <SearchBarRow>
          <Col>
            <SearchSpace
              onChange={({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => {
                setSpaceId(value);
              }}
              title="Space"
              placeholder="input space ID, e.g. 0 for Subsocial"
            />
          </Col>
          <Col>
            <Button onClick={handleFetchSpace}>Get Space</Button>
          </Col>
        </SearchBarRow>

        <Row>
          <h4>Recommended Spaces</h4>
          {currentSpace ? (
            <SpaceCard
              id={currentSpace.id}
              handle={currentSpace.struct.handle}
              followersCount={currentSpace.struct.followersCount}
              postsCount={currentSpace.struct.postsCount}
            />
          ) : (
            recommendedSpaces?.map((space: SpaceData) => {
              console.log(space);

              return (
                <Col>
                  <SpaceCard
                    id={space.id}
                    handle={space.struct.handle}
                    followersCount={space.struct.followersCount}
                    postsCount={space.struct.postsCount}
                  />
                </Col>
              );
            })
          )}
        </Row>
      </AppContainer>
    </Background>
  );
}

export default App;
