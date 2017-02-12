import React, { Component } from 'react';
import Message from './SendForm';

class Private extends Component{
  constructor(props) {
    super(props);
    this.state = {
      lock: false,
      oStyle: {
        left: '100px',
        top: '50px',
        width: '500px',
        height: '600px',
      },
      className: ''
    }
  }

  addTalk(e) {
    console.log(e)    
  }
  close(e) {
    this.minimize(e);
  }
  restore() {
    let node = this.originNode.style,  
        o = this.state.oStyle;
    node.left = o.left;
    node.top = o.top;
    node.width = o.width;
    node.height = o.height;
    this.setState({lock: !this.state.lock});
  }
  minimize(e) {
    let lock = this.state.lock,
        o = this.state.oStyle,
        node = this.originNode.style;
    if(!lock) {       
      let min = setInterval(() => {
        if(node.width || node.height) {
          toZero(node.width);
          toZero(node.height);
          toZero(node.top);
          toZero(node.left);
        }else { clearInterval(min); }
      }, 40)
      let toZero = (prop) => {
        prop ? --prop : prop = 0;
        return prop;
      }
      setTimeout(() => {
        node.display = 'none';
      }, 500);
      this.setState({lock: !lock});
    }else {
      this.restore();
    }
  }
  maximize(e) {
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
      this.restore();
    }
  }
  resize(d, e) {    
    this.dragCommon();    
    let x = parseInt( this.node.style.left );
    let y = parseInt( this.node.style.top ); 
    let fnx = (event) => {
      console.log(event.clientX - x < 500)
      this.node.style.width = (event.clientX - x < 500 ? 500 : (event.clientX - x) + 10) + 'px';
    }
    let fny = (event) => {
      this.node.style.height = (event.clientY - y) + 10 + 'px';
    }
    let fnxy = (event) => {
      this.node.style.width = (event.clientX - x) + 10 + 'px';
      this.node.style.height = (event.clientY - y) + 10 + 'px';
    }
    let fn = d === 'x' ? fnx : d === 'y' ? fny : fnxy;
    this.node.onmousemove = (event) => {
      if( !this.node ) return false;
      fn(event);
    }
    this.mouseup(this.node);
  }
  drag(e) {   
    this.dragCommon();    
    let x = e.clientX - parseInt( this.node.style.left );
    let y = e.clientY - parseInt( this.node.style.top ); 
    this.node.onmousemove = (event) =>{
      if( !this.node ) return false;
      this.node.style.left = (event.clientX - x) + 'px';
      this.node.style.top = (event.clientY - y) + 'px';
    }
    this.mouseup(this.node);
  }
  dragCommon() {
    if(this.state.lock) return false;
    this.node = this.originNode;
    if( !this.node ) return false;  
    document.all ? this.node.setCapture() : window.captureEvents( Event.MOUSEMOVE );
  }
  mouseup(node) {
    return node.onmouseup = () => {
      if( !this.node ) return false;   
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
  }
  componentDidMount() {    
    
  }
  render() {
    let Talks = [];
    this.props.talks.forEach( (talk) => {
        Talks.push(<Talk key={ talk.key } name={ talk.name } talks={ talk.talk }/>);
      }
    )
    return(
      <div className="privateBox" 
        style={ Object.assign({ display: this.props.pDisplay ? 'block' : 'none' }, this.state.oStyle) } 
        ref={(div) => {this.originNode = div}}
        onDoubleClick={ this.maximize.bind(this) }
      >
        <div className="hp_wrap">
          <div className="privateToggle" onMouseDown={ this.drag.bind(this) }>
            <a 
              ref="close" 
              onClick={ this.close.bind(this) } 
              onMouseDown={(e) => {e.nativeEvent.stopImmediatePropagation();console.log('is run')}}
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
        <div ref="resizeX" className="resizeX" onMouseDown={ this.resize.bind(this, 'x') }></div>
        <div ref="resizeY" className="resizeY" onMouseDown={ this.resize.bind(this, 'y') }></div>
        <div ref="resizeXY" className="resizeXY" onMouseDown={ this.resize.bind(this, 'xy') }></div>
      </div>
    )
  }
}
export default Private;