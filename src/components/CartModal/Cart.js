import React, {Component, PropTypes} from 'react';

export default
class Cart extends Component {
  static propTypes = {
    cartContent: PropTypes.array,
    removeItem: PropTypes.func,
    updateItem: PropTypes.func,
  }

  render() {
    return (
      <div>
        Hello Cart
      </div>
    );
  }
}
