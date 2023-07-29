# LyricsScroll

> 音乐歌词滚动demo
>
> 完全基于原生JS实现，是对JS的综合练习

完成一个页面离不开两个过程：

- 页面初始化

  - 一开始做什么 => 打开页面时自动生成

    <img src="https://gitee.com/luying61/note-pic/raw/master/picture/image-20230629230307565.png" alt="image-20230629230307565" style="zoom:67%;" />

- 交互事件

  - 什么事件
    - 歌词随着 audio 的时间变化而变化；即 audio 的 timeupdate 事件
    - timeupdate：当 audio 的 currentTime 属性发生变化时，会触发 timeupdate
  - 如何处理
    - 当前时间的歌词高亮
    - 高亮歌词始终位于容器的中间