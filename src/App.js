import { useEffect, useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Page } from './Page';
import { auth } from './firebase'

function App() {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(() => setIsAuth(!!auth?.currentUser?.uid));
  }, [])


  return <>
    {isAuth === undefined
      ? <h4 style={{ margin: 'auto', marginTop: '100px', width: '100%', textAlign: 'center' }}> Загрузка ...</h4>
      : isAuth
        ? <Page />
        : <Login />
    }

  </>;
}

export default App;
