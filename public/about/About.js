import {Observable, RemoteData} from "/js/src/index.js";

export class About extends Observable {
    constructor(model) {
        super();

        this._details = RemoteData.NotAsked();
        this._requestedTimes = 0;
        this._model = model;

        this.bubbleTo(model);

        this.getDetails = this.getDetails.bind(this);
        this.getRequestedTimes = this.getRequestedTimes.bind(this);
        this.init = this.init.bind(this);
    }

    getDetails() {
        // if (this._details.isNotAsked()) this._fetchData();
        this._requestedTimes++;
        return this._details;
    }

    getRequestedTimes() {
        return this._requestedTimes;
    }

    /**
     * Fetch de details from the backend
     */
    async init() {
        if (this._details.isNotAsked()) {
            // Simulate data fetch
            this._details = RemoteData.Loading();
            this.notify();

            const {result, ok} = await this._model.loader.get('/api/details');

            if (ok) {
                this._details = RemoteData.Success(result);
            } else {
                this._details = RemoteData.Failure(result);
            }
            this.notify();
        }
    }
}