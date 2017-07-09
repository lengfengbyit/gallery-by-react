require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// 导入json数据
let imageDatas = require('../sources/imageDatas.json');

// 获取图片地址
imageDatas = imageDatas.map(function(ele){

  ele.imageURL = require('../images/' + ele.fileName);
  return ele;
});



class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">

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
