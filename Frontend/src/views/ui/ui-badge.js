import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class UIBadge extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0.75rem;
        border-radius: var(--shape-pill, 9999px);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        line-height: 1;
        white-space: nowrap;
      }

      .type-info {
        background-color: #e0f2fe;
        color: #0369a1;
        border: 1px solid #bae6fd;
      }
      .type-success {
        background-color: #dcfce7;
        color: #15803d;
        border: 1px solid #bbf7d0;
      }
      .type-warning {
        background-color: #fef9c3;
        color: #a16207;
        border: 1px solid #fef08a;
      }
      .type-error {
        background-color: #fee2e2;
        color: #b91c1c;
        border: 1px solid #fecaca;
      }
      
      .type-primary {
        background-color: rgba(0, 81, 139, 0.1);
        color: var(--primario, #00518b);
        border: 1px solid rgba(0, 81, 139, 0.2);
      }
      .type-secondary {
        background-color: rgba(0, 147, 171, 0.1);
        color: var(--secundario, #0093ab);
        border: 1px solid rgba(0, 147, 171, 0.2);
      }
    `;
  }

  static get properties() {
    return {
      type: { type: String }
    };
  }

  constructor() {
    super();
        this.__storeUnsubscribe = function() {};
    this.type = 'info';
  }

  render() {
    const classes = {
      badge: true,
      [`type-${this.type}`]: true
    };

    return html`
      <span class=${classMap(classes)}>
        <slot></slot>
      </span>
    `;
  }
}

customElements.define('ui-badge', UIBadge);
