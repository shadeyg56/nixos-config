import { Gtk } from "astal/gtk3";
import { bind } from "astal";
import { MediaWidgetProps } from "./Media";
import Mpris from "gi://AstalMpris";

function Play({player}: MediaWidgetProps) {
    return (
        <button className="play-button"
        onClick={() => player.play_pause()}
        >
            <icon
            icon={bind(player, "playbackStatus").as((status) => 
                status === Mpris.PlaybackStatus.PLAYING
                ? "media-playback-pause-symbolic"
                : "media-playback-start-symbolic"
            )}
            />
        </button>
    )
}

function Next({player}: MediaWidgetProps) {
    return (
        <button className="next-button"
        onClick={() => player.next()}
        visible={bind(player, "canGoNext")}
        >
            <icon
            icon="media-skip-backward-rtl-symbolic"
            />
        </button>
    )
}

function Previous({player}: MediaWidgetProps) {
    return (
        <button className="previous-button"
        onClick={() => player.previous()}
        visible={bind(player, "canGoPrevious")}
        >
            <icon
            icon="media-skip-backward-symbolic"
            />
        </button>
    )
}

function Shuffle({player}: MediaWidgetProps) {
    return (
        <button 
        className={bind(player, "shuffleStatus").as((status) =>
            status === Mpris.Shuffle.ON ? "shuffle-button active" : "shuffle-button"
        )}
        onClick={() => player.shuffle()}
        visible={bind(player, "shuffleStatus").as((status) => 
            status !== Mpris.Shuffle.UNSUPPORTED
        )}
        >
            <icon
            icon="media-playlist-shuffle-symbolic"
            />
        </button>
    )
}

function Loop({player}: MediaWidgetProps) {
    return (
        <button 
        className={bind(player, "loopStatus").as((status) =>
            status !== Mpris.Loop.NONE ? "loop-button active" : "loop-button"
        )}
        onClick={() => player.loop()}
        visible={bind(player, "loopStatus").as((status) => 
            status !== Mpris.Loop.UNSUPPORTED
        )}
        >
            <icon
            icon={bind(player, "loopStatus").as((status) => 
                status === Mpris.Loop.TRACK
                ? "media-playlist-repeat-song-symbolic"
                : "media-playlist-repeat-symbolic"
            )}
            />
        </button>
    )
}


export default function MediaControls({player}: MediaWidgetProps) {
    return (
        <box className="media-controls"
        hexpand={true}
        halign={Gtk.Align.CENTER}
        >
            <Shuffle player={player}/>
            <Previous player={player}/>
            <Play player={player}/>
            <Next player={player}/>
            <Loop player={player}/>
        </box>
    )
}