document.addEventListener("DOMContentLoaded", function () {
  console.log("all ready");

  const liffId = process.env.LIFF_ID;
  initializeLiff(liffId);
});

function initializeLiff(liffId) {
  liff
    .init({
      liffId: liffId,
    })
    .then(() => {
      // Webブラウザからアクセスされた場合は、LINEにログインする
      if (!liff.isInClient() && !liff.isLoggedIn()) {
        window.alert("LINEアカウントにログインしてください。");
        liff.login({ redirectUri: location.href });
      }
    })
    .catch((err) => {
      console.log("LIFF Initialization failed ", err);
    });
}

function sendText(text) {
  if (!liff.isInClient()) {
    shareTargetPicker(text);
  } else {
    sendMessages(text);
  }
}

// LINEトーク画面上でメッセージ送信
function sendMessages(text) {
  liff
    .sendMessages([
      {
        type: "text",
        text: text,
      },
    ])
    .then(function () {
      liff.closeWindow();
    })
    .catch(function (error) {
      window.alert("Failed to send message " + error);
    });
}

// Webブラウザからメッセージ送信
function shareTargetPicker(text) {
  liff
    .shareTargetPicker([
      {
        type: "text",
        text: text,
      },
    ])
    .catch(function (error) {
      window.alert("Failed to send message " + error);
    });
}
