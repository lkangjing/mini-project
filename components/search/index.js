// components/search/index.js
import {addToHistory,getHistory} from '../../utils/util';
import {getHotWords,search} from '../../models/book'
import {paginationBhv} from '../behaviors/pagination'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
    }
  },
  behaviors:[paginationBhv],
  observers:{
    more(more){
      if (!this.data.word) {
        return
      }
      if(this.data.loading){
        return
      }
      // const length = this.data.dataArr.length
      // this.setData({
      //   loading:true
      // })
      if(this.hasMore()){
        this.setData({
          loading : true
        })
        search(this.getCurrentStart(),this.data.word).then(res=>{
          // const tempArr = this.data.dataArr.concat(res.books)
          this.setDataArr(res.books)
          this.setData({
            loading : false
          })
        },err=>{
          this.setData({
            loading : false
          })
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    word:'',
    loading:false,
    loadingCenter:false
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
        searching:true,
      })
      this._showLoadingCenter()
      this.initialLize()
      const word = e.detail.value || e.detail.text
      search(0,word).then(res=>{
        this.setDataArr(res.books)
        this.setTotal(res.total)
        this.setData({
          word
        })
        addToHistory(word)
        this._hideLoadingCenter()
      })
    },
    onDelete(e){
      console.log("ondelete");
      this.setData({
        searching:false
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    }
  }
})
