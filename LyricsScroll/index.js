/**
 * 为什么使用立即执行函数？
 * 答：避免变量全局污染
 */
(async function () {
  /**
   * 从网络获取歌词数据
   * @returns Promise
   */
  async function getLrc() {
    return await fetch("https://study.duyiedu.com/api/lyrics")
      .then((resp) => resp.json())
      .then((resp) => resp.data);
  }

  // 页面中所有会使用到的 dom 元素
  const doms = {
    ul: document.querySelector(".lrc"),
    audio: document.querySelector("audio"),
  };

  const size = {
    liHeight: 30,
    containerHeight: 420
  }

  // 歌词对象
  let lrcData;

  // 1. 初始化
  async function init() {
    // 获取所有的歌词
    const lyc = await getLrc();
    //            time=>时间(s)   words=>当前时间对应的歌词
    // 将 lrc => [{ time: 73.15, words: '吞风吻雨葬落日未曾彷徨' }........]

    lrcData = lyc
      .split("\n")
      .filter((r) => r)
      .map((i) => {
        const lrcPart = i.split("]");
        const timeArr = lrcPart[0].replace("[", "").split(":");
        return {
          time: +timeArr[0] * 60 + +timeArr[1],
          words: lrcPart[1],
        };
      });

    // 生成 li，加入到 ul 中
    doms.ul.innerHTML = lrcData.map((i) => `<li>${i.words}</li>`).join("");
  }

  await init();

  // 2. 事件交互
  // 什么事件；如何处理
  // audio 元素的播放进度发生变化的事件
  /**
   * 当currentTime更新时会触发timeupdate事件。
   */
  doms.audio.addEventListener("timeupdate", function() {
    setStatus(this.currentTime);
  });

  /**
   * 根据时间变化（播放时间），处理歌词的状态
   * @param {*} time 
   */
  function setStatus(time) {
    // 微调
    time += 0.3;
    // 清除之前的 active
    const activeLi = document.querySelector(".active");
    activeLi && activeLi.classList.remove("active");
    // 1. 根据时间找的对应 li，高亮（设置 active 样式）
    // 在 lrcData 中找到第一个大于 time 的索引，并 -1
    const index = lrcData.findIndex(lrc => lrc.time >= time) - 1;
    // 索引为负，什么也不做
    if(index < 0) return;
    doms.ul.children[index].classList.add("active");

    // 2. 设置 ul 的滚动位置
    let top = index * size.liHeight + size.liHeight / 2 - size.containerHeight / 2;
    // 因为歌词是向上滚动的，所以 top 值应该为负
    top = -top;
    // 一开始高亮不需要从中间开始
    if(top > 0) {
      top = 0;
    }
    doms.ul.style.transform = `translateY(${top}px)`;
  }
})();
