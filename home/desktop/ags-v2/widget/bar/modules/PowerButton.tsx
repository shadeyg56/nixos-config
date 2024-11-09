import { execAsync } from "astal";


export default function PowerButton() {

    const handleClick = () => {
        execAsync(["adios", "--systemd"]);
    }

    return (
        <button className="powerButton"
        onClick={handleClick}
        >
            <icon icon="system-shutdown-symbolic"/>
        </button>
    )
}