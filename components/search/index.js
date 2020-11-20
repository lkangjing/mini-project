// components/search/index.js
import {addToHistory,getHistory} from '../../utils/util';
import {getHotWords,search} from '../../models/book'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
    }
  },
  observers:{
    more(more){
      if (!this.data.word) {
        return
      }
      if(this.data.loading){
        return
      }
      const length = this.data.dataArr.length
      this.setData({
        loading:true
      })
      search(length,this.data.word).then(res=>{
        const tempArr = this.data.dataArr.concat(res.books)
        this.setData({
          dataArr:tempArr,
          loading:false
        })
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    dataArr:[],
    searching:false,
    word:'',
    loading:false
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
    load_more(){
      
    },
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
          dataArr:res.books,
          word
        })
        addToHistory(word)
      })
    },
    onDelete(e){
      console.log("ondelete");
      this.setData({
        searching:false
      })
    }
  }
})
