// 頁面方便查看，監聽資料
const allData = firebase.database().ref()
allData.on('value', (snapshot) => {
  let path = document.getElementById('content')
  path.textContent = JSON.stringify(snapshot.val(), null, 2)
})
// --分隔--
