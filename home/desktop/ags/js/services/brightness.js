import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import Service from 'resource:///com/github/Aylur/ags/service.js';

class Brightness extends Service {
    static {
        Service.register(this, {}, {
            'screen': ['float', 'rw'],
        });
    }

    #screen = 0;

    get screen() { return this.#screen; }

    set screen(percent) {
        if (percent < 0)
            percent = 0;

        if (percent > 1)
            percent = 1;

        Utils.execAsync(`brightnessctl s ${percent * 100}% -q`)
            .then(() => {
                this.#screen = percent;
                this.changed('screen');
            })
            .catch(console.error);
    }

    constructor() {
        super();
        try {
            this.#screen = Number(Utils.exec('brightnessctl g')) / Number(Utils.exec('brightnessctl m'));
        } catch (error) {
            console.error('missing dependancy: brightnessctl');
        }
    }
}

export default new Brightness();