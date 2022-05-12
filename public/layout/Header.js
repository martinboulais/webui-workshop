import {Observable} from "/js/src/index.js";

export class Header extends Observable {
    constructor(model) {
        super();

        this._model = model;
        this._number = null;
        this.bubbleTo(model);
    }

    init() {
        this._model.webSocket.addListener('command', (message) => {
            if (message.command === 'my-command') {
                this._number = message.payload.value;
                this.notify();
            }
        });
    }

    getNumber() {
        return this._number;
    }
}