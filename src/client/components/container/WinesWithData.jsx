import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import Wines from '../presentation/Wines';
import * as actionCreators from '../../actions/wineActions';

export class WinesWithData extends Component {
  componentDidMount() {
    this.props.actions.fetchWines();
  }

  render() {
    return (
      <Wines {...this.props} />
    );
  }
}

WinesWithData.propTypes = {
  wines: PropTypes.array,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ...state.wines
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(WinesWithData);
