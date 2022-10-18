export function Page() {
  if (parseInt(window.location.pathname.slice(-2), 10) > 9) {
    return parseInt(window.location.pathname.slice(-2), 10);
  }
  return parseInt(window.location.pathname.slice(-1), 10);
}

/* eslint-disable */
export function findId() {
  if (Page() <= 10) {
    return 1;
  } if (Page() <= 20) {
    return 2;
  } if (Page() <= 30) {
    return 3;
  } if (Page() <= 40) {
    return 4;
  } if (Page() <= 50) {
    return 5;
  }
}

export function findRoute() {
  if (Page() <= 10) {
    return 'livingRoom';
  } if (Page() <= 20) {
    return 'diningKitchen';
  } if (Page() <= 30) {
    return 'bedroom';
  } if (Page() <= 40) {
    return 'storageMedia';
  } if (Page() <= 50) {
    return 'office';
  }
}

export function findCategoryName() {
  if (Page() <= 10) {
    return 'LIVING ROOM FURNITURE';
  } if (Page() <= 20) {
    return 'DINING & KITCHEN FURNITURE';
  } if (Page() <= 30) {
    return 'BEDROOM FURNITURE';
  } if (Page() <= 40) {
    return 'STORAGE & MEDIA FURNITURE';
  } if (Page() <= 50) {
    return 'OFFICE FURNITURE';
  }
}

export function handleSubmit(item, cart, setCart, quantity, setMessage) {
  let value = false;

  cart.map((e) => {
    if (e.name === item.name) {
      value = true;
    }
  });
  if (value) {
    cart.map((i, index) => {
      if (i.name === item.name) {
        cart[index].quantity = i.quantity + quantity;
        cart[index].price = quantity === 1 ? i.price + item.price : i.price * quantity;
        setCart(cart);
        const data = JSON.stringify(cart);
        localStorage.setItem('cart', data);
      }
    });
  } else {
    item.quantity = quantity;
    item.price *= quantity;
    cart.push(item);
    setCart(cart);
    const data = JSON.stringify(cart);
    localStorage.setItem('cart', data);
  }
  setTimeout(() => {
    window.location.href = `/shop/${Page()}`;
  }, 150);
  setMessage('Item added successfully');
}

export function getDate(val) {
  const date_1 = new Date(val);
  const date_2 = new Date();
  const difference = date_2.getTime() - date_1.getTime();

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const TotalDays = Math.ceil(hours / 24);

  if (TotalDays >= 360) {
    if (Math.floor(TotalDays / 360) <= 1) {
      return `1 year`
     }
    return `${Math.floor(TotalDays / 360)} years`;
  } if (TotalDays >= 31) {
    if (Math.floor(TotalDays / 31) <= 1) {
      return `1 month`;
    }
    return `${Math.floor(TotalDays / 31)} months`;
  } if (TotalDays < 1) {
      if (minutes < 60) {
        if (minutes <= 1) {
          return `1 minute`;
        }
        return `${minutes} minutes`;
      }
      if (hours <= 1) {
        return `1 hour`;
      }
      return `${hours} hours`;
  }
  if (TotalDays <= 1) {
    return `1 day`;
  }
  return `${TotalDays} days`;
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
  const locales = [
    undefined,
    'en-US',
  ];
  const n = price;
  const opts = { minimumFractionDigits: 2 };
  for (let i = 0; i < locales.length; i++) {
    return n.toLocaleString(locales[i], opts);
  }
}
