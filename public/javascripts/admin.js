// ----------admin.js
(function () {
  function createXHR() {
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
    return xhr;
  }

  function ajax(obj) {
    var xhr = createXHR();

    //通过params()将名值对转换成字符串
    obj.data = params(obj.data);

    //判断请求方式
    if (obj.method === "get") {
      //如果是get请求则将url加在后面，并且需要根据是否存在问好和&来处理
      obj.url += obj.url.indexOf("?") == -1 ? "?" + obj.data : "&" + obj.data;
    }

    //同步
    if (obj.async === false) {
      callback();
    }

    //异步
    if (obj.async === true) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          callback();
        }
      };
    }

    xhr.open(obj.method, obj.url, obj.async);

    if (obj.method === "post") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(obj.data);
    } else {
      xhr.send(null);
    }

    function callback() {
      if (xhr.status == 200) {
        //判断http的交互是否成功，200表示成功
        console.log(obj);
        obj.success(xhr.responseText); //回调传递参数
      } else {
        obj.error("请求错误");
      }
    }

    //键值对转换字符串
    function params(data) {
      var arr = [];
      for (var i in data) {
        arr.push(i + "=" + data[i]);
      }
      return arr.join("&");
    }
  }

  window.ajax = ajax;
})();

onload = function () {
  // 侧边栏伸缩
  let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");
  let log_out = document.querySelector("#log_out");
  // ------------------
  let profile = document.querySelector("#profile");
  let href = document.querySelector(".href");

  btn.onclick = function () {
    sidebar.classList.toggle("active");
  };
  log_out.onclick = function () {
    sidebar.classList.toggle("active");
  };
  profile.onclick = function () {
    href.className === "href hide"
      ? (href.className = "href show")
      : (href.className = "href hide");
  };
  //==================================ECharts
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("main"));
  var myChart_2 = echarts.init(document.getElementById("main_2"));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    legend: {
      data: ["文章"],
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "文章",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart_2.setOption(option);
  // =================================ECharts

  // ================================ 定义变量
  let articleTitle = "";
  let articleCategory = "";
  let articleAuthor = "";
  let articleImgUrl = "";
  let articleCreatedAt = "";
  let articleContent = "";
  // ---------获取el，通过id
  const $ = (el) => {
    return document.getElementById(el);
  };
  let addOrEditArticle = $("addOrEditArticle");
  let article_input_title = $("article_input_title");
  let article_select_category = $("article_select_category");
  let article_input_author = $("article_input_author");
  let article_input_imgUrl = $("article_input_imgUrl");
  let article_input_createdAt = $("article_input_createdAt");
  let article_text_content = $("article_text_content");

  // -------------------给el绑定事件
  article_input_title.onchange = onChangeTitle = () => {
    articleTitle = article_input_title.value;
  };
  article_select_category.onchange = onChangeCategory = () => {
    articleCategory = article_select_category.value;
  };
  article_input_author.onchange = onChangeAuthor = () => {
    articleAuthor = article_input_author.value;
  };
  article_input_imgUrl.onchange = onChangeImgUrl = () => {
    articleImgUrl = article_input_imgUrl.value;
  };
  article_input_createdAt.onchange = onChangeCreatedAt = () => {
    articleCreatedAt = article_input_createdAt.value;
  };
  article_text_content.onchange = onChangeContent = () => {
    articleContent = article_text_content.value;
  };

  // 根据url来判断是添加还是编辑
  // getArticleById for edit and update
  // 获取当前页面完整url
  const url = window.location.href;
  article_id = url.split("=")[1];
  if (article_id) {
    addOrEditArticle.innerHTML = "edit";
    ajax({
      method: "get",
      url: "http://127.0.0.1:3000/api/getArticleById?id=" + article_id,
      success: function (message) {
        const data = JSON.parse(message);
        if (data.errno === 0) {
          article_input_title.value = data.data.title;
          article_select_category.value = data.data.category;
          article_input_author.value = data.data.username;
          article_input_imgUrl.value = data.data.imgUrl;
          article_input_createdAt.value = data.data.createdAt;
          article_text_content.value = data.data.content;
        } else {
          alert("error");
        }
      },
      async: true,
      error: function (error) {
        console.log(error);
      },
    });
  }
  // ------------------- post or update ---------------
  addOrEditArticle.onclick = addArticle = () => {
    if (addOrEditArticle.innerHTML === "add") {
      ajax({
        method: "post",
        url: "http://127.0.0.1:3000/api/addArticle",
        data: {
          title: articleTitle,
          category: articleCategory,
          username: articleAuthor,
          imgUrl: articleImgUrl,
          createdAt: articleCreatedAt,
          content: articleContent,
        },
        success: function (message) {
          console.log(message);
          message == 0
            ? (window.location.href = "http://127.0.0.1:3000/admin/articles")
            : alert("添加失败");
        },
        async: true,
        error: function (error) {
          console.log(error);
        },
      });
    } else {
      ajax({
        method: "post",
        url: "http://127.0.0.1:3000/api/updateArticle",
        data: {
          title: article_input_title.value,
          category: article_select_category.value,
          username: article_input_author.value,
          imgUrl: article_input_imgUrl.value,
          createdAt: article_input_createdAt.value,
          content: article_text_content.value,
        },
        success: function (message) {
          console.log(message);
          message !== 0
            ? (window.location.href = "http://127.0.0.1:3000/admin/articles")
            : alert("添加失败");
        },
        async: true,
        error: function (error) {
          console.log(error);
        },
      });
    }
  };
};
