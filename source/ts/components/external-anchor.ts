import {html, Component} from 'htm/preact';

type Props = {
  class?: string;
  text: string;
  url: string;
};

export default class ExternalAnchor extends Component<Props> {
  render() {
    return html`
      <a
        class="${this.props.class}"
        href="${this.props.url}"
        rel="noopener noreferrer"
        target="_blank"
      >
        ${this.props.text}
      </a>
    `;
  }
}
