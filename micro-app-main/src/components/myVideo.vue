<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
// Video标签设置为中文
videojs.addLanguage('zh-CN', video_zhCN)

let videoTime = 0

export default {
  name: 'video-player',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      player: null,
      currentTime: 0,
      PercentageProgress: 0,
      nowProgress: 0,
      isDrag: false // 设置为不可拖动
    }
  },
  mounted() {
    // 初始化播放器
    const that = this

    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      that.getVideoTime()
      that.registDrug()
    })

    this.player.currentTime(10)

    // 监听暂停状态
    this.player.on('pause', (event) => {
      this.getVideoProgress()
    })

    // 监听播放状态
    this.player.on('play', function (event) {
      that.videoPlay()
    })

    // 监听视频播放结束
    this.player.on('ended', function (event) {
      that.videoEned()
    })

    // 监听事件更新
    this.player.on('timeupdate', () => {
      this.getVideoCurrentTime()
    })
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    // 获取视频时长
    getVideoTime() {
      let video = document.querySelector('video')
      video.addEventListener('loadedmetadata', () => {
        videoTime = video.duration
        console.log(`视频播放长度时${videoTime}s`)
      })
    },
    // 获取当前视频播放进度
    getVideoProgress() {
      this.nowProgress = Math.floor((this.currentTime / videoTime) * 100)
      console.log(`视频播放进度为${this.nowProgress}%`)
    },
    // 获取当前视频时间
    getVideoCurrentTime() {
      const video = document.querySelector('video')
      this.currentTime = video.currentTime
    },
    // 设置视频当前播放时间
    setVideTime(time) {
      console.log('执行重置时间')
      this.player.currentTime(time)
    },
    // 鼠标拖动进度条事件
    mouseDrag() {
      console.log('监听到拖拽')
      isMousedown = true
      // 将拖动前的时间点给oldTime
      console.log(this.currentTime, '当前时间')
      oldTime = this.currentTime
    },

    videoPlay() {
      // 视频播放函数
      console.log('视频播放')
    },
    videoEned() {
      // 视频播放暂停
      console.log('视频暂停')
    },
    // 注册禁止播放按钮事件
    registDrug() {
      if (this.isDrag) {
        //启用拖动
        document.querySelector('.vjs-progress-control').style.pointerEvents = 'auto'
      } else {
        //禁用拖动
        document.querySelector('.vjs-progress-control').style.pointerEvents = 'none'
      }
    }
  }
}
</script>

<style scoped></style>
