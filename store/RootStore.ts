import { FilterStore, FilterHydration } from './FilterStore'

export type RootStoreHydration = {
  filters?: FilterHydration
}

export class RootStore {
  filterStore: FilterStore

  constructor() {
    this.filterStore = new FilterStore(this)
  }

  hydrate(data: RootStoreHydration) {
    if (data.filters) {
      this.filterStore.hydrate(data.filters)
    }
  }
}
