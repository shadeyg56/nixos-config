import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';

const powerButton = () => Widget.Button({
    className: 'powerButton',
    child: Widget.Icon('system-shutdown-symbolic'),
    onClicked: () => execAsync(['adios', '--systemd']),
});

export default powerButton;