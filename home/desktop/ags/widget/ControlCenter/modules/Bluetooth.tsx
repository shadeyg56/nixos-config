import { ArrowToggleButton } from "./ToggleButton";
import { bind, Variable } from "astal";
import Bluetooth from "gi://AstalBluetooth";
import Pango from "gi://Pango";

const bluetooth = Bluetooth.get_default();

export default function BluetoothToggle() {

    const icon = <icon
    icon={bind(bluetooth, "isPowered").as((enabled) => 
        enabled ? "bluetooth-active-symbolic" 
        : "bluetooth-disabled-symbolic"
    )}/>

    const labelBind = Variable.derive([bind(bluetooth, "isPowered"), bind(bluetooth, "devices")], 
    (enabled, devices) => {
        if (!enabled)
            return "Disabled";

        const connectedDevices = devices.filter((device) => device.get_connected());

        if (connectedDevices.length === 0)
            return "Not Connected";

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