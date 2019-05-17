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

  //make api call to get list launches and add to state
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
    //Row will be passed into react-window list component
    const Row = ({ index, style }) => (
      <div className={index % 2 ? 'launch-odd' : 'launch-even'} style={style}>
        {this.state.launches[index].mission_name}
      </div>
    );

    //if launches have not been received displayed loading => once received will return list
    if (this.state.isLoading) {
      return <div>LOADING...</div>;
    }

    //return react-window list with Row passed into it
    return (
      <List
        className="launches-list"
        height={400}
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
