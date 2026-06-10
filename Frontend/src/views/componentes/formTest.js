import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { PERSON } from "../../../assets/icons/svgs";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

import "../ui/ui-button.js";
import "../ui/ui-input.js";
import "../ui/ui-select.js";
import "../ui/ui-badge.js";

import { SpinnerControl } from "./spinner";
import { AlertControl } from "./alert";
import { ConfirmControl } from "./confirm";
import { showAlert, showConfirm } from "../../redux/ui/slice";

export class formTest extends connect(store)(LitElement) {
    constructor() {
        super();
        this.__storeUnsubscribe = function() {};
        this.opcionesPais = [
            { value: "1", text: "Argentina" },
            { value: "2", text: "Chile" },
            { value: "3", text: "Perú" },
            { value: "4", text: "Bolivia" }
        ];
    }

    static get styles() {
        return css`
            ${gridLayout}

            :host {
                display: grid;
                grid-auto-flow: row;
                background-color: var(--aplicacion);
                padding: 2rem;
                grid-gap: 2rem;
                overflow-y: scroll;
            }

            .card {
                background: var(--formulario, #fff);
                color: var(--on-formulario, #333);
                border-radius: var(--shape-large, 16px);
                padding: 2rem;
                box-shadow: var(--shadow-2);
                transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
            }
            .card:hover {
                box-shadow: var(--shadow-3);
            }

            h2 {
                color: var(--primario, #00518b);
                border-bottom: 1px solid var(--on-formulario-separador, #e0e0e0);
                padding-bottom: 0.75rem;
                margin-top: 0;
                margin-bottom: 1.5rem;
            }

            .row {
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;
                align-items: center;
                margin-bottom: 1.5rem;
            }

            svg {
                height: 1.2rem;
                width: 1.2rem;
                fill: currentColor;
            }

            .spinner-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                color: var(--on-formulario);
            }
        `;
    }

    render() {
        return html`
            <div class="card">
                <h2>Inputs (ui-input)</h2>
                <div class="grid fit18">
                    <ui-input 
                        label="Input Normal" 
                        placeholder="Escribí acá..."
                    ></ui-input>
                    <ui-input 
                        label="Input Deshabilitado" 
                        value="No editable"
                        disabled
                    ></ui-input>
                    <ui-input 
                        label="Input con Error" 
                        value="Texto inválido"
                        error="Este campo es requerido"
                    ></ui-input>
                </div>
            </div>

            <div class="card">
                <h2>Selects (ui-select)</h2>
                <div class="grid fit18">
                    <ui-select 
                        label="Select Normal" 
                        .options=${this.opcionesPais}
                    ></ui-select>
                    <ui-select 
                        label="Select Deshabilitado" 
                        .options=${this.opcionesPais}
                        value="1"
                        disabled
                    ></ui-select>
                    <ui-select 
                        label="Select con Error" 
                        .options=${this.opcionesPais}
                        error="Selección inválida"
                    ></ui-select>
                </div>
            </div>

            <div class="card">
                <h2>Botones (ui-button)</h2>
                <div class="row">
                    <ui-button variant="primary">Primario</ui-button>
                    <ui-button variant="secondary">Secundario</ui-button>
                    <ui-button variant="danger">Peligro</ui-button>
                    <ui-button variant="outline">Contorno</ui-button>
                    <ui-button variant="text">Texto</ui-button>
                </div>
                <div class="row">
                    <ui-button variant="primary" disabled>Deshabilitado</ui-button>
                    <ui-button variant="primary">
                        ${PERSON} Con Icono
                    </ui-button>
                    <ui-button variant="outline">
                        ${PERSON}
                    </ui-button>
                </div>
                <div class="row">
                    <ui-button variant="primary" size="small">Chico</ui-button>
                    <ui-button variant="primary" size="medium">Mediano</ui-button>
                    <ui-button variant="primary" size="large">Grande</ui-button>
                </div>
                <div class="row">
                    <ui-button variant="outline" @click="${this.openAlert}">Abrir Alert</ui-button>
                    <ui-button variant="primary" @click="${this.openConfirm}">Abrir Confirm</ui-button>
                </div>
            </div>

            <div class="card">
                <h2>Badges / Etiquetas (ui-badge)</h2>
                <div class="row">
                    <ui-badge type="primary">Primario</ui-badge>
                    <ui-badge type="secondary">Secundario</ui-badge>
                    <ui-badge type="success">Aprobado</ui-badge>
                    <ui-badge type="warning">Pendiente</ui-badge>
                    <ui-badge type="error">Rechazado</ui-badge>
                    <ui-badge type="info">Info</ui-badge>
                </div>
            </div>

            <div class="card">
                <h2>Spinners</h2>
                <div class="grid fit10">
                    <div class="spinner-container">
                        anillo <spinner-control anillo></spinner-control>
                    </div>
                    <div class="spinner-container">
                        aro <spinner-control aro></spinner-control>
                    </div>
                    <div class="spinner-container">
                        cometa <spinner-control cometa></spinner-control>
                    </div>
                    <div class="spinner-container">
                        bloque <spinner-control bloque></spinner-control>
                    </div>
                    <div class="spinner-container">
                        progress <spinner-control progress></spinner-control>
                    </div>
                </div>
            </div>

            <alert-control></alert-control>
            <confirm-control></confirm-control>
        `;
    }

    openAlert() {
        store.dispatch(
            showAlert(
                "Este es el titulo",
                html`<p>Normalmente con un mensaje</p>
                    <p>de uno o mas renglones</p>`
            )
        );
    }

    openConfirm() {
        store.dispatch(
            showConfirm(
                "Titulo del Confirm",
                html`<p>Esto es una prueba...</p>
                    <p>¿ quiere abrir un alert ?</p>`,
                showAlert(
                    "Confirmado",
                    html`<p>La accion de confirmacion</p>
                        <p>se disparo con exito</p>`
                ),
                showAlert(
                    "NO Confirmado",
                    html`<p>La accion de NO confirmacion</p>
                        <p>se disparo con exito</p>`
                )
            )
        );
    }

    stateChanged(state, name) {}

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            orientation: {
                type: String,
                reflect: true,
            },
        };
    }
}
window.customElements.define("form-test", formTest);
