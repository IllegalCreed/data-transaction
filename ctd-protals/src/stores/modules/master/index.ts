import { defineStore } from 'pinia'
import { useLinks } from './link'
import { useContact } from './contact'
import { useRecord } from './record'
import { useCopyright } from './copyright'

export const useMasterStore = defineStore('master', () => {
  const { links, getLinks, abouts, getAbouts } = useLinks()
  const { contact, getContact } = useContact()
  const { records, getRecords } = useRecord()
  const { copyright, getCopyright } = useCopyright()

  return {
    links,
    getLinks,
    abouts,
    getAbouts,
    contact,
    getContact,
    records,
    getRecords,
    copyright,
    getCopyright
  }
})
