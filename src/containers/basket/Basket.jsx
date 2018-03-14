import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import {
  getTotalBasketPrice,
  getBasketGuitarsWithCount
} from '../../selectors';
import {Link} from 'react-router';
import {
  removeGuitarFromBasket,
  cleanBasket,
  basketCheckout
} from '../../actions/actions';

import './basket.css';


const Basket = ({
  guitars,
  totalPrice,
  removeGuitarFromBasket,
  cleanBasket,
  basketCheckout
}) => {
const isBasketEmpty = R.isEmpty(guitars);

const renderContent = () => (
  <div>
    {isBasketEmpty && <div>Your shopping cart is empty</div>}
    <div className='table-responsive'>
      <table className='table-bordered table-striped table-condensed cf'>
        <tbody>
          {guitars.map((guitar, index) => {
            return(
              <tr
                key={index}
                className='item-checout'
              >
                <td className="first-column-checkout">
                  <img
                    className="img-thumbnail"
                    src={guitar.image}
                    alt={guitar.name}
                  />
                </td>
                <td>{guitar.name}</td>
                <td>{guitar.price}</td>
                <td>{guitar.count}</td>
                <td>
                  <button
                    className='delete-cart'
                    onClick={() => removeGuitarFromBasket(guitar.id)}
                  >del</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    {
      R.not(isBasketEmpty) &&
      <div className="row">
        <div className="pull-right total-user-checkout">
          <b>Total:</b>
          ${totalPrice}
        </div>
      </div>
    }
  </div>
);

const renderSidebar = () => (
  <div>
    <div>
      <Link
      className='btn btn-info'
        to='/'
      >
        <span className='glyphicon glyphicon-info-sign'/>
        <span>Continue shopping</span>
      </Link>
      {
        R.not(isBasketEmpty) &&
        <div>
          <button
            onClick={cleanBasket}
            className='btn btn-danger'
          >
            <span className='glyphicon glyphicon-trash'/>
            clear cart
          </button>
          <button
            className='btn btn-success'
            onClick={() => basketCheckout(guitars)}
          >
            <span className='glyphicon glyphicon-envelope'/>
            checkout
          </button>
        </div>
      }
    </div>
  </div>
);

  return (
    <div className="view-container">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {renderContent()}
          </div>
          <div className="coll-md-3">
            {renderSidebar()}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
    guitars: getBasketGuitarsWithCount(state),
    totalPrice: getTotalBasketPrice(state)
  })

const mapDispatchToProps = {
  removeGuitarFromBasket,
  cleanBasket,
  basketCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)

