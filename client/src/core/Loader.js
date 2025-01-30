import { Spin } from "antd";

export default function Loader() {
    return (
        <div  style={{
            position: "absolute",
            top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
        }}>
            <Spin size="large" />
        </div>
    );
}
