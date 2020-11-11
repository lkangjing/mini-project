// components/classic/music/index.js
import {classicBeh} from '../classic-beh'
const backAudioManager = wx.getBackgroundAudioManager();
  
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
    src:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:'images/player@pause.png',
    playSrc:"images/player@play.png",
    playing:false
  },
  detached(){
    console.log("music detached");
    // backAudioManager.stop()
  },
  attached(){
    this.recoverStatus()
    this.monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(e){
      this.setData({
        playing:!this.data.playing
      })
      backAudioManager.title = this.properties.title
      if (this.data.playing) {
        backAudioManager.src = this.properties.src
      }else{
        backAudioManager.pause()
      }
    },
    //判断播放状态
    recoverStatus(){
      if (backAudioManager.paused) {
        this.setData({
          playing:false
        })
        return
      }
      if (backAudioManager.src === this.properties.src ) {
        this.setData({
          playing:true
        })
      }
    },
    monitorSwitch(){
      //播放事件
      backAudioManager.onPlay(() => {
        this.recoverStatus()
      })
      //暂停事件
      backAudioManager.onPause(() => {
        this.recoverStatus()
      })
      //关闭事件
      backAudioManager.onStop(() => {
        this.recoverStatus()
      })
      //音乐自然播放完成事件
      backAudioManager.onEnded(() => {
        this.recoverStatus()
      })
    }
  }
})