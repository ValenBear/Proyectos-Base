/** @format */

import { html, LitElement, css } from "lit";
import { connect } from "@brunomon/helpers";
import { store } from "../redux/store";
import { layoutsCSS } from "../views/ui/layouts";
import { getLayout } from "../redux/screens/screenLayouts";
import { goTo } from "../redux/routing/slice";
import { setMedia, setMediaOrientation } from "../redux/ui/slice";
import { formTest } from "./componentes/formTest";
import { abmTest } from "./componentes/abmTest";
import { menuPrincipal } from "./headers/menu";
import { spinner } from "@brunomon/template-lit/src/views/css/spinner";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const SELECTION = "ui.menu.timeStamp";
const ROUTING = "routing.current.name";

export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN, SELECTION, ROUTING)(LitElement) {
    constructor() {
        super();
        this.__storeUnsubscribe = function() {};
        window.onpopstate = (event) => {
            if (event.state) {
                store.dispatch(goTo(event.state.option, true));
            } else {
                window.history.back();
            }
        };
    }


    connectedCallback() {
        super.connectedCallback();
        const small = window.matchMedia("(max-width: 600px)");
        const medium = window.matchMedia("(max-width: 800px) and (min-width: 601px)");
        const large = window.matchMedia("(min-width: 801px)");
        const landscape = window.matchMedia("(orientation:landscape)");
        const portrait = window.matchMedia("(orientation:portrait)");

        small.onchange = (e) => { if (e.matches) store.dispatch(setMedia("small")) };
        medium.onchange = (e) => { if (e.matches) store.dispatch(setMedia("medium")) };
        large.onchange = (e) => { if (e.matches) store.dispatch(setMedia("large")) };
        landscape.onchange = (e) => { if (e.matches) store.dispatch(setMediaOrientation("landscape")) };
        portrait.onchange = (e) => { if (e.matches) store.dispatch(setMediaOrientation("portrait")) };

        if (small.matches) store.dispatch(setMedia("small"));
        if (medium.matches) store.dispatch(setMedia("medium"));
        if (large.matches) store.dispatch(setMedia("large"));
        if (landscape.matches) store.dispatch(setMediaOrientation("landscape"));
        if (portrait.matches) store.dispatch(setMediaOrientation("portrait"));
    }

    static get styles() {
        return css`
            ${layoutsCSS}
            ${gridLayout}
            ${spinner}
            :host {
                display: grid;
                width: 100%;
                height: 100%;
                padding: 0;
                background-color: var(--aplicacion);
                overflow: hidden;
            }

            :host::-webkit-scrollbar {
                width: 0.5vw;
                cursor: pointer;
            }
            :host::-webkit-scrollbar([media-size="small"]) {
                display: none;
            }
            :host::-webkit-scrollbar-thumb {
                background: var(--secundario);
                border-radius: 5px;
            }
        `;
    }

    render() {
        return html`
            <div class="spinner" anillo fixed hidden></div>
            <menu-principal area="header"></menu-principal>
            ${this.currentRoute === "abm" ? html`<abm-test area="body"></abm-test>` : html`<form-test area="body"></form-test>`}
        `;
    }

    stateChanged(state, name) {
        if (name == ROUTING) { this.currentRoute = state.routing.current.name; }
        if (name == MEDIA_CHANGE || name == SCREEN) {
            this.mediaSize = state.ui.media.size;
            this.orientation = state.ui.media.orientation;
            this.layout = getLayout(state).name;
            if (!window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
                if ("standalone" in window.navigator && window.navigator.standalone) {
                    this.style.height = document.documentElement.offsetHeight ? document.documentElement.offsetHeight : window.innerHeight + "px";
                } else {
                    if (state.ui.media.orientation == "portrait") {
                        this.style.height = window.innerHeight < window.innerWidth ? window.innerWidth : window.innerHeight + "px";
                    } else {
                        this.style.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight + "px";
                    }
                }
            }
        }
        this.update();
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            layout: {
                type: String,
                reflect: true,
            },
            orientation: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("view-manager", viewManager);
