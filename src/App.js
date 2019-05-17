import React, { Component } from 'react';
import { FixedSizeList as List } from 'react-window';
const axios = require('axios');

const URL = 'https://api.spacexdata.com/v3/launches';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      launches: []
    };
  }

  componentDidMount = async () => {
    try {
      let resp = await axios.get(URL);
      let launches = resp.data;
      this.setState({ launches, isLoading: false });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const Row = ({ index, style }) => (
      <div className={index % 2 ? 'launch-odd' : 'launch-even'} style={style}>
        {this.state.launches[index].mission_name}
      </div>
    );

    if (this.state.isLoading) {
      return <div>LOADING...</div>;
    }

    return (
      <List
        className="launches-list"
        height={150}
        itemCount={this.state.launches.length}
        itemSize={35}
        width={300}
      >
        {Row}
      </List>
    );
  }
}

export default App;
