import GObject from "gi://GObject";
import { Gtk, astalify, type ConstructProps } from "astal/gtk3";

class Calendar extends astalify(Gtk.Calendar) {
    static { GObject.registerClass(this) }

    constructor(props: ConstructProps<
        Calendar, 
        Gtk.Calendar.ConstructorProps,
        {}
    >) {
        super(props as any)
    }
}

export default Calendar;