import { ArrowToggleButton, Menu } from "./ToggleButton";
import { Gtk } from "astal/gtk3";
import { bind, execAsync, Variable } from "astal";
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
        condition={bind(network.wifi, "enabled")}
        deactivate={() => network.wifi.set_enabled(false)}
        activate={() => {
            network.wifi.set_enabled(true)
            network.wifi.scan();
        }}
        />
    )
}

export function WifiMenu() {

    const accessPoints = bind(network.wifi, "accessPoints").as((aps) => 
        aps.filter((ap, index, array) => 
            array.findIndex(obj => obj.ssid === ap.ssid) === index
            && ap.ssid !== null
        )
    )

    return (
        <Menu name="network"
            title="Wifi Network"
        >
            <box vertical={true}>
                    {bind(Variable.derive([bind(accessPoints), bind(network.wifi, "activeAccessPoint")], ((aps, active) => aps.map((ap) =>
                        <button className="menu-item"
                        onClick={() => {
                            if (active !== null && active.ssid === ap.ssid)
                                execAsync(`nmcli c down ${ap.ssid}`)
                            else
                                execAsync(`nmcli d wifi connect ${ap.ssid}`)
                        }}
                        >
                            <box>
                                {active != null && active.ssid === ap.ssid
                                ? <icon icon={"object-select-symbolic"}
                                    css={"font-size: 20px;"}
                                    />
                                : ""
                                }
                                <label label={ap.ssid}
                                maxWidthChars={25}
                                ellipsize={Pango.EllipsizeMode.END
                                }
                                />
                                <icon icon={ap.iconName}
                                halign={Gtk.Align.END}
                                hexpand={true}
                                css={"font-size: 20px;"}
                                />
                            </box>
                        </button>
                    ))))}
  
            </box>
        </Menu>
    )
}