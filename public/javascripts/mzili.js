onload = function () {
  const $ = (el) => {
    return document.getElementById(el);
  };
  let btn = $("menu_btn");
  let menu_li = $("menu_li");
  btn.onclick = function () {
    menu_li.className === "hide"
      ? (menu_li.className = "show")
      : (menu_li.className = "hide");
  };
};
