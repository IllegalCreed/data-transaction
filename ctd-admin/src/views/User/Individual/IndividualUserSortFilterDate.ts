import { userStatusOptions } from '@/constants/mapData/user'

export const sortList = [
  {
    columns: {
      key: 'fullName',
      label: '姓名'
    },
    order: undefined
  },
  {
    columns: {
      key: 'status',
      label: '状态'
    },
    order: undefined
  }
]

export const filterList = [
  {
    columns: {
      key: 'status',
      label: '状态',
      type: 'enum' as const
    },
    options: userStatusOptions
  },
  {
    columns: {
      key: 'createdDate',
      label: '创建日期',
      type: 'date' as const
    }
  },
  {
    columns: {
      key: 'name',
      label: '姓名',
      type: 'input' as const
    }
  }
]
