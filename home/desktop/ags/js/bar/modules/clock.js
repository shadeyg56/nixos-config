import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';

const Clock = () => Widget.Button({
    child: Widget.Label({
            className: 'clock'
        }).poll(1000, self => execAsync(['date', '+%H:%M'])
        .then(date => self.label = date).catch(console.error)),
    onClicked: () => App.toggleWindow('calendar')

});
export default Clock;