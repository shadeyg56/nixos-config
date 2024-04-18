import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
const { Box, Stack, Icon, Slider, Revealer, EventBox } = Widget;

const VolumeIcon = () => Box({
  className: 'volIcon',
    children: [
      Stack({
        children: {
          '101': Icon('audio-volume-overamplified-symbolic'),
          '67': Icon('audio-volume-high-symbolic'),
          '34': Icon('audio-volume-medium-symbolic'),
          '1':  Icon('audio-volume-low-symbolic'),
          '0':  Icon('audio-volume-muted-symbolic'),
        },
      }).hook(Audio, self => {
          if (!Audio.speaker)
              return;

          if (Audio.speaker.isMuted) {
            self.shown = '0';
            return;
          }

          const show = [101, 67, 34, 1, 0].find(
            threshold => threshold <= Audio.speaker.volume * 100);

            self.shown = `${show}`;
        }, 'speaker-changed'),
    ],
});


const PercentBar = () => Revealer({
  transition: 'slide_right',
  revealChild: false,
  child: Slider({
    className: 'volBar',
    hexpand: true,
    drawValue: false,
    onChange: ({ value }) => Audio.speaker.volume = value,
  }).hook(Audio, self => {
      if (!Audio.speaker)
        return

        self.value = Audio.speaker.volume
    }, "speaker-changed"),
});

const percentBar = PercentBar();

const Volume = () => EventBox({
  className: 'volume',
  onHover: () => percentBar.revealChild = true,
  onHoverLost: (widget, event) => {
    const [_, x, y] = event.get_coords()
    const w = widget.get_allocation().width;
    const h = widget.get_allocation().height;
    if (x < 0 || x > w || y < 0 || y > h) {
      percentBar.revealChild = false
    }
  },
  //connections: [[Audio, box => {box.set_tooltip_text(`${String(Math.floor(Audio.speaker.volume * 100))}%`)}, 'speaker-changed']],
  child: Box({
    children: [
      VolumeIcon(),
      percentBar
    ]
  }),
});

export default Volume;
