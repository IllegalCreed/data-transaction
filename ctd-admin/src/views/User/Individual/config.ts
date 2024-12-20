import { userStatusOptions } from '@/constants/mapData/user'
import type { IFilter, ISort, ITableColumn } from '@/types/table'
import type { IIndividualUserItem } from '@/types/user'

export const sortList: ISort<IIndividualUserItem>[] = [
  {
    columns: {
      key: 'email',
      label: '邮件'
    },
    order: undefined
  },
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

export const filterList: IFilter<IIndividualUserItem>[] = [
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
      key: 'createTime',
      label: '创建日期',
      type: 'date' as const
    }
  },
  {
    columns: {
      key: 'fullName',
      label: '姓名',
      type: 'input' as const
    }
  }
]

export const columns = ref<ITableColumn<IIndividualUserItem>[]>([
  { prop: 'email', label: '邮件', minWidth: '200' },
  { prop: 'fullName', label: '姓名', width: '120' },
  { prop: 'identificationNumber', label: '身份证号', width: '200' },
  { prop: 'phoneNumber', label: '手机号', width: '180' },
  { prop: 'gender', label: '性别', width: '120', slot: 'gender' },
  { prop: 'status', label: '状态', width: '120', slot: 'status' },
  { prop: 'createTime', label: '创建时间', width: '130' },
  { prop: 'updateTime', label: '更新时间', width: '130' }
])
