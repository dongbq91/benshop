import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const BlockCart = () => {

    const [storage, setStorage] = useState()

    useEffect(() => {
        window.addEventListener('emitCart', ({detail}) => {
            setStorage(detail != null ? JSON.parse(detail).length : 0)
        })
    }, [storage]);

    return <li className="nav-item">
        <Link className="nav-link" to="/cart" style={{position: "relative"}}>
            <i className="bi bi-cart"/>
            <i style={{position: "absolute", bottom: 20, color: "red"}}>
                <b>{storage !== 0 ? storage : ''}</b>
            </i>
        </Link>
    </li>
}
export default BlockCart