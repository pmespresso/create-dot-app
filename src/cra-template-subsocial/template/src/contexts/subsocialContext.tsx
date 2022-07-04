import React, { createContext, useEffect, useState } from "react";

/* import newFlatSubsocialApi and util functions */
import { newFlatSubsocialApi } from "@subsocial/api";
import { FlatSubsocialApi } from "@subsocial/api/flat-subsocial";
import { AnySpaceId } from "@subsocial/types";
import { SpaceData } from "@subsocial/types/dto";

import { config } from "../config";

interface Props {
  children: React.ReactNode;
}

interface SubsocialContextInterface {
  getSpace: (spaceId: AnySpaceId) => any;
  getRecommendedSpaces: () => any;
  isApiReady: boolean;
}

export const SubsocialContext = createContext({
  getSpace: () => {},
  getRecommendedSpaces: () => {},
  isApiReady: false,
} as SubsocialContextInterface);

export const SubsocialContextProvider = ({ children }: Props) => {
  const [isApiReady, setIsApiReady] = useState(false);
  const [flatApi, setFlatApi] = useState<FlatSubsocialApi | null>(null);

  useEffect(() => {
    async function initApi() {
      /* Creating flatSubsocialApi object */
      const api = await newFlatSubsocialApi({
        ...config,
      });

      setFlatApi(api);
      setIsApiReady(true);
    }

    initApi();
  }, []);

  const getSpace = async (spaceId: AnySpaceId) => {
    if (!spaceId || !flatApi) {
      return undefined;
    }

    // Find space by id.
    const space = await flatApi.findSpace({ id: spaceId });
    console.log(space);
    return space;
  };

  const getRecommendedSpaces = async (): Promise<SpaceData[] | undefined> => {
    if (!flatApi) {
      return undefined;
    }

    console.log("Calling get public spaces");

    try {
      const spaces = await flatApi.findPublicSpaces(config.recommendedSpaceIds);

      console.log("spaces => ", spaces);

      return spaces;
    } catch (e) {
      console.log("error= > ", e);
    }
  };

  return (
    <SubsocialContext.Provider
      value={{ getSpace, getRecommendedSpaces, isApiReady }}
    >
      {children}
    </SubsocialContext.Provider>
  );
};
