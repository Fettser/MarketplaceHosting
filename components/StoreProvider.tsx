import { enableStaticRendering } from 'mobx-react-lite'
import { RootStore, RootStoreHydration } from '../store/RootStore'
import { createContext, useContext, ReactNode } from 'react'

enableStaticRendering(typeof window === 'undefined')

let store: RootStore
const StoreContext = createContext<RootStore | undefined>(undefined)

export function useRootStore(): RootStore {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}

export function useFilterStore() {
  const { filterStore } = useRootStore()
  return filterStore
}

export function StoreProvider({
  children,
  hydrationData,
}: {
  children: ReactNode
  hydrationData?: RootStoreHydration
}) {
  const store = initializeStore(hydrationData)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

function initializeStore(initialData?: RootStoreHydration): RootStore {
  const _store = store ?? new RootStore()

  if (initialData) {
    _store.hydrate(initialData)
  }
  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}
