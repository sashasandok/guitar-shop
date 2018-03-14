import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import R from 'ramda';
import BasketCart from '../../components/basketCart/BasketCart';

import {
  fetchGuitarById,
  addGuitarToBasket
} from '../../actions/actions';
import {getGuitarById} from '../../selectors'; 

import './guitar.css';

class Guitar extends Component {
  componentDidMount() {
    this.props.fetchGuitarById(this.props.params.id)
  };

  renderFields () {
    const {guitar} = this.props;
    const columnFields = R.compose(
      R.toPairs,
      R.pick([
        'mensura',
        'strings',
        'housing',
        'color',
        'frets',
        'pickups',
        'fretboardWidth'
      ])
      
    )(guitar)
    
    return columnFields.map(([key, value]) => (
      <div className='column' key={key}>
        <div className='ab-details-title'>
          <p>{key}</p>
        </div>
        <div className='ab-details-info'>
          {value}
        </div>
      </div>
    ))
  }

  renderContent () {
    const {guitar} = this.props;
    return (
      <div className='thumbnail'>
        <div className='row'>
          <div className='col-md-6'>
            <img
              className='img-thumbnail'
              src={guitar.image}
              alt={guitar.name}
            />
          </div>
          <div className='col-md-6'>
            {this.renderFields()}
          </div>
        </div>
        <div className='caption-full'>
          <h4 className='pull-right'>${guitar.price}</h4>
          <h4>{guitar.name}</h4>
          <p>{guitar.description}</p>
        </div>
      </div>
    )
  }

  renderSidebar () {
    const {guitar, addGuitarToBasket} = this.props;
    return (
      <div>
        <p className='lead'>Quick shop</p>
        <BasketCart />
        <div className='form-group'>
          <h1>{guitar.name}</h1>
          <h2>${guitar.price}</h2>
        </div>
        <Link to='/' className='btn btn-info btn-block'>Back to store</Link>
        <button
          type='button'
          className='btn btn-success btn-block'
          onClick={() => addGuitarToBasket(guitar.id)}
        >
          Add to cart
        </button>
      </div>
    )
  }

  render() {
    const {guitar} = this.props;
    return (
      <div className="view-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {guitar && this.renderContent()}
            </div>
            <div className="col-md-3">
              {guitar && this.renderSidebar()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchGuitarById,
  addGuitarToBasket
}

const mapStateToProps = state => ({
  guitar: getGuitarById(state, state.guitarPage.id)
})

export default connect(mapStateToProps, mapDispatchToProps)(Guitar);