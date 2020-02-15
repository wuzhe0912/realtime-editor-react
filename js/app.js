// 頁面方便查看，監聽資料
const allData = firebase.database().ref()
allData.on('value', (snapshot) => {
  let path = document.getElementById('content')
  path.textContent = JSON.stringify(snapshot.val(), null, 2)
})
// --分隔--
// Dom 操作
let txt = document.querySelector('.txt')
let btn = document.querySelector('.btn')
let list = document.querySelector('.list')
let todoList = firebase.database().ref('todoList')

// send => save to database
btn.addEventListener('click', () => {
  todoList.push({contentList: txt.value}) 
})
// watch database
todoList.on('value', (snapshot) => {
  let str = ''
  let data = snapshot.val()
  for (let node in data) {
    // 插入 database 每筆資料的 key 到標籤上，data-key 是固定寫法
    str += '<li data-key="'+ node +'">' + data[node].contentList + '</li>'
  }
  list.innerHTML = str
})
// remove
list.addEventListener('click', (val) => {
  if (val.target.nodeName === 'LI') {
    let key = val.target.dataset.key
    todoList.child(key).remove()
  }
})
