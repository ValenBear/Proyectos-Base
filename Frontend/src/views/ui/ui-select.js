import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class UISelect extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 1rem;
        font-family: inherit;
      }
      .select-container {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      label {
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.01em;
        color: var(--on-formulario-bajada, #666);
        margin-left: 0.25rem;
        transition: color 0.2s;
      }
      select {
        width: 100%;
        padding: 0.875rem 2rem 0.875rem 1rem;
        border: 1px solid var(--on-formulario-separador, #ccc);
        border-radius: var(--shape-small, 4px);
        font-size: 1rem;
        font-family: inherit;
        background-color: var(--formulario, #fff);
        color: var(--on-formulario, #333);
        cursor: pointer;
        transition: border-color 0.2s, box-shadow 0.2s, background-color 0.3s;
        appearance: none;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300518b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
        background-repeat: no-repeat;
        background-position: right 0.75rem top 50%;
        background-size: 0.65rem auto;
        box-sizing: border-box;
      }
      select:hover:not(:disabled):not(:focus) {
        border-color: var(--on-formulario, #333);
      }
      select:focus {
        outline: none;
        border-color: var(--primario, #00518b);
        border-width: 2px;
        padding: calc(0.875rem - 1px) calc(2rem - 1px) calc(0.875rem - 1px) calc(1rem - 1px);
      }
      .focused label {
        color: var(--primario, #00518b);
      }
      select:disabled {
        background-color: var(--aplicacion, #eeeeee);
        color: var(--on-formulario-disabled, #888);
        border-color: var(--on-formulario-separador, #ccc);
        border-style: dashed;
        cursor: not-allowed;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23888888%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
      }
      .error select {
        border-color: var(--error, #b00020);
      }
      .error select:focus {
        border-color: var(--error, #b00020);
      }
      .error.focused label {
        color: var(--error, #b00020);
      }
      .error-msg {
        font-size: 0.75rem;
        color: var(--error, #b00020);
        margin-top: 0.25rem;
        margin-left: 0.25rem;
      }
    `;
  }

  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      options: { type: Array },
      disabled: { type: Boolean },
      error: { type: String },
      _focused: { type: Boolean, state: true }
    };
  }

  constructor() {
    super();
        this.__storeUnsubscribe = function() {};
    this.value = '';
    this.options = [];
    this.disabled = false;
    this.error = '';
    this._focused = false;
  }

  render() {
    const containerClasses = {
      'select-container': true,
      'error': !!this.error,
      'focused': this._focused
    };

    return html`
      <div class=${classMap(containerClasses)}>
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <select 
          .value=${this.value}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          @focus=${() => this._focused = true}
          @blur=${() => this._focused = false}
        >
          <option value="" disabled selected hidden>Seleccionar opción...</option>
          ${this.options.map(opt => html`
            <option value=${opt.value} ?selected=${opt.value === this.value}>${opt.text}</option>
          `)}
        </select>
        ${this.error ? html`<span class="error-msg">${this.error}</span>` : ''}
      </div>
    `;
  }

  _handleChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('ui-select', UISelect);
