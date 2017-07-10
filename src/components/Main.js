
/**
 * 图片画廊
 */

require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ImageFigure from './ImageFigure.js';

// 导入json数据
let imageDatas = require('../sources/imageDatas.json');

// 获取图片地址
imageDatas = imageDatas.map(function(ele){


  ele.imageURL = require('../images/' + ele.fileName);
  return ele;
});


class AppComponent extends React.Component {

  constructor(...args){
    super(...args);

    // 初始化图片在各个区域的取值范围
    this.Constant = {
      centerPos: { // 中心图片位置
        left: 0,
        right: 0
      },
      hPosRange: { //水平方向取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { // 垂直方向取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    }

    // 初始化各图片位置对象
    this.state = {
      imgsArrangeArr:[
        /*{
          pos: {
            top: 0,
            left: 0
          }
        }*/
      ]
    }
  }

  componentDidMount(){

    this.initConstant();
  }

  /**
   * 初始化图片位置取值范围
   * @return {[type]} [description]
   */
  initConstant(){

    // 首先拿到舞台的大小
    var stageDOM = this.refs.stage,
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    // 拿到图片figure的大小
    var imgFigureDOM = this.refs.imgFigure0.refs.imgFigure,
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    // 初始化中心位置取值范围
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 初始化水平位置取值范围
    this.Constant.hPosRange = {
      leftSecX: [0 - halfImgW, halfStageW - halfImgW * 2],
      rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
      y: [0 - halfImgH, stageH - halfImgH]
    };

    // 初始化垂直位置取值范围
    this.Constant.vPosRange = {
      x: [halfStageW - imgW, halfStageW + imgW],
      topY: [0 - halfImgH, stageH - halfImgH]
    };

    this.rearrange(0);
  }

  /**
   * 重新排布图片的位置
   * @param  {[type]} currIndex [当前居中图片的索引]
   * @return {[type]}           [description]
   */
  rearrange(currIndex){

    let centerPos = this.Constant.centerPos,
        hPosRange = this.Constant.hPosRange,
        vPosRange = this.Constant.vPosRange,
        imgsArrangeArr = this.state.imgsArrangeArr;

    // 设置居中图片
    let centerImg = imgsArrangeArr.splice(currIndex, 1)[0];
    centerImg.pos = centerPos;

    // 定义图片可显示位置
    let posArr = ['top', 'left','right'],
        posArrLength = posArr.length;

    // 随机分布图片
    imgsArrangeArr = imgsArrangeArr.map(function(ele){

      let randomIndex = getRangeRandom(0, posArrLength - 1),
          currPos = posArr[randomIndex];

      switch(currPos){
        case 'left':
          ele.pos = {
            left: getRangeRandom(hPosRange.leftSecX[0], hPosRange.leftSecX[1]),
            top: getRangeRandom(hPosRange.y[0], hPosRange.y[1])
          };
        break;
        case 'right':
          ele.pos = {
            left: getRangeRandom(hPosRange.rightSecX[0], hPosRange.rightSecX[1]),
            top: getRangeRandom(hPosRange.y[0], hPosRange.y[1])
          };
        break;
        case 'top':
          ele.pos = {
            left: getRangeRandom(vPosRange.x[0], vPosRange.x[1]),
            top: getRangeRandom(vPosRange.topY[0], vPosRange.topY[1])
          };
        break;
      }

      return ele;
    });

    // 将居中的图片重新放回图片数组中
    // imgsArrangeArr.splice(currIndex, 0, centerImg);
    imgsArrangeArr.push(centerImg);

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }

  render(){

    let /*controllerUnits = [],*/
        imgFigures = [];

    imgFigures = imageDatas.map(function(ele, index){

      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }

      return <ImageFigure key={'imgFigure' + index} data={ele} state={this.state.imgsArrangeArr[index]} ref={'imgFigure' + index}/>
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

/**
 * [获得两数之间的随机数]
 * @param  {[type]} min [最小值]
 * @param  {[type]} max [最大值]
 * @return {[type]}     [description]
 */
function getRangeRandom(min, max){

  return Math.ceil(Math.random() * (max - min)) + min;
}
