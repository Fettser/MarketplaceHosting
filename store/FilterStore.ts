import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'

export type FilterHydration = {
  order: string
}

export type OrderType = {
  id: number
  title: string
  value: string | number | boolean
}

export type CheckboxOptionsType = {
  id: string
  title: string
  value: string
  checked: boolean
}

export type FilterOptionsType = {
  [key: string]: { name: string; options: Array<CheckboxOptionsType> }
}

export class FilterStore {
  root: RootStore

  filterOptions: FilterOptionsType = {
    engines: {
      name: 'Движок',
      options: [
        { id: '1', title: 'Unity', value: 'unity', checked: false },
        { id: '2', title: 'Unreal Engine 4', value: 'ue4', checked: false },
        { id: '3', title: 'Unreal Engine 5', value: 'ue5', checked: false },
        { id: '4', title: 'Source', value: 'source', checked: false },
        { id: '5', title: 'Source 2', value: 'source2', checked: false },
        { id: '6', title: 'REDengine', value: 'redengine', checked: false },
        { id: '7', title: 'REDengine 4', value: 'redengine4', checked: false },
      ],
    },
    platforms: {
      name: 'Платформа',
      options: [
        { id: '8', title: 'IOS', value: 'ios', checked: false },
        { id: '9', title: 'Linux', value: 'linux', checked: false },
        { id: '10', title: 'Windows', value: 'windows', checked: false },
      ],
    },
    categories: {
      name: 'Категории',
      options: [
        { id: '11', title: '2D', value: '2d', checked: false },
        { id: '12', title: '3D', value: '3d', checked: false },
        { id: '13', title: 'VFX', value: 'vfx', checked: false },
        { id: '14', title: 'Music', value: 'music', checked: false },
        { id: '15', title: 'VFX', value: 'vfx', checked: false },
      ],
    },
  }

  orderOptions: OrderType[] = [
    { id: 1, title: 'сначала новые', value: 'new' },
    { id: 2, title: 'сначала старые', value: 'old' },
    { id: 3, title: 'сначала дешевые', value: 'cheap' },
    { id: 4, title: 'сначала дорогие', value: 'expensive' },
    { id: 5, title: 'по алфавиту', value: 'alphabet' },
    { id: 6, title: 'не сортировать', value: 'none' },
  ]

  countOnPage: number
  currentOrder: number | string | boolean | undefined
  searchQuery: string
  countOfAssets: number
  currentPage: number

  constructor(root: RootStore) {
    this.root = root
    this.currentOrder = this.orderOptions.at(-1)?.value
    this.searchQuery = ''
    this.countOnPage = 12
    this.countOfAssets = 72
    this.currentPage = 1
    makeAutoObservable(this)
  }

  setChecked(filter: string | null, value: string | null) {
    const option = this.filterOptions[filter ? filter : '']?.options.find(
      (item) => item.value === value,
    )
    if (option) {
      option.checked = !option.checked
    }
  }

  setPage(value: number) {
    this.currentPage = value
  }

  get filters() {
    return this.filterOptions
  }

  get countOfPage() {
    return Math.ceil(this.countOfAssets / this.countOnPage)
  }

  setSearchQuery(value: string) {
    this.searchQuery = value
  }

  setCurrentOrder(value: string | number | boolean) {
    this.currentOrder = value
  }

  setCountOnPage(value: number) {
    this.countOnPage = value
  }

  get getCurrentOrder() {
    return this.currentOrder
  }

  hydrate(data?: FilterHydration) {
    if (data) {
    }
  }
}
