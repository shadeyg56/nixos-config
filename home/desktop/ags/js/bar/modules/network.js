import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Network from 'resource:///com/github/Aylur/ags/service/network.js';

const WifiIndicator = () => Widget.Box({
    children: [
        Widget.Icon('network-wireless-symbolic'),
        Widget.Revealer({
            transition: 'slide_right',
            revealChild: false,
            child: Widget.Label({
                label: Network.wifi.bind("ssid")
            })
        })
    ],
});

const WiredIndicator = () => Widget.Icon('network-wired-symbolic');

const Disconnected = () => Widget.Icon('network-wireless-offline-symbolic');

const NetworkIndicator = () => Widget.Stack({
    className: 'netIcon',
    items: [
        ['wifi', WifiIndicator()],
        ['wired', WiredIndicator()],
        ["disconnected", Disconnected()],
    ],
    shown: Network.bind("primary", p => p || 'disconnected')
});

export default NetworkIndicator