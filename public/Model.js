import {Observable, QueryRouter, Loader, sessionService, WebSocketClient} from '/js/src/index.js';
import {Home} from "./home/Home.js";
import {About} from "./about/About.js";
import {Header} from "./layout/Header.js";

/**
 * Root of model tree
 * Handle global events: keyboard, websocket and router location change
 */
export class Model extends Observable {
  /**
   * Load all sub-models and bind event handlers
   */
  constructor() {
    super();

    this.session = sessionService.get();
    this.session.personid = parseInt(this.session.personid, 10);

    this.loader = new Loader(this);
    this.loader.bubbleTo(this);

    // Setup router
    this.router = new QueryRouter();
    this.router.observe(this.handleLocationChange.bind(this));
    this.router.bubbleTo(this);

    this.webSocket = new WebSocketClient();

    this.header = new Header(this);
    this.header.init();
    this.home = new Home(this);
    this.about = new About(this);

    this.handleLocationChange(); // Init first page
  }

  /**
   * Delegates sub-model actions depending on new location of the page
   */
  handleLocationChange() {
    switch (this.router.params.page) {
      case 'home':
        this.home.init();
        break;
      case 'about':
        this.about.init();
        break;
      default:
        this.router.go('?page=home');
        break;
    }
  }
}
