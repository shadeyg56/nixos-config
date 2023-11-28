import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import { Box, Button, Revealer, Label, Icon} from 'resource:///com/github/Aylur/ags/widget.js';

const BatteryIcon = () => Icon({
    className: 'batIcon',
    connections: [[Battery, icon => {
      icon.icon = `battery-level-${Math.floor(Battery.percent / 10) * 10}${Battery.charging == true ? "-charging" : ""}-symbolic`;
    }]],
  })

const PercentLabel = () => Revealer({
    transition: 'slide_right',
    revealChild: false,
    child: Label({
      className: 'batPercent',
      connections: [[Battery, label => {
        label.label = `${Battery.percent}%`;
      }]],
    }),
})

const percentLabelInstance = PercentLabel();

const BatteryWidget = () => Button({
    className: 'battery',
    onHover: () => percentLabelInstance.revealChild = true,
    onHoverLost: () => percentLabelInstance.revealChild = false,
    child: Box({
      children: [
        BatteryIcon(),
        percentLabelInstance,
      ],
    }),
});


export default BatteryWidget