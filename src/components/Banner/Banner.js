import React, {Component} from 'react';
import Slider from 'react-slick';

export default
class Banner extends Component {
  render() {

    const bannerImage1 = require('./banner_img_1.png');
    const bannerImage2 = require('./banner_img_2.png');

    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 8000,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <Slider {...settings}>
        <img src={bannerImage1} key={bannerImage1} />
        <img src={bannerImage2} key={bannerImage1} />
      </Slider>
    );
  }
}
