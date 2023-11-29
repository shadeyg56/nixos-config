import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';

let buttonIcon = Widget.Icon('pan-end-symbolic');

const controlCenterButton = () => Widget.Button({
    className: 'controlCenterButton',
    child: buttonIcon,
    onClicked: () => {
        App.toggleWindow('controlcenter')
    },
    connections: [[App, (_, wname, visible) => {
        if (wname === 'controlcenter')
            buttonIcon.css = visible ? '-gtk-icon-transform: rotate(90deg);' : '-gtk-icon-transform: rotate(0deg);'
        }, 'window-toggled']
    ],
});

export default controlCenterButton;