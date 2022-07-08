import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllFurniture } from '../redux/furnitureItems/furniture';

function StorageMedia() {
    const dispatch = useDispatch();
    const furniture = useSelector((state) => state.furnitureReducer);
    useEffect(() => {
      dispatch(getAllFurniture());
    }, [dispatch]);

    const [isActive1, setIsActive1] = useState({
        activeObject: null,
    });

    function toggleActive(index) {
        setIsActive1({ ...isActive1, activeObject: index });
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


    return (
        <div id="container3">
            <h3>STORAGE & MEDIA FURNITURE</h3>
            <section id="grid">
            {furniture.length !== 0 ? (
                                furniture.map((item, index) => (
                                (item.category_id === 4) ? (
                                    <a href={item.id} className="grid-item" key={item.id}>
                                        <section id="grid-content">
                                            <img src={isActive1.activeObject === index ? (item.b_image) : (item.a_image)} alt={item.name + ' image'}  onMouseEnter={() => { toggleActive(index) }} onMouseLeave={() => { setIsActive1({ ...isActive1, activeObject: null }) }}  />
                                            <p>{item.name}</p>
                                            <p className="price">R {sort(item.price)}</p>
                                        </section>
                                    </a>
                                ) : (null)
                                ))
                            ) : (null)
            }
            </section>
        </div>
    );
}

export default StorageMedia;