import Hyprland from "gi://AstalHyprland"
import { bind } from "astal";
import Pango from "gi://Pango";

function FocusedWindow() {

    const hyprland = Hyprland.get_default();

    return (
        <box 
        className="focusedTitle"
        visible={bind(hyprland, "focusedClient").as((client) => client ? true : false)}
        >
            <label
            maxWidthChars={40}
            ellipsize={Pango.EllipsizeMode.MIDDLE}
            label={bind(hyprland, "focusedClient").as((c) => c?.title ?? "")}
            >

            </label>
        </box>
    )
}

export default FocusedWindow;