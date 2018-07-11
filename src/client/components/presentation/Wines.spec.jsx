import React from 'react';
import { Wines } from './Wines';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<Wines />', () => {
  it('should show all the wines passed to it', () => {
    const wines = [{
      id: 1,
      name: 'Pinot Noir'
    }, {
      id: 2,
      name: 'Cabernet'
    }];

    const wrapper = shallow(<Wines wines={wines} />);
    expect(wrapper.find('.wine')).to.have.length(2);
    expect(wrapper.find('.wines__list').text()).to.contain('Pinot Noir');
    expect(wrapper.find('.wines__list').text()).to.contain('Cabernet');
  });
});
