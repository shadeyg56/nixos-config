import { bind, timeout, Variable } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { Connectable } from "astal/binding";

interface Connection {
    service: Connectable,
    signal: string,
    condition: boolean
}

interface SimpleToggleProps {
    icon: Widget.Icon
    toggle: () => void
    connection: Connection
}

interface ArrowButtonProps {
    name: string
    icon: Widget.Icon,
    label: Widget.Label,
    activate: () => void,
    deactivate: () => void,
    activateOnArrow?: boolean,
    connection: Connection
}

interface MenuProps {
    name: string,
    icon: Widget.Icon
    title: Widget.Label
    content: Gtk.Widget[]
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
    connection: {service, signal, condition}
}: ArrowButtonProps) {

    const setup = (box: Widget.Box) => {
        service.connect(signal, () => {
            box.toggleClassName("active", condition);
        })
    }

    return (
        <box className="toggleButton" setup={setup}> 
            <button
            onClick={() => {
                if (condition) {
                    deactivate();
                    if (opened.get() === name)
                        opened.set("");
                } else {
                    activate();
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

export function Menu({name, icon, title, content}: MenuProps) {
    return (
        <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
        revealChild={opened().as(v => v === name)}
        >
            <box className={`menu ${name}`}
            vertical={true}
            >
                <box className="title horizontal">
                    {icon}
                    {title}
                </box>
                {...content}
            </box>
        </revealer>
    )
}



export function SimpleToggleButton({
    icon,
    toggle,
    connection: {service, signal, condition}
}: SimpleToggleProps) {

    const setup = (button: Widget.Button) => {
        service.connect(signal, () => {
            button.toggleClassName("active", condition);
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