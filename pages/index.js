import Features from '@/components/templates/index/Features'
import Story from '@/components/templates/index/Story'
import React from 'react'
import Homes from './homes'
import HomesIndex from '@/components/templates/index/HomesIndex'
import Gallery from '@/components/templates/index/Gallery'

export default function index() {
  return (
   <>
   <Features/>
   <Story/>
   <HomesIndex/>
   <Gallery/>
   </>
  )
}
