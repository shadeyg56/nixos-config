import Wp from "gi://AstalWp";
import { Menu } from "./ToggleButton";
import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { SimpleToggleButton } from "../modules/ToggleButton";
import Pango from "gi://Pango";

const audio = Wp.get_default()?.audio!;


export default function AudioMenu() {


    return (
        <Menu
        name="audio"
        title="Audio Devices"
        >
            <box vertical={true}>
                {bind(audio, "speakers").as((sinks) => {
                    return sinks.map((sink) => (
                        <box className="menu-item">
                            <SimpleToggleButton
                            condition={bind(sink, "isDefault")}
                            toggle={() => sink.set_is_default(true)}                         
                            >
                                <box>
                                    <icon icon={bind(sink, "isDefault").as((isDefault => isDefault ? "radio-checked-symbolic" : "radio-symbolic"))}/>
                                    <label label={sink.name ? sink.name : sink.description}
                                    maxWidthChars={25}
                                    ellipsize={Pango.EllipsizeMode.END}
                                    />
                                </box>
                            </SimpleToggleButton>
                        </box>
                        
                        )
                    )
                }
                )}
            </box>
        </Menu>
    )
}