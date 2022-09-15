import React, { Component } from 'react'

export default class CountdownSettings extends Component {

  render() {
    const { minutes, handleChange, tribo } = this.props;
    
    return (
      <div>
        { tribo ? <h4>Quantos minutinhos de intervalo, Wolf?</h4> : <h4>Quantos minutinhos de intervalo, Maitê?</h4> }
          {' '}
          <input 
            type="number" 
            name="minutes" 
            id="minutes" 
            min="1"
            max="60"
            value={ minutes }
            onChange={ handleChange }
            />
      </div>
    )
  }
}
