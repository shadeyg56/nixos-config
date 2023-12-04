import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import Header from './modules/header.js';
import { NetworkToggle, WifiSelection } from './modules/network.js';
import { BluetoothToggle, BluetoothDevices } from './modules/bluetooth.js';
import { Governor } from './modules/auto-cpufreq.js';
import Brightness from './modules/brightness.js';
import Volume from './modules/volume.js'

const Row = (toggles = [], menus = []) => Widget.Box({
    vertical: true,
    children: [
        Widget.Box({
            class_name: 'row horizontal',
            children: toggles,
        }),
        ...menus,
    ],
});

const Homogeneous = toggles => Widget.Box({
    homogeneous: true,
    children: toggles,
    vertical: true,
});

const ControlCenter = () => Widget.Box({
    className: 'controlcenter',
    vertical: true,
    children: [Header(),
        Widget.Box({
            className: "sliders-box",
            vertical: true,
            children: [
                Volume(),
                Brightness(),
            ],
        }),      
        Row([Homogeneous([NetworkToggle(), BluetoothToggle(), Governor()])],
        [WifiSelection(), BluetoothDevices()]),
    ],
});

const revealer = () => Widget.Revealer({
    transition: 'slide_down',
    connections: [[App, (self, wname, visible) => {
        if (wname === 'controlcenter')
            self.revealChild = visible
        }, 'window-toggled']
    ],
    child: ControlCenter(),
});

export default () => Widget.Window({
    name: 'controlcenter',
    popup: true,
    focusable: true,
    anchor: ["top", "right"],
    visible: false,
    child: Widget.Box({
        css: 'padding: 1px;',
        child: revealer(),
    }),
})