import { create } from 'zustand';

import { FLOW_MODE } from '@/constants/flow';

import type { FlowMode } from '@/types/FlowMode';
import type { FlowElement } from '@/types/FlowSheetElement';

interface FlowUiState {
  activeElement: FlowElement;
  mode: FlowMode;
  setMode: (mode: FlowMode) => void;
  openSidebar: (element: FlowElement) => void;
  closeSidebar: () => void;
}

export const useFlowStore = create<FlowUiState>((set) => ({
  activeElement: null,
  mode: FLOW_MODE.EDIT,

  setMode: (mode) => set({ mode }),
  openSidebar: (element) => set({ activeElement: element }),
  closeSidebar: () => set({ activeElement: null }),
}));
