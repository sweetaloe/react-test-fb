# Как запускать
создано с create-react-app и живёт на [http://localhost:3000](http://localhost:3000) 
запускать с `npm start`

# Как жить с firebase или как он там

#### Норм видос - https://www.youtube.com/watch?v=-yrnWnN0g9o
#### 1. Заходим на https://console.firebase.google.com и создаём проект. При создании сохраняем себе `firebaseConfig`
#### 2. После создания проекта заходим в проект и в левом меню тыкаем на Build - Firestore Database.
#### 3. Коллекция по сути своей - название базы данных. Внутри неё лежат документы-объекты, например кукисы вида {name: 'я вкусный кукис', amount: 4}. Создайте сразу какой-нибудь документик чтобы чекать нормально ли удалось к бд подключиться.

#### 4. В проекте устанавливаем пакеты: 

`npm install firebase`
`npm install -g firebase-tools`


#### 5. В файлике src/firebase лежит конфигурация для подключения к бд. Можно скопипиздить и заменить `firebaseConfig` на свой из шага 1.
#### 6. Модифицируем функции под свой вкус и цвет.

## 7.  Realtime Database Rules - указываем что юзер может получать данные только по своему id
`
{
  "rules": {
    "users": {
          "$user_id": {
        ".read": "auth !== null && $user_id === auth.uid"
      }
    },
      "cookies": {
         ".read": "true"
      }
  }
}
`


