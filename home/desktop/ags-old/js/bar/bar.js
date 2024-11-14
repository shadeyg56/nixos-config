import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Clock from './modules/clock.js';
import { DynamicWorkspaces, Workspaces } from './modules/workspaces.js';
import Battery from './modules/battery.js';
import NetworkIndicator from './modules/network.js';
import Volume from './modules/volume.js';
import focusedTitle from './modules/focusedWindow.js';
import powerButton from './modules/powerButton.js';
import controlCenterButton from './modules/controlCenterButton.js';
import MediaBox from './modules/media.js';

const Left = () => Widget.Box({
    children: [
        Workspaces(),
        focusedTitle(),
    ]
})

const Center = () => Widget.Box({
    children: [
        Clock(),
        MediaBox(),
    ]
})

const Right = () => Widget.Box({
    children: [
        controlCenterButton(),
        Widget.Box({
            className: 'rightBox',
            children: [
                Volume(),
                Battery(),
                NetworkIndicator(),
                powerButton(),
            ]
        })
    ],
    hpack: 'end',
})

const Bar = (monitor = 0) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    class_name: 'bar',
    anchor: ['top', 'left', 'right'],
    margins: [6, 6, 0, 6],
    exclusivity: 'exclusive',
    layer: "top",
    child: Widget.CenterBox({
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right(),
    }),
})

export default Bar;