import {Component, html} from 'htm/preact';

import debounce from '../utilities/debounce.js';
import searchReleases, {
  searchLimit,
  SearchResult,
} from '../utilities/search.js';

type Props = Record<string, unknown>;

type State = {
  searchQueryDebounced: SearchBar['searchQuery'];
  searchResults: SearchResult[];
  searchState: 'searching' | 'waiting';
  searchValue: string;
};

export default class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchQueryDebounced: debounce(this.searchQuery, 500),
      searchResults: [],
      searchState: 'waiting',
      searchValue: '',
    };
  }

  searchMore = async (): Promise<void> => {
    if (this.state.searchValue.length === 0) {
      this.setState({searchResults: [], searchState: 'waiting'});
      return;
    }

    this.setState({
      searchResults: [
        ...this.state.searchResults,
        ...(await searchReleases(
          this.state.searchValue,
          this.state.searchResults.length,
        )),
      ],
    });
  };

  searchQuery = async (): Promise<void> => {
    if (this.state.searchValue.length === 0) {
      this.setState({searchResults: [], searchState: 'waiting'});
      return;
    }

    this.setState({
      searchResults: await searchReleases(this.state.searchValue),
      searchState: 'waiting',
    });
  };

  onInput = async (event: InputEvent): Promise<void> => {
    const input = event.target as HTMLInputElement;
    this.setState({searchState: 'searching', searchValue: input.value});
    void this.state.searchQueryDebounced();
  };

  render() {
    const results: Array<ReturnType<typeof html>> = [];

    for (const result of this.state.searchResults) {
      let disambiguation;
      if (result.disambiguation !== undefined) {
        disambiguation = html`
          ${' '}
          <span class="disambiguation">(${result.disambiguation})</span>
        `;
      }

      results.push(
        html`
          <li>
            <a class="search-result" href="/release/${result.id}">
              <span class="display">${result.artist} - ${result.title}</span>
              ${disambiguation}
            </a>
          </li>
        `,
      );
    }

    const isLoading = this.state.searchState === 'searching';
    // Hide results when the search input is empty.
    const noSearchValue = this.state.searchValue.length === 0;
    if (!noSearchValue && !isLoading && results.length === 0) {
      // If it isn't empty but there are no results and we're also not loading
      // new results, then show none were found.
      results.push(html`<li class="search-state">No releases found</li>`);
    } else if (isLoading) {
      results.unshift(
        html`<li class="search-state">Searching for releases…</li>`,
      );
    }

    const resultAmount = this.state.searchResults.length;
    if (resultAmount > 0 && resultAmount % searchLimit === 0) {
      results.push(
        html`
          <li class="search-state">
            <button class="load-more" onClick=${this.searchMore}>
              Load more…
            </button>
          </li>
        `,
      );
    }

    return html`
      <div class="search-bar">
        <input
          onInput=${this.onInput}
          placeholder="Search for a MusicBrainz release"
          type="text"
          value="${this.state.searchValue}"
        />

        <ul class="${noSearchValue ? 'hidden' : ''}">
          ${results}
        </ul>
      </div>
    `;
  }
}
