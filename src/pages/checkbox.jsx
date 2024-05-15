import KeepAlive, { useAliveController } from "react-activation"

import { useNavigate } from "react-router-dom";
export default (props) => {
    const navigate = useNavigate();
    const to = () => navigate("/");
    return <>
        checkbox:
        <input type="checkbox" />
    </>
}
