import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class UIInput extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 1rem;
        font-family: inherit;
      }
      .input-container {
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
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      input {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 1px solid var(--on-formulario-separador, #ccc);
        border-radius: var(--shape-small, 4px);
        font-size: 1rem;
        font-family: inherit;
        background-color: var(--formulario, #fff);
        color: var(--on-formulario, #333);
        transition: border-color 0.2s, box-shadow 0.2s, background-color 0.3s;
        box-sizing: border-box;
      }
      input:hover:not(:disabled):not(:focus) {
        border-color: var(--on-formulario, #333);
      }
      input:focus {
        outline: none;
        border-color: var(--primario, #00518b);
        border-width: 2px;
        padding: calc(0.875rem - 1px) calc(1rem - 1px);
      }
      .focused label {
        color: var(--primario, #00518b);
      }
      input:disabled {
        background-color: var(--aplicacion, #eeeeee);
        color: var(--on-formulario-disabled, #888);
        border-color: var(--on-formulario-separador, #ccc);
        border-style: dashed;
        cursor: not-allowed;
      }
      .error input {
        border-color: var(--error, #b00020);
      }
      .error input:focus {
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
      type: { type: String },
      value: { type: String },
      placeholder: { type: String },
      disabled: { type: Boolean },
      error: { type: String },
      _focused: { type: Boolean, state: true }
    };
  }

  constructor() {
    super();
        this.__storeUnsubscribe = function() {};
    this.type = 'text';
    this.value = '';
    this.placeholder = '';
    this.disabled = false;
    this.error = '';
    this._focused = false;
  }

  render() {
    const containerClasses = {
      'input-container': true,
      'error': !!this.error,
      'focused': this._focused
    };

    return html`
      <div class=${classMap(containerClasses)}>
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <div class="input-wrapper">
          <input 
            type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            @focus=${() => this._focused = true}
            @blur=${() => this._focused = false}
          />
        </div>
        ${this.error ? html`<span class="error-msg">${this.error}</span>` : ''}
      </div>
    `;
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('ui-input', UIInput);
