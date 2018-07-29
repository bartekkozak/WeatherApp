import React, { Component } from "react";

class Form extends Component {
  render() {
    return (
      <div className="form">
        <form onSubmit={this.props.getWeather}>
          <input type="text" placeholder="city" name="city" />
          <input type="text" placeholder="country" name="country" />
          <button type="submit" className="action-button animate">
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
