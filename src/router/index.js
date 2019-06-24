import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import mDemoList from '@/components/mdemo-list'
import RoughMobile from '@/components/roughmuse/rough-mobile'
import CircleDot from "@/components/circle-dot";
import ClippingMask from "@/components/clipping-mask";
import SchulteTable from "@/components/schulte-table";
import SnakeMove from "@/components/snake-move";
import BorderAnim from "@/components/border-anim";
import MyClock from "@/components/my-clock";
import FingerSnap from "@/components/finger-snap";
import AwesomeDraw from "@/components/awesome-draw";
import AutoStroke from "@/components/auto-stroke";

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: mDemoList
    },
    {
      path: '/FingerSnap',
      name: 'FingerSnap',
      component: FingerSnap
    },
    {
      path: '/RoughMobile',
      name: 'RoughMobile',
      component: RoughMobile
    },
    {
      path: '/CircleDot',
      name: 'CircleDot',
      component: CircleDot
    },
    {
      path: '/ClippingMask',
      name: 'ClippingMask',
      component: ClippingMask
    },{
      path: '/FingerSnap',
      name: 'FingerSnap',
      component: FingerSnap
    },
    {
      path: '/BorderAnim',
      name: 'BorderAnim',
      component: BorderAnim
    },
    {
      path: '/MyClock',
      name: 'MyClock',
      component: MyClock
    },
    {
      path: '/SchulteTable',
      name: 'SchulteTable',
      component: SchulteTable
    },
    {
      path: '/AwesomeDraw',
      name: 'AwesomeDraw',
      component: AwesomeDraw
    },
    {
      path: '/AutoStroke',
      name: 'AutoStroke',
      component: AutoStroke
    }
  ]
})

export default router;
