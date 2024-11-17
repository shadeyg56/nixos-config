import { Widget } from "astal/gtk3";
import { bind, Variable } from "astal";
import cairo from "cairo";
import Cava from "gi://AstalCava";
import Mpris from "gi://AstalMpris";

const cava = Cava.get_default()!;
const media = Mpris.get_default();

export default function Visualizer() {

    const values = bind(cava, "values");

    const setup = (self: Widget.DrawingArea) => {

        self.connect("draw", (_, cr: cairo.Context) => {
            
            cr.setSourceRGB(198/255, 160/255, 246/255);
            const width = self.get_allocated_width()/cava.bars;
            const height = self.get_allocated_height()-15;
            let currentX = 0;
            values.get().forEach((value) => {
                cr.rectangle(currentX, 32, width, value*-1*height);
                cr.fill();
                currentX += width;
            })
            cr.stroke();

        })


        cava.connect("notify::values", () => self.queue_draw());
        
    }



    return (
        <box className={"cava"} expand={true}        >
            <drawingarea expand={true} setup={setup}/>
        </box>
    )
}