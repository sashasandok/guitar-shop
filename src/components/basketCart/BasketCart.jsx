import React from 'react';
import {Link} from 'react-router';
import {getTotalBasketCount, getTotalBasketPrice} from '../../selectors';
import {connect} from 'react-redux';

import './basket-cart.css';

const BasketCart = ({totalBasketCount, totalPrice}) => {
  return (
    <div className="cart">
      <div className="dropdown">
        <Link 
          to='/basket'
          id='dlabel' 
          className="btn btn-primary btn-block btn-lg"
        >
          <i className="fa fa-fa-shoping-cart"></i>
          <span>{totalBasketCount} item(s) - ${totalPrice}</span>
        </Link>
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  totalBasketCount: getTotalBasketCount(state),
  totalPrice: getTotalBasketPrice(state)
})

export default connect(mapStateToProps, null)(BasketCart);