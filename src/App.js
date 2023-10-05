import './App.css';
import { useEffect, useState } from 'react';

import db from './firebase';
//куча методов, половина для запросов (это когда хочется достать не всю коллекцию, а что-то конкретное)
import {
  doc,
  onSnapshot, // это подписка на апдейты коллекции, один раз объявляем в useEffect'е и пока открыта страница, данные будут автообновляться Слава вебсокетам!
  updateDoc, //обновляем какие то данные в коллекции, ожидает в себя референс на документ первым аргументом, и объект с новыми данными вторым
  setDoc, //те же яйца что и update, только вместо того чтобы обновить существующее полностью перезаписывает документ
  addDoc, //добавить новый документ в коллекцию. принимает в себя референс на коллекцию и объект с полями документа
  deleteDoc, // удалить документ в коллекции. принимает в себя референс на документ
  collection, //позволяет получить референс на коллекцию. первый аргумент бд созданная в firebase. и имя коллекции
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';


function App() {

  const [cookies, setCookies] = useState();
  const [cookieInput, setCookieInput] = useState({ name: '', amount: 0 })
  const [selectedCookie, setSelectedCookie] = useState({ id: null, name: '', amount: 0 })

  const collectionRef = collection(db, 'cokies')
  //да очепятка в названии я в курсе


  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setCookies(items);
    });
    return () => {
      unsub();
    };
  }, [])


  const addCookie = async () => {
    try {
      await addDoc(collectionRef, cookieInput);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteCookie = async (id) => {
    try {
      const cookieRef = doc(collectionRef, id);
      await deleteDoc(cookieRef);
    } catch (error) {
      console.error(error);
    }
  }

  const updateCookie = async () => {
    const docRef = doc(collectionRef, selectedCookie.id);
    try {
      await updateDoc(docRef, selectedCookie);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">


      <div>
        <h1>КУКИСы:</h1>

        <h3>Список кукисов: </h3>
        <ul style={{ width: 'fit-content', margin: 'auto' }}>
          {cookies === undefined
            ? 'Загрузити кукисы'
            : cookies
              ? cookies?.map((item, index) =>
                <li key={index}
                  style={{ display: 'flex', flexDirection: 'row' }}>

                  <div style={{ width: '400px' }}>{`${item?.id} - ${item?.name} - ${item?.amount}`}</div>
                  <button onClick={() => deleteCookie(item.id)}>Удалить нахуй</button>
                  <button onClick={() => setSelectedCookie(item)}>Отредачить нахуй</button>

                </li>)
              : 'Нет кукисав ((('
          }
        </ul>


        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px', width: '100%' }}>

          <div style={{ width: '50%' }}>
            <h3 style={{ marginTop: '20px' }}>Добавить кукис ёпта</h3>
            <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto', gap: '10px', width: 'fit-content' }}>
              <input
                type="string"
                placeholder='name'
                value={cookieInput.name}
                onChange={(e) => setCookieInput((prev) => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="number"
                placeholder='amount'
                value={cookieInput.amount}
                onChange={(e) => setCookieInput((prev) => ({ ...prev, amount: e.target.value }))}
              />

              <button onClick={addCookie}>Добавить кукис</button>
            </div>
          </div>

          <div style={{ width: '50%' }}>
            <h3 style={{ marginTop: '20px' }}>Изменить кукис ёпта</h3>
            {selectedCookie?.id === null
              ? <h5>Выбери кукис чтобы отредачить </h5>
              : <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto', gap: '10px', width: 'fit-content' }}>

                <input
                  type="string"
                  placeholder='новое name'
                  value={selectedCookie.name}
                  onChange={(e) => setSelectedCookie((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                  type="number"
                  placeholder='новое amount'
                  value={selectedCookie.amount}
                  onChange={(e) => setSelectedCookie((prev) => ({ ...prev, amount: e.target.value }))}
                />

                <button onClick={updateCookie}>Изменить кукис</button>
              </div>
            }
          </div>



        </div>


      </div>


    </div>
  );
}

export default App;
