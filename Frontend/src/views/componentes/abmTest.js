import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { fetchApi } from "../../redux/api/slice";

import "../ui/ui-button.js";
import "../ui/ui-input.js";
import "../ui/ui-badge.js";

export class abmTest extends connect(store, "api.loading")(LitElement) {
    constructor() {
        super();
        this.__storeUnsubscribe = function() {};
        this.empresas = [];
        this.cuit = "";
        this.razonSocial = "";
    }

    static get properties() {
        return {
            empresas: { type: Array },
            cuit: { type: String },
            razonSocial: { type: String },
            loading: { type: Boolean }
        };
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
            }
            h2 {
                color: var(--primario, #00518b);
                border-bottom: 1px solid var(--on-formulario-separador, #e0e0e0);
                padding-bottom: 0.75rem;
                margin-top: 0;
            }
            .form-row {
                display: grid;
                grid-template-columns: 1fr 2fr auto;
                gap: 1rem;
                align-items: end;
                margin-bottom: 1.5rem;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
            }
            th, td {
                padding: 0.75rem;
                text-align: left;
                border-bottom: 1px solid var(--on-formulario-separador, #e0e0e0);
            }
            th {
                color: var(--on-formulario-bajada, #666);
                font-weight: 600;
            }
        `;
    }

    render() {
        return html`
            <div class="card">
                <h2>ABM de Empresas (Prueba Backend)</h2>
                
                <div class="form-row">
                    <ui-input 
                        label="CUIT" 
                        .value=${this.cuit}
                        @value-changed=${(e) => this.cuit = e.detail.value}
                    ></ui-input>
                    <ui-input 
                        label="Razón Social" 
                        .value=${this.razonSocial}
                        @value-changed=${(e) => this.razonSocial = e.detail.value}
                    ></ui-input>
                    <ui-button 
                        variant="primary" 
                        ?disabled=${this.loading}
                        @click=${this.addEmpresa}
                    >
                        ${this.loading ? 'Guardando...' : 'Agregar Empresa'}
                    </ui-button>
                    <ui-button 
                        variant="outline" 
                        ?disabled=${this.loading}
                        @click=${this.loadEmpresas}
                    >
                        Refrescar
                    </ui-button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CUIT</th>
                            <th>Razón Social</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.empresas.map(emp => html`
                            <tr>
                                <td>${emp.id || emp.Id}</td>
                                <td>${emp.cuit || emp.Cuit || emp.CUIT}</td>
                                <td>${emp.razonSocial || emp.RazonSocial}</td>
                                <td>
                                    <ui-button variant="danger" size="small" @click=${() => this.deleteEmpresa(emp.id || emp.Id)}>
                                        Quitar
                                    </ui-button>
                                </td>
                            </tr>
                        `)}
                        ${this.empresas.length === 0 ? html`<tr><td colspan="4" style="text-align:center">No hay empresas. Hacé click en Refrescar.</td></tr>` : ''}
                    </tbody>
                </table>
            </div>
        `;
    }

    async loadEmpresas() {
        // En un caso real usamos window.fetch o axios adentro del Thunk.
        const res = await store.dispatch(fetchApi({
            fetchFunction: async () => {
                const req = await fetch("/v1/Empresa/All");
                if(!req.ok) throw new Error("Error fetching empresas");
                return req.json();
            },
            params: {}
        }));
        if(!res.error) {
            this.empresas = res.payload || [];
        }
    }

    async addEmpresa() {
        if(!this.cuit || !this.razonSocial) return alert("Completá los campos");

        const res = await store.dispatch(fetchApi({
            fetchFunction: async () => {
                const req = await fetch("/v1/Empresa/Add", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        CUIT: parseInt(this.cuit), 
                        RazonSocial: this.razonSocial, 
                        EsCooperativa: false 
                    })
                });
                if(!req.ok) throw new Error("Error guardando empresa");
                return req.text(); // Devuelve GUID
            },
            params: {}
        }));

        if(!res.error) {
            this.cuit = "";
            this.razonSocial = "";
            this.loadEmpresas();
        }
    }

    async deleteEmpresa(id) {
        const res = await store.dispatch(fetchApi({
            fetchFunction: async () => {
                const req = await fetch("/v1/Empresa/Quitar/" + id, { method: 'DELETE' });
                if(!req.ok) throw new Error("Error eliminando empresa");
                return req.text();
            },
            params: {}
        }));

        if(!res.error) {
            this.loadEmpresas();
        }
    }

    stateChanged(state, name) {
        if(name === "api.loading") {
            this.loading = state.api.loading > 0;
        }
    }
}
window.customElements.define("abm-test", abmTest);
