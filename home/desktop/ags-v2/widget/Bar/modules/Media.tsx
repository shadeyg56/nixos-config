import Mpris from "gi://AstalMpris";
import { bind, Variable } from "astal";
import { Widget, Gtk } from "astal/gtk3";
import Pango from "gi://Pango";

const media = Mpris.get_default();


function PlayerIcon(player: Mpris.Player, { symbolic = true, ...props } = {}) {
    
    const iconName = bind(player, "entry").as((entry) => {
        let name = `${entry}${symbolic ? "-symbolic" : ""}`;
        name = Widget.Icon.lookup_icon(name) ? name : "emblem-music-symbolic";
        return name;
    })
    
    return (
        <icon className="player-icon" icon={iconName}/>
    )
}

function NowPlaying(player: Mpris.Player) {

    const currentTrack = Variable("");

    const setup = (revealer: Widget.Revealer) => {
        bind(player, "title").subscribe((title) => {
            currentTrack.set(title);
            revealer.revealChild = true;
            const timeoutTrack = currentTrack.get();
            setTimeout(() => {
                if (timeoutTrack === currentTrack.get())
                    if (revealer)
                        revealer.revealChild = false;
            }, 3000)
        })
    }

    const titleBind = Variable.derive([bind(player, "title"), bind(player, "artist")], (title, artist) =>
        `${artist} - ${title}`
    )

    return (
        <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        setup={setup}
        >
            <label className="now-playing"
            ellipsize={Pango.EllipsizeMode.END}
            maxWidthChars={25}
            label={titleBind()}
            />
        </revealer>
    )
}

export default function MediaIndicator() {

    return (
        <eventbox>
            <box>
                {bind(media, "players").as((players) => {
                    const player = players.find((p) => p.get_entry() === "spotify") ?? players[0];
        
                    if (!player) {
                        return "";
                    }

                    return [
                        PlayerIcon(player),
                        NowPlaying(player)
                    ]
                })}
            </box>
         </eventbox>
    )
}