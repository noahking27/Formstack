import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import EditableCell from './EditableCell';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}

export class Wines extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      render: (text, record) => this.renderColumns(text, record, 'name')
    }, {
      title: 'vintage',
      dataIndex: 'vintage',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'vintage')
    }, {
      title: 'region',
      dataIndex: 'region',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'region')
    },  {
      title: 'vineyard',
      dataIndex: 'vineyard',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'vineyard')
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.key)}>Edit</a>
            }
          </div>
        );
      },
    }];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  render() {
    console.log('PROPS ', this.props)
    return (
      <div>
        <Table bordered dataSource={this.props.wines} columns={this.columns} />;
      </div>
    );
  }
}

Wines.propTypes = {
  wines: PropTypes.array
};


export default Wines;
