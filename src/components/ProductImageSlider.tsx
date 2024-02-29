import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const ProductImageSlider: React.FC<{ imgs: string[]; style?: React.CSSProperties; }> = ({ imgs, style }) => {
  return (
    <Carousel>
      {
        imgs.map((img, index) => <Carousel.Item key={img}>
          <div style={{display:'flex', justifyContent:'center'}}>
            <img className='product-card-img' style={style} key={img} alt={`produc_slider${index}`} src={img} />
          </div>
        </Carousel.Item>)
      }
    </Carousel>
  )
}

export default ProductImageSlider