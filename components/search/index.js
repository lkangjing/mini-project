// components/search/index.js
import {addToHistory,getHistory} from '../../utils/util'
import {getHotWords,search} from '../../models/book'
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
    hotWords:[],
    dataArr:[],
    searching:false
  },
  attached(){
    const historyWords = getHistory()
    this.setData({
      historyWords
    })
    getHotWords().then(res=>{
      this.setData({
        hotWords:res.hot
      })
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
      this.setData({
        searching:true
      })
      const word = e.detail.value || e.detail.text
      search(0,word).then(res=>{
        this.setData({
          dataArr:res.books
        })
        addToHistory(word)
      })
    }
  }
})
