// 用js生成footerDOM节点并添加到body子元素的的最后面
// 方便多个页面调用
// 减少代码量，借鉴React的开发思想
// 缺点也非常明显，不过对于学习js没毛病

const body = document.querySelector("body");

function _(el) {
  return document.createElement(el);
}

/*
  1. 开始时间轴，同步执行
  2. 现在的时间轴，异步执行
  3. 运行时间轴，格式化时间轴
*/
let year = new Date().getFullYear();
let startYear = new Date("2020-5-25").getTime();

// footer
const footer = document.createElement("footer");
footer.className = "footer";
// p
const p = document.createElement("p");
p.innerHTML = `Powered by Copyright © 一 叶 知 秋 2020 - ${year} 版权所有`;
// div.run
const divRun = _("div");
divRun.className = "website_run_time"
divRun.innerHTML = "website_run_time"
// 组成footerDOM节点
footer.appendChild(p);
footer.appendChild(divRun);

body.appendChild(footer);
