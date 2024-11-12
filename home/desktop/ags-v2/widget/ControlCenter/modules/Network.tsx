import { ArrowToggleButton } from "./ToggleButton";
import { Widget } from "astal/gtk3";
import { bind, Variable } from "astal";
import Network from "gi://AstalNetwork";
import Pango from "gi://Pango";

const network = Network.get_default();

export function NetworkToggle() {

    const toggleIcon = <icon
        icon={bind(network.wifi, "iconName")}
    />

    const label = <label
        ellipsize={Pango.EllipsizeMode.END}
        label={Variable.derive([bind(network.wifi, "ssid"), bind(network.wifi, "enabled")], (ssid, enabled) => 
            enabled ? ssid : "Not Connected")()
        }
    />

    return (
        <ArrowToggleButton
        name="network"
        icon={toggleIcon}
        label={label}
        connection={{
            service: network.wifi,
            signal: "state-changed",
            condition: bind(network.wifi, "enabled")
        }}
        deactivate={() => network.wifi.set_enabled(false)}
        activate={() => {
            network.wifi.set_enabled(true)
            network.wifi.scan();
        }}
        />
    )
}