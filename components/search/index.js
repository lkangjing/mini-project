// components/search/index.js
import {addToHistory,getHistory} from '../../utils/util'
import {getHotWords} from '../../models/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[]
  },
  attached(){
    const historyWords = getHistory()
    this.setData({
      historyWords
    })
    getHotWords().then(res=>{
      console.log("remensousuo",res);
    })
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e){
      this.triggerEvent('cancel',{},{})
    },
    onConfirm(e){
      const word = e.detail.value || e.detail.text
      console.log("word",word);
      addToHistory(word)
    }
  }
})
