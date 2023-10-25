import { nanoid } from 'nanoid';
import { Component } from 'react';

export class Form extends Component {
  state = {
    data: '',
  };

  id = nanoid();

  handleChange = evt => {
    this.setState({ [evt.currentTarget.name]: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    // this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({
      data: '',
    });
  };
  render() {
    return (
      <>
        <header className="searchbar">
          <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>

            <input
              onChange={this.handleChange}
              value={this.state.data}
              name="data"
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}
