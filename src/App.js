import React, {Component} from 'react';

import api from './Api/api';

import './App.css';

export default class App extends Component {
  state = {
    rows: [],
    status: 0,
    statusText: ""
  };

  componentDidMount() {
    api.get(`/`).then(response =>
      this.setState({
        rows: response.data.rows,
        status: response.status,
        statusText: response.statusText
      })
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const {rows} = this.state;

    api.post(`/`, {rows}).then(response =>
      this.setState({
        rows: response.data.rows,
        status: response.status,
        statusText: response.statusText
      })
    ).catch(error =>
      this.setState({
        status: error.status,
        statusText: error.statusText
      })
    );
  };

  handleOnChange = (indexRow, indexCol) => e => {
    const newRows = [...this.state.rows];
    newRows[indexRow][indexCol].value = e.target.value;
    this.setState({
      rows: newRows
    });
  };

  render() {
    let { rows } = this.state;
    return (
      <div className="Sudoku-container">
        <form onSubmit={this.handleSubmit}>
          {rows.map((row, indexRow) => (
            <div key={indexRow}>
              {row.map((col, indexCol) => (
                <input key={rows[indexRow][indexCol].id}
                       id={rows[indexRow][indexCol].id}
                       value={rows[indexRow][indexCol].value === 0 ? '' : rows[indexRow][indexCol].value}
                       onChange={this.handleOnChange(indexRow, indexCol)}
                       disabled={rows[indexRow][indexCol].value !== 0}
                       className={rows[indexRow][indexCol].status === 0 ? 'Cell-Ok' : 'Cell-Ko'}/>
              ))}
            </div>
          ))}
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
