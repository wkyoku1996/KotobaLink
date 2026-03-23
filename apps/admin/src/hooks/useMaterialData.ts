import { useEffect, useState } from 'react';

import {
  fetchMaterialAssets,
  fetchMaterialLibrary,
  fetchMaterialPublishRecords,
  fetchMaterialUnits,
  type MaterialAssetListItem,
  type MaterialLibraryItem,
  type MaterialPublishListItem,
  type MaterialUnitItem,
} from '../lib/api';

type MaterialDataState = {
  assets: MaterialAssetListItem[];
  library: MaterialLibraryItem[];
  publishRecords: MaterialPublishListItem[];
  units: MaterialUnitItem[];
  loading: boolean;
  error: string | null;
};

const initialState: MaterialDataState = {
  assets: [],
  library: [],
  publishRecords: [],
  units: [],
  loading: true,
  error: null,
};

export function useMaterialData() {
  const [state, setState] = useState<MaterialDataState>(initialState);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [library, units, assets, publishRecords] = await Promise.all([
          fetchMaterialLibrary(),
          fetchMaterialUnits(),
          fetchMaterialAssets(),
          fetchMaterialPublishRecords(),
        ]);

        if (!active) {
          return;
        }

        setState({
          assets,
          library,
          publishRecords,
          units,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!active) {
          return;
        }

        setState({
          ...initialState,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  return {
    ...state,
    reload() {
      setReloadKey((value) => value + 1);
    },
  };
}
