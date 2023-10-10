import { useEffect, useMemo, useState } from 'react';

import { db, auth } from './firebase';
import { ref, set, onValue, child, push, update } from 'firebase/database';


export function Page() {

    const [cookies, setCookies] = useState();
    const [userCookies, setUserCookies] = useState();

    const userCookiesFormatted = useMemo(() => {
        if (!userCookies || !cookies) return [];
        const list = []

        Object.keys(userCookies)?.forEach(id => {
            const cookie = cookies?.find(el => el.id === id);
            if (cookie) list.push({ ...cookie, progress: Math.round(userCookies[id]?.progress / cookie?.max * 100) })
        })
        return list;
    }, [cookies, userCookies]);

    const [cookieInput, setCookieInput] = useState({ name: '', amount: 0 })
    const [selectedCookie, setSelectedCookie] = useState({ id: null, name: '', amount: 0 })

    const cookiesRef = ref(db, 'cookies');
    const usersRef = useMemo(() => ref(db, `users/${auth?.currentUser?.uid || ''}`), [auth?.currentUser]);

    useEffect(() => {
        const unsub = onValue(cookiesRef, (snapshot) => {
            const items = [];
            const data = snapshot.val();
            if (data)
                Object.keys(data).forEach((key) => {
                    items.push({ id: key, ...data[key] })
                });
            setCookies(items)
        });
        return () => {
            unsub();
        };
    }, [])


    useEffect(() => {

        console.log('users useeffest')
        const unsub = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setUserCookies(data?.cookies || [])
            else setUserCookies([])
        });
        return () => {
            unsub();
        };
    }, [])





    const addCookie = async () => {
        try {
            await addDoc(cookiesRef, cookieInput);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteCookie = async (id) => {
        try {
            const cookieRef = doc(cookiesRef, id);
            await deleteDoc(cookieRef);
        } catch (error) {
            console.error(error);
        }
    }

    const updateCookie = async () => {
        const docRef = doc(cookiesRef, selectedCookie.id);
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

                <h3>Список кукисов пользователя {auth?.currentUser?.email}: </h3>
                <div style={{ width: '500px', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '5px', gap: '10px', fontWeight: 'bold' }}>
                        <div style={{ width: '20%' }}>КУки ID</div>
                        <div style={{ width: '20%' }}>Название печеньки</div>
                        <div style={{ width: '60%' }}>Сколько сожрали</div>
                    </div>

                    {userCookiesFormatted === undefined
                        ? 'Загрузити кукисы'
                        : userCookiesFormatted
                            ? userCookiesFormatted?.map((cookie) =>
                                <div key={cookie?.id}
                                    style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '5px', gap: '10px' }}>
                                    <div style={{ width: '20%' }}>{cookie?.id}</div>
                                    <div style={{ width: '20%' }}>{cookie?.name}</div>
                                    <div className='bar'>
                                        <div className='bar-stub' style={{ width: `${cookie?.progress}%` }} > {cookie?.progress}%</div>
                                    </div>

                                </div>)
                            : 'Нет кукисав ((('
                    }
                </div>


                {/* <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px', width: '100%' }}>

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



                </div> */}


            </div>


        </div>
    );
}
