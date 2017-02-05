import React, { Component } from 'react';
import Message from './SendForm';

class NotLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      lock: false,
      oStyle: {
        left: '20px',
        top: '50px',
        width: '500px',
        height: '600px'
      }
    }
  }

  addTalk(e) {
    console.log(e)
    
  }
  stopPropa() {
    document.removeEventListener("mousedown", mouse, false);
  }
  close(e) {
    console.log(e)
  }
  minimize(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  maximize(e) {
    e.nativeEvent.stopImmediatePropagation();
    let lock = this.state.lock,
        o = this.state.oStyle,
        node = this.originNode.style;
    if(!lock) {       
      node.left = '0px';
      node.top = '0px';
      node.width = '100vw';
      node.height = '100vh';
      this.setState({lock: !lock});
    }else {
      node.left = o.left;
      node.top = o.top;
      node.width = o.width;
      node.height = o.height;
      this.setState({lock: !lock});
    }
  }
  //mousedown
  drag(e) { 
    this.node = this.originNode;
    if( !this.node ) return false;  
    document.all ? this.node.setCapture() : window.captureEvents( Event.MOUSEMOVE );
    let x = e.clientX - parseInt( this.node.style.left );
    let y = e.clientY - parseInt( this.node.style.top );    
    document.onmousemove = (event) =>{
      if( !this.node ) return false;
      this.node.style.left = (event.clientX - x) + 'px';
      this.node.style.top = (event.clientY - y) + 'px';
    }
  }
  componentDidMount() {
    document.onmouseup = () => {
      if( !this.node ) return false;   
      console.log('onmouseup')
      document.all ? this.node.releaseCapture() : window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
      this.setState({
        oStyle: {
          left: this.node.style.left,
          top: this.node.style.top,
          width: this.state.oStyle.width,
          height: this.state.oStyle.height
        }
      })
      this.node = '';
    }

    //盖掉mousedown/up
    this.resize
  }
  render() {
    let Talks = [];
    this.props.talks.forEach( (talk) => {
        Talks.push(<Talk key={ talk.key } name={ talk.name } talks={ talk.talk }/>)
      }
    )
    return(
      <div className="privateBox" 
        style={ this.state.oStyle } 
        ref={(div) => {this.originNode = div}}
        ondblClick={ this.maximize.bind(this) }
      >
        <div className="hp_wrap">
          <div className="privateToggle" onMouseDown={ this.drag.bind(this) }>
            <a 
              ref="close" 
              onClick={ this.close.bind(this) } 
              style={{'background-color': '#ff8888'}}
            ></a>
            <a ref="minimize" onClick={ this.minimize.bind(this) } style={{'background-color': '#ffc588'}}></a>
            <a ref="maximize" onClick={ this.maximize.bind(this) } style={{'background-color': '#a3ee9f'}}></a>
          </div>  
          <div className="private-header"></div>
          <Message />
        </div>        
        <div className="talks_wrap">
          <div className="container">
            {Talks}
          </div>
        </div>
        <div ref="resizeX" 
          style={{
            width: '5px', 
            height: '100%', 
            position: 'absolute',
            right: '0',
            top: '0',
            cursor: 'e-resize'
          }}>
        </div>
        <div ref="resizeY" 
          style={{
            width: '100%', 
            height: '5px',
            position: 'absolute',
            left: '0',
            bottom: '0',
            cursor: 's-resize'
          }}>
        </div>
        <div ref="resizeXY" 
          style={{
            width: '5px', 
            height: '5px',
            position: 'absolute',
            bottom: '0',
            right: '0',
            cursor: 'nw-resize'
          }}>
        </div>
      </div>
    )
  }
}
export default NotLogin;