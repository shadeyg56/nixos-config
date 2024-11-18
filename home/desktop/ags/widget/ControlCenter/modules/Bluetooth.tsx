import { ArrowToggleButton, Menu } from "./ToggleButton";
import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import Bluetooth from "gi://AstalBluetooth";
import Pango from "gi://Pango";

const bluetooth = Bluetooth.get_default();

export default function BluetoothToggle() {

    const icon = <icon
    icon={bind(bluetooth, "isPowered").as((enabled) => 
        enabled ? "bluetooth-active-symbolic" 
        : "bluetooth-disabled-symbolic"
    )}/>

    const labelBind = Variable.derive([bind(bluetooth, "isPowered"), bind(bluetooth, "isConnected")], 
    (enabled, connected) => {
        if (!enabled)
            return "Disabled";

        if (!connected) {
            return "Not Connected";
        }

        const connectedDevices = bluetooth.get_devices().filter((device) => device.get_connected());

        if (connectedDevices.length === 1)
            return connectedDevices[0].alias;

        return `${connectedDevices.length} Devices Connected`;
    })

    const label = <label
    label={labelBind()}
    ellipsize={Pango.EllipsizeMode.END}
    />

    return (
        <ArrowToggleButton
        name="bluetooth"
        icon={icon}
        label={label}
        activate={() => bluetooth.get_adapter()?.set_powered(true)}
        deactivate={() => bluetooth.get_adapter()?.set_powered(false)}
        condition={bind(bluetooth, "isPowered")}
        />
    )
}

export function BluetoothMenu() {

    const getDeviceIcon = (device: Bluetooth.Device) => {
        if (device.connected) {
            return "spinner-symbolic"
        } else if (device.connecting) {
            return "spinner-symbolic"
        }
        return "";
    }

    return (
        <Menu name="bluetooth"
            title="Bluetooth Devices"
        >
            <box vertical={true}>
                    {bind(Variable.derive([bind(bluetooth, "devices")], ((devices) => devices.map((device) =>
                        <button className="menu-item"
                        onClick={() => {
                            if (!bluetooth.isPowered)
                                bluetooth.get_adapter()?.set_powered(true);
                            if (device.connected)
                                device.disconnect_device(() => {});
                            else
                                device.connect_device(() => {});
                        }}
                        >
                            <box>
                                <icon icon={bind(Variable.derive([bind(device, "connected"), bind(device, "connecting")], (connected, connecting) => 
                                    connected ? "object-select-symbolic" 
                                    : (connecting ? "content-loading-symbolic" : "")
                                ))}
                                css={"font-size: 20px;"}
                                />
                                <label label={device.alias}
                                maxWidthChars={25}
                                ellipsize={Pango.EllipsizeMode.END
                                }
                                />
                            </box>
                        </button>
                    ))))}
  
            </box>
        </Menu>
    )
}