import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Auto_CPUFreq from '../../services/auto-cpufreq.js';

export const Governor = () => Widget.Box({
    class_name: 'toggle-button',
    hexpand: true,
    children: [
        Widget.Icon('cpu-symbolic'),
        Widget.Label({
            binds: [['label', Auto_CPUFreq, 'governor', governor => governor.toUpperCase()]],
        })
    ]
})

