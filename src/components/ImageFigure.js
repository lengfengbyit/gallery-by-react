/**
 *单个图片显示组件
 */

require('normalize.css/normalize.css');
require('styles/ImageFigure.css');

import React from 'react';

class ImageFigureComponent extends React.Component{

  render(){

    let posObj = {},
        imageData = this.props.data;

    if(this.props.state.pos){
      posObj = this.props.state.pos;
    }

    return (
      <figure className="img-figure" ref="imgFigure" style={posObj}>
        <img src={imageData.imageURL} alt={imageData.title}/>
        <figcaption>
          <h2 className="img-title">{imageData.title}</h2>
          <div className="img-back">{imageData.desc}</div>
        </figcaption>
      </figure>
    );
  }
}


export default ImageFigureComponent;
