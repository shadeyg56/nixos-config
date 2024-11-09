import Network from "gi://AstalNetwork";
import { bind } from "astal";

export default function NetworkIndicator() {

    const network = Network.get_default();

    const enumMap = new Map<number, string>([
        [Network.Primary.UNKNOWN, "disconnected"],
        [Network.Primary.WIFI, "wifi"],
        [Network.Primary.WIRED, "wired"]
    ])

    return (
        <stack className="netIcon"
        shown={bind(network, "primary").as((p) => enumMap.get(p) ?? "disconnected")}
        >
            <icon name="wifi"
            icon="network-wireless-symbolic"
            />
            <icon name="wired"
            icon="network-wired-symbolic"
            />
            <icon name="disconnected"
            icon="network-wireless-offline-symbolic"
            />
        </stack>
    )
}