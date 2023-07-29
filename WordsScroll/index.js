// 1. 遇到的问题：无法添加过渡效果
(function () {
  const list = document.querySelector(".list");
  // 初始化
  function cloneFirstItem() {
    // 深拷贝
    const first = list.children[0].cloneNode(true);
    list.appendChild(first);
  }
  cloneFirstItem();
  
  const itemHeight = 20;
  let curIndex = 0;
  const duration = 2000;
  setInterval(moveNExt, duration);
  function moveNExt() {
    if (curIndex >= list.children.length - 1) {
      curIndex = 0;
    }
    list.scrollTop = itemHeight * curIndex;
    curIndex++;
  }
  moveNExt();
})();

