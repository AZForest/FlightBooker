import "./TopBar.css";
import icon from "../../assets/whiteplane1.png";

const topBar = () => {
    return (
        <div className="TopBar">
            <h2>Flight Booker</h2>
            <img src={icon} alt="plane"/>
        </div>
    )
}

export default topBar;