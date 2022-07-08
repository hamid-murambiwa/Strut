import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllFurniture } from '../../redux/furnitureItems/furniture';
import { CartContext } from "../CartContext";
import ImageGallery from 'react-image-gallery';
import '../../styling/product.css';

let images = [];

function Page() {
    if (parseInt(window.location.pathname.slice(-2)) > 9) {
        return parseInt(window.location.pathname.slice(-2))
    } else {
        return parseInt(window.location.pathname.slice(-1))
    }
}

const pageNum = Page();

function ProductDisplay() {
    const { cart, setCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    console.log(cart);
    const dispatch = useDispatch();
    const furniture = useSelector((state) => state.furnitureReducer);
    useEffect(() => {
    dispatch(getAllFurniture());
    }, [dispatch]);

    function handleSubmit(item) {
        let value = false;

        cart.map(e => {
            if (e.name === item.name) {
                value = true;
            }
        })
        if (value) {
            cart.map((i, index) => {
                if (i.name === item.name) {
                    cart[index]['quantity'] = i.quantity + quantity;
                    cart[index]['price'] = quantity === 1 ? i.price + item.price : i.price * quantity; 
                    setCart(cart);
                    const data = JSON.stringify(cart);
                    localStorage.setItem('cart', data);
                }
            })
        } else {
            item['quantity'] = quantity;
            item['price'] = item.price * quantity;
            cart.push(item);
            setCart(cart);
            const data = JSON.stringify(cart);
            localStorage.setItem('cart', data);
        }
        window.location.reload();
    }

    function increment() {
        setQuantity(quantity + 1);
    }

    function decrement() {
        setQuantity(quantity - 1);
    }

    function sort(price) {
        let locales = [
            undefined,
            'en-US',
          ];
          let n = price;
          let opts = { minimumFractionDigits: 2 };
          for (let i = 0; i < locales.length; i++) {
            return n.toLocaleString(locales[i], opts);
          }
    }

    furniture.map((item) => (
        (item.id === pageNum) ? (
        images = [
            {
                original: item.a_image,
                thumbnail: item.a_image,
            },
            {
                original: item.b_image,
                thumbnail: item.b_image,
            },
            {
                original: item.c_image,
                thumbnail: item.c_image,
            },
            {
                original: item.d_image,
                thumbnail: item.d_image,
            },
        ]
        ) : (null)
    ));

    return (
        <div id="container3">
            <section id="prod-container">
                <ImageGallery items={images} showPlayButton={false} thumbnailPosition="left" showNav={false} width="100" />
                    {furniture.length !== 0 ? (
                        furniture.map((item) => (
                            (item.id === pageNum) ? (
                                <div className="p-c-con" key={item.id}>
                                    <strong>{item.name}</strong>
                                    <p>R {sort(item.price)}</p>
                                        {console.log(sort(item.price))}
                                    <strong>Details</strong>
                                    <p>{item.description}</p>
                                    <div>
                                        <li>{item.designer}</li>
                                        <li>{item.material}</li>
                                        <li>{item.made}</li>
                                    </div>
                                    <div className="quantity">
                                        <button type="button" className="q-btn" onClick={() => increment()}>
                                            +
                                        </button>
                                        <p>{quantity}</p>
                                        <button type="button" className="q-btn" onClick={() => decrement()}>
                                            -
                                        </button>
                                    </div>
                                    <button type="button" className="c-btn" onClick={() => handleSubmit(item)}>
                                        ADD TO CART
                                    </button>
                                </div>
                            ) : (null)
                        ))
                    ) : (null)
                    }
            </section>
        </div>
    );
}

export default ProductDisplay;