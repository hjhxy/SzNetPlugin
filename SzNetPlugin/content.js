console.log("深圳大学自动化登录");

// 自动填充并登录
function autoFillAndLogin(username, password) {
  document.querySelector('input[id="VipDefaultAccount"]').value = username;
  document.querySelector('input[id="VipDefaultPassword"]').value = password;
  document.querySelector('input[id="login"]').click();
}

// 检查是否已有保存的用户名和密码
// chrome.storage.local.get(["savedUsername", "savedPassword"], function (result) {
//     if (result.savedUsername && result.savedPassword) {
//         autoFillAndLogin(result.savedUsername, result.savedPassword);
//     }
// });

// 监听用户点击登录按钮
if (document.querySelector('input[id="LogoutButton"]')) {
  console.log("页面已登录");
} else {
  const $login = document.querySelector('input[type="submit"]');
  if (!$login) {
    throw new Error("页面更新，请联系开发人员");
  }

  const cookies = document.cookie.split(";");
  const sz_login = cookies.find((cookie) => {
    return cookie.split("=")[0] == "md5_login";
  });

  if (sz_login) {
    const [key, value] = sz_login.split("=");
    const [name, password] = decodeURI(value).split("|");
    console.log(name, password);
    if (name && password) {
      autoFillAndLogin(name, password);
    }
  }

  $login.addEventListener("click", function () {
    const username = document.querySelector(
      'input[id="VipDefaultAccount"]'
    ).value;
    const password = document.querySelector(
      'input[id="VipDefaultPassword"]'
    ).value;

    // 保存用户名和密码到 Chrome 存储
    chrome.storage.local.set(
      { savedUsername: username, savedPassword: password },
      function () {
        console.log("Credentials saved!");
      }
    );
  });
}
