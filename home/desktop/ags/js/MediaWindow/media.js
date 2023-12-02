import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';

const TrackInfo = (player) => Widget.Box({
    class_name: 'track-info',
    vertical: true,
    children: [
        Widget.Label({
            class_name: 'track-name',
            binds: [['label', player, 'track-title']],
            justification: 'left',
            xalign: 0,
        }),
        Widget.Label({
            class_name: 'artist-name',
            binds: [['label', player, 'track-artists', artists => artists.join(', ')]],
            justification: 'left',
            xalign: 0,
        }),
    ]
});

const CoverArt = (player) => Widget.Box({
    className: 'cover-art',
    hexpand: false,
    binds: [['css', player, 'cover-path', path => `background-image: url("${path}");`]]

});

function lengthStr(length) {
    const min = Math.floor(length / 60);
    const sec = Math.floor(length % 60);
    const sec0 = sec < 10 ? '0' : '';
    return `${min}:${sec0}${sec}`;
}

const Position = (player) => Widget.Box({
    vertical: true,
    children: [
        Widget.Slider({
            class_name: 'position-slider',
            on_change : ({ value }) => player.position = player.length * value,
            draw_value: false,
            hexpand: true,
            properties: [['update', slider => {
                if (slider.dragging)
                    return;
                slider.value = player.position / player.length;
            }]],
            connections: [
                [1000, self => self._update(self)],
                [player, self => self._update(self), 'position'],
            ],
        }),
        Widget.Box({
            class_name: 'position-label',
            hexpand: true,
            children: [
                Widget.Label({
                    label: lengthStr(player.position),
                    hpack: 'start',
                    hexpand: true,
                    connections: [
                        [player, self => self.label = lengthStr(player.position), 'position'],
                        [1000, self => self.label = lengthStr(player.position)],
                    ],
                }),
                Widget.Label({
                    binds: [['label', player, 'length', length => lengthStr(length)]],
                    hpack: 'end',
                    hexpand: true,
                }),
            ],
        }),
    ],
});

const PlayButton = (player) => Widget.Button({
    class_name: 'play-button',
    onClicked: () => player.playPause(),
    child: Widget.Icon({
        binds: [['icon', player, 'play-back-status', status => {
            if (status === 'Playing')
                return 'media-playback-pause-symbolic'
            return 'media-playback-start-symbolic'
        }]]
    }),
});

const NextButton = (player) => Widget.Button({
    class_name: 'next-button',
    onClicked: () => player.next(),
    child: Widget.Icon('media-skip-backward-rtl-symbolic'),
    binds: [['visible', player, 'can-go-next']]
});

const PreviousButton = (player) => Widget.Button({
    class_name: 'previous-button',
    onClicked: () => player.previous(),
    child: Widget.Icon('media-skip-backward-symbolic'),
    binds: [['visible', player, 'can-go-prev']]
});

const ShuffleButton = (player) => Widget.Button({
    onClicked: () => player.shuffle(),
    child: Widget.Icon('media-playlist-shuffle-symbolic'),
    binds: [
        ['visible', player, 'shuffle-status', status => status != null],
        ['class_name', player, 'shuffle-status', status => status ? 'shuffle-button active' : 'shuffle-button']
    ],

});

const LoopButton = (player) => Widget.Button({
    onClicked: () => player.loop(),
    child: Widget.Icon({
        binds: [['icon', player, 'loop-status', status => {
            if (status === 'Track')
                return 'media-playlist-repeat-song-symbolic'
            return 'media-playlist-repeat-symbolic'
        }]]
    }),
    binds: [
        ['visible', player, 'loop-status', status => status != null],
        ['class_name', player, 'loop-status', status => (status !== 'None') ? 'loop-button active' : 'loop-button'],
    ],

});

const MediaControls = (player) => Widget.Box({
    class_name: 'media-controls',
    hexpand: true,
    hpack: 'center',
    children: [
        ShuffleButton(player),
        PreviousButton(player),
        PlayButton(player),
        NextButton(player),
        LoopButton(player),
    ],
});

let current = null;

const update = box => {
    const player = Mpris.getPlayer('spotify') || Mpris.players[0] || null;

    if (!player) {
        current = null;
        return;
    }

    current = player;
    box.children = [Widget.Box({
        vertical: true,
        children: [
            CoverArt(player),
            TrackInfo(player),
            Position(player),
            MediaControls(player),
        ]
    })];
};

const MediaBox = () => Widget.Box({
    className: 'media-box',
    connections : [[Mpris, update, 'notify::players']], 
});

const revealer = () => Widget.Revealer({
    transition: 'slide_down',
    connections: [[App, (self, wname, visible) => {
        if (wname === 'media')
            self.revealChild = visible
        }, 'window-toggled']
    ],
    child: Widget.EventBox({
        child: MediaBox(),
        onHoverLost: (widget, event) => {
            const x = Math.round(event.get_coords()[1])
            const y = Math.round(event.get_coords()[2])
            const w = widget.get_allocation().width - 15;
            const h = widget.get_allocation().height - 15;
            if (x <= 15 || x >= w || y <= 0 || y >= h) {
                App.closeWindow('media')
            }
        },
    }),
});

export default () => Widget.Window({
    name: 'media',
    popup: true,
    focusable: false,
    anchor: ["top"],
    visible: false,
    child: Widget.Box({
        css: 'padding: 1px;',
        child: revealer(),
    }),
})