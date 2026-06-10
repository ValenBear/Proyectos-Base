import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class UIButton extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      button {
        font-family: inherit;
        font-weight: 600;
        letter-spacing: 0.02em;
        border: none;
        border-radius: var(--shape-pill, 9999px);
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
      }
      button:disabled {
        opacity: 0.38;
        cursor: not-allowed;
        box-shadow: none !important;
        transform: none !important;
      }

      .size-small { padding: 0.4rem 1rem; font-size: 0.875rem; }
      .size-medium { padding: 0.6rem 1.5rem; font-size: 0.875rem; }
      .size-large { padding: 0.8rem 2rem; font-size: 1rem; }

      .variant-primary {
        background-color: var(--primario, #00518b);
        color: white;
        box-shadow: var(--shadow-1);
      }
      .variant-primary:hover:not(:disabled) { 
        background-color: var(--primario-10, #003f6e);
        box-shadow: var(--shadow-2);
        transform: translateY(-1px);
      }
      .variant-primary:active:not(:disabled) {
        box-shadow: var(--shadow-1);
        transform: translateY(0);
      }

      .variant-secondary {
        background-color: var(--secundario, #0093ab);
        color: white;
        box-shadow: var(--shadow-1);
      }
      .variant-secondary:hover:not(:disabled) { 
        background-color: var(--secundario-10, #007a8f);
        box-shadow: var(--shadow-2);
        transform: translateY(-1px);
      }
      .variant-secondary:active:not(:disabled) {
        box-shadow: var(--shadow-1);
        transform: translateY(0);
      }

      .variant-danger {
        background-color: var(--error, #b00020);
        color: white;
        box-shadow: var(--shadow-1);
      }
      .variant-danger:hover:not(:disabled) { 
        filter: brightness(0.9);
        box-shadow: var(--shadow-2);
        transform: translateY(-1px);
      }

      .variant-outline {
        background-color: transparent;
        color: var(--primario, #00518b);
        border: 1px solid var(--primario, #00518b);
      }
      .variant-outline:hover:not(:disabled) {
        background-color: rgba(0, 81, 139, 0.08);
      }
      .variant-outline:active:not(:disabled) {
        background-color: rgba(0, 81, 139, 0.12);
      }
      
      .variant-text {
        background-color: transparent;
        color: var(--primario, #00518b);
      }
      .variant-text:hover:not(:disabled) {
        background-color: rgba(0, 81, 139, 0.08);
      }
      .variant-text:active:not(:disabled) {
        background-color: rgba(0, 81, 139, 0.12);
      }
    `;
  }

  static get properties() {
    return {
      variant: { type: String },
      size: { type: String },
      disabled: { type: Boolean }
    };
  }

  constructor() {
    super();
        this.__storeUnsubscribe = function() {};
    this.variant = 'primary';
    this.size = 'medium';
    this.disabled = false;
  }

  render() {
    const classes = {
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true
    };

    return html`
      <button 
        class=${classMap(classes)} 
        ?disabled=${this.disabled}
        @click=${this._handleClick}>
        <slot></slot>
      </button>
    `;
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}

customElements.define('ui-button', UIButton);
