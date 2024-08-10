import './App.css'
import {useEffect, useState} from "react";
import {getData} from "./constants/db.js";
import Card from "./components/card/card.jsx";
import Cart from "./components/cart/cart.jsx";


const course = getData();


const telegram = window.Telegram.WebApp;

function App() {
    const [cartItems, setcartItems] = useState([]);

    useEffect(() => {
        telegram.ready();
    })

    const onAddItem = item => {
        const existItem = cartItems.find(c => c.id === item.id);

        if(existItem) {
            const newData = cartItems.map(c => c.id === item.id ? {...existItem, qty: existItem.qty + 1} : c
            );
            setcartItems(newData);
        }else {
            const newData = [...cartItems, {...item, qty: 1}];
            setcartItems(newData);
        }
    }

    const onRemoveItem = item => {
        const existItem = cartItems.find(c => c.id === item.id);
        if(existItem.qty === 1) {
            const newData = cartItems.filter(c => c.id !== item.id);
            setcartItems(newData);
        }else {
            const newData = cartItems.map(c => c.id === item.id ? {...existItem, qty: existItem.qty - 1} : c
            );
            setcartItems(newData);
        }
    }

    const onCheckout = () => {
        telegram.Mainbutton.text = 'Sotib olish :)';
        telegram.Mainbutton.show();
    };

  return (
    <div>
        <h1 className={'heading'}>Kafolat mahsulotlari</h1>
        <Cart cartItems={cartItems}/>
        <div className={"cards__container"}>
            {course.map((course) => (
                <Card
                    key={course.id}
                    course={course}
                    onAddItem={onAddItem}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </div>
    </div>
  )
}

export default App
