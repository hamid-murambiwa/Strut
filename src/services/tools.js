
export function Page() {
    if (parseInt(window.location.pathname.slice(-2)) > 9) {
        return parseInt(window.location.pathname.slice(-2))
    } else {
        return parseInt(window.location.pathname.slice(-1))
    }
}

     export function findId() {
        if (Page() <=10) {
            return 1;
        } else if (Page() <=20) {
            return 2;
        } else if (Page() <=30) {
            return 3;
        } else if (Page() <=40) {
            return 4;
        } else if (Page() <=50) {
            return 5;
        }
      }

     export function findRoute() {
        if (Page() <=10) {
            return "livingRoom";
        } else if (Page() <=20) {
            return "diningKitchen";
        } else if (Page() <=30) {
            return "bedroom";
        } else if (Page() <=40) {
            return "storageMedia";
        } else if (Page() <=50) {
            return "office";
        }
      }

      
     export function findCategoryName() {
        if (Page() <=10) {
            return "LIVING ROOM FURNITURE";
        } else if (Page() <=20) {
            return "DINING & KITCHEN FURNITURE";
        } else if (Page() <=30) {
            return "BEDROOM FURNITURE";
        } else if (Page() <=40) {
            return "STORAGE & MEDIA FURNITURE";
        } else if (Page() <=50) {
            return "OFFICE FURNITURE";
        }
      }


    export function handleSubmit(item, cart, setCart, quantity, setMessage) {
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
        setTimeout(() => {
            window.location.reload();
          }, 200);
        setMessage('Item added successfully');
    }


    export function getDate(val) {
        const date_1 = new Date(val);
        const date_2 = new Date();
        const difference = date_1.getTime() - date_2.getTime();

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

        if (TotalDays >= 360) {
            return (TotalDays / 360) + ' years';
        } else if (TotalDays >= 31) {
            return (TotalDays / 31) + ' months';
        } else if (TotalDays < 1) {
                if (minutes > 60) {
                    return minutes + ' minutes';
                } else {
                    return hours + ' hours';
                }
        } else {
            return TotalDays + ' days';
        }
    }


    export function increment(quantity, setQuantity) {
        setQuantity(quantity + 1);
    }

    export function decrement(quantity, setQuantity) {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    export function sort(price) {
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