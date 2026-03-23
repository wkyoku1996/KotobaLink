import { useEffect, useState } from 'react';

import {
  fetchMaterialDetail,
  fetchMaterialUnitDetail,
  type MaterialDetailItem,
  type MaterialUnitDetailItem,
} from '../lib/api';

type MaterialDetailState = {
  material: MaterialDetailItem | null;
  loading: boolean;
  error: string | null;
};

type MaterialUnitDetailState = {
  unit: MaterialUnitDetailItem | null;
  loading: boolean;
  error: string | null;
};

export function useMaterialDetail(materialId: string | undefined) {
  const [state, setState] = useState<MaterialDetailState>({
    material: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!materialId) {
      setState({ material: null, loading: false, error: '缺少教材 ID' });
      return;
    }

    let active = true;

    fetchMaterialDetail(materialId)
      .then((material) => {
        if (active) {
          setState({ material, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setState({
            material: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      });

    return () => {
      active = false;
    };
  }, [materialId]);

  return state;
}

export function useMaterialUnitDetail(unitId: string | undefined) {
  const [state, setState] = useState<MaterialUnitDetailState>({
    unit: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!unitId) {
      setState({ unit: null, loading: false, error: '缺少单元 ID' });
      return;
    }

    let active = true;

    fetchMaterialUnitDetail(unitId)
      .then((unit) => {
        if (active) {
          setState({ unit, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setState({
            unit: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      });

    return () => {
      active = false;
    };
  }, [unitId]);

  return state;
}
