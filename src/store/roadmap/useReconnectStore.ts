import { create } from 'zustand';

interface ReconnectStoreState {
  reconnectingEdgeId: string | null;
  setReconnectingEdgeId: (id: string | null) => void;
}

export const useReconnectStore = create<ReconnectStoreState>((set) => ({
  reconnectingEdgeId: null,
  setReconnectingEdgeId: (id) => set({ reconnectingEdgeId: id }),
}));
