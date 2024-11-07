import Hyprland from "gi://AstalHyprland"
import { Gtk } from "astal/gtk3"
import { bind, Variable } from "astal"

function Workspaces() {

    const hyprland = Hyprland.get_default();

    const getButtonClass = (i: number) => {
        const className = Variable.derive([bind(hyprland, "focusedWorkspace"), bind(hyprland, "clients")], (currentWorkspace, clients) => {
            if (currentWorkspace.id === i) {
                return "focused";
            } else {
                const workspaces = hyprland.get_workspaces().map((w) => w.id);
                if (workspaces.includes(i)) {
                    return "active"
                }
                else {
                    return "";
                }
            }
        })
        return className;
    }

    return (
        <box className="workspaces">
            {Array.from({length: 10}, (_, i) => 
            <button className={bind(getButtonClass(i+1))}>
                <label 
                    label={''}
                    css={bind(hyprland, "focusedWorkspace").as((currentWorkspace) => (i+1) === currentWorkspace.id ? "min-width: 20px;" : "min-width: 1px;")}
                    valign={Gtk.Align.CENTER}
                    halign={Gtk.Align.CENTER}
                />
            </button>)}
        </box>
    )
}

export default Workspaces;