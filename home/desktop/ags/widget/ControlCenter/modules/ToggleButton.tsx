import { bind, timeout, Variable } from "astal";
import { Gtk, Widget, Astal } from "astal/gtk3";
import Binding, { Connectable } from "astal/binding";
import { controlCenterStackWidget } from "../ControlCenter";

interface Connection {
    service: Connectable,
    signal: string,
    condition: Binding<boolean>
}

interface SimpleToggleProps {
    icon: Gtk.Widget,
    toggle: () => void,
    connection: Connection
}

interface ArrowButtonProps {
    name: string
    icon: Gtk.Widget,
    label: Gtk.Widget,
    activate: () => void,
    deactivate: () => void,
    activateOnArrow?: boolean,
    condition: Binding<boolean>
}

interface MenuProps {
    name: string,
    title: string,
    child?: Gtk.Widget | Binding<Gtk.Widget>
}

const opened = Variable("");

export function Arrow(name: string, activate: () => void) {
    let deg = 0;
    let iconOpened = false;

    const iconSetup = (icon: Widget.Icon) => {
        opened.subscribe((opened) => {
            if (opened === name && !iconOpened || opened !== name && iconOpened) {
                const step = opened === name ? 10 : -10;
                iconOpened = !iconOpened;
                for (let i = 0; i < 9; ++i) {
                    timeout(15 * i, () => {
                        deg += step;
                        icon.set_css(`-gtk-icon-transform: rotate(${deg}deg);`);
                    });
                }
            }
        })
    }

    
    return (
        <button
        onClick={() => {
            opened.set(opened.get() === name ? "" : name)
            activate();
        }}
        >
            <icon icon="pan-end-symbolic"
            setup={iconSetup}
            />
        </button>
    )
}

export function ArrowToggleButton({
    name,
    icon,
    label,
    activate,
    deactivate,
    activateOnArrow = true,
    condition
}: ArrowButtonProps) {

    return (
        <box className={bind(condition).as((c) => {
            let name = "toggle-button";
            if (c)
                name += " active";
            return name;
        })}> 
            <button
            onClick={(_, event) => {
                if (event.button === Astal.MouseButton.PRIMARY) {
                    if (condition.get()) {
                        deactivate();
                        if (opened.get() === name)
                            opened.set("");
                    } else {
                        activate();
                    }
                }
                else if (event.button === Astal.MouseButton.SECONDARY) {
                    controlCenterStackWidget.set("wifi")
                }

            }}
            >
                <box className="label-box-horizontal"
                hexpand={true}
                >
                    {icon}
                    {label}
                </box>
            </button>
        </box>
    )
}

// export function Menu({name, icon, title, content}: MenuProps) {
//     return (
//         <revealer
//         transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
//         revealChild={opened().as(v => v === name)}
//         >
//             <box className={`menu ${name}`}
//             vertical={true}
//             >
//                 <box className="title horizontal">
//                     {icon}
//                     {title}
//                 </box>
//                 {...content}
//             </box>
//         </revealer>
//     )
// }

export function Menu({name, title, child}: MenuProps) {
    return (
        <box name={name} vertical={true} className="menu">
                <button
                onClick={() => controlCenterStackWidget.set("controlcenter")}
                halign={Gtk.Align.START}
                className="menu-back"
                >
                    <icon icon="go-previous-symbolic"/>
                </button>
                <label className="menu-title" label={title}
                halign={Gtk.Align.START}
                />
                <scrollable vexpand={true}>
                    {child}
                </scrollable>
        </box>
    )
}



export function SimpleToggleButton({
    icon,
    toggle,
    connection: {service, signal, condition}
}: SimpleToggleProps) {

    const setup = (button: Widget.Button) => {
        service.connect(signal, () => {
            button.toggleClassName("active", condition.get());
        })
    }

    return (
        <button className="simple-toggle"
        onClick={toggle}
        setup={setup}
        >
            {icon}
        </button>
    )
}