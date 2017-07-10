import React, { Component } from 'react';
import Talks from './Talks';
import Header from './Header';
import Private from './Private';
import Message from './SendForm';

class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
      pDisplay: false
    }
    this.privateToggle = this.privateToggle.bind(this);
    this.talks = [
      {
        key: 1,
        name: 'abc',
        isReaded: false
      },
      {
        key: 2,
        name: 'hahha',
        isReaded: true
      }
    ]
  }
  privateToggle() {
    this.setState({ pDisplay: !this.state.pDisplay })
  }
  render() {
    return(
      <div>
        {this.talks.map((pTalk) => (
            <Private
              key={ pTalk.key }
              pDisplay={ this.state.pDisplay } 
              talks={ this.props.pTalks }
              pDisplay={ this.state.pDisplay }
            />
        ))}
        <div className="message-wrap">
          <Header 
            name={ this.props.name } 
            logout={ this.props.logout }
            privateTalks={ this.talks }
            privateToggle={ this.privateToggle }
          />
          <Message 
            addTalk={ this.props.addTalk }
            privateToggle={ this.privateToggle }
            privateTalks={ this.props.privateTalks }
            user={ this.props.user }
          />
        </div>
        <Talks talks={ this.props.talks }/>
        
      </div>
    )
  }
}

export default Main;