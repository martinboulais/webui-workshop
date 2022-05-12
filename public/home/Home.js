import {Observable} from "/js/src/index.js";

export class Home extends Observable {
    /**
     * @param {Model} model
     */
    constructor(model) {
        super();
        this._model = model;
        this._userName = '';

        this.bubbleTo(model);

        this.getUserName = this.getUserName.bind(this);
        this.setUserName = this.setUserName.bind(this);
    }

    init() {
        this._userName = this._model.session.name;
    }

    /**
     * Return the current username
     * @returns {*}
     */
    getUserName() {
        return this._userName;
    }

    setUserName(userName) {
        this._userName = userName;
        this.notify();
    }
}