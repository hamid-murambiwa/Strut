import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAllFurniture } from '../redux/furnitureItems/furniture';
import { sort } from "../services/tools";

function LivingRoom() {
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

    return (
        <div id="container3">
        <div className="prod-nav">
            <Link to="/shop">FURNITURE</Link>
        </div>
            <h3>LIVING ROOM FURNITURE</h3>
            <section id="grid">
            {furniture.length !== 0 ? (
                                furniture.map((item, index) => (
                                (item.category_id === 1) ? (
                                    <a href={item.id} className="grid-item" key={item.id}>
                                        <section id="grid-content">
                                            <img src={isActive1.activeObject === index ? (item.b_image) : (item.a_image)} alt={item.name + ' image'}  onMouseEnter={() => { toggleActive(index) }} onMouseLeave={() => { setIsActive1({ ...isActive1, activeObject: null }) }} onTouchStart={() => { toggleActive(index) }} onTouchEnd={() => { setIsActive1({ ...isActive1, activeObject: null }) }} />
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

export default LivingRoom;