import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Col, Form, Row, Input, Layout, Menu, Modal, message } from 'antd';
import { StyleSheet, css } from 'aphrodite';

const { Sider } = Layout;
const FormItem = Form.Item;
const styles = StyleSheet.create({
  button: {
    margin: '5px'
  },
  buttonCancel: {
    marginRight: '8px'
  },
  buttonRow: {
    marginTop: '35px'
  },
  error: {
    marginBottom: '10px'
  },
  formItem: {
    marginBottom: '10px'
  },
  label: {
    fontWeight: '500'
  },
  sider: {
    marginTop: '50px',
    background: '#fff',
    height: '65vh',
    overflowY: 'auto'
  },
  wineHeader: {
  textAlign: 'center',
  borderBottom: '1px solid black',
},
})

export class Wines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wineSelected: null,
      error: false,
      visible: false,
      sortAsc: true,
    }

  }

  handleWineListClick = ({ keyPath }) => {
    this.setState({ wineSelected:  keyPath[0]})
}

handleDeleteWineClick = () => {
  const { wineSelected } = this.state
  const { wines } = this.props
  const remainingWines = wines.filter((wine) => { return wine.name != wineSelected; });

  this.props.actions.deleteWine(remainingWines)
  message.success('Wine deleted!')
  this.setState({ wineSelected: null })
}

sortWineListAsc = () => {
  this.setState({ sortAsc: true })
}

sortWineListDesc = () => {
  this.setState({ sortAsc: false })
}

handleAddWineClick = () => {
  this.setState({ visible: true })
}

handleAddWineCancel = () => {
  this.setState({ visible: false })
}

handleAddWineSubmit = (e) => {
  e.preventDefault()

  this.props.form.validateFields(['addWineNameField'], (errors, values) => {
    const { wines } = this.props
    const wineExists = wines.find(wine => wine.name === values.addWineNameField)

    // wine with that name already exists
    if (wineExists) {
      this.setState({ error: true })
    } else if (!errors) {
      const newAndExistingWines = [...wines]
      newAndExistingWines.push({name: values.addWineNameField})
      console
      this.props.actions.addWine(newAndExistingWines)
        message.success('Wine added!')
        this.props.form.resetFields()
        this.setState({ visible: false })
    }
  })
}

displayWineList(wines) {
    const { getFieldDecorator } = this.props.form
    const winesCopy = this.state.sortAsc === true ? [...wines] : [...wines].reverse()
    const wineList = winesCopy.map(wine => (
      <Menu.Item id={wine.name.replace(/\s/g, '')} key={wine.name}>{wine.name}</Menu.Item>
    ),
    )

    return (
      <Sider width={400} style={{ background: '#fff' }}>
        <Row type="flex" justify="center">
          <Button
            className={css(styles.button)}
            id="addWineButton"
            type="primary"
            onClick={this.handleAddWineClick}
          >
          Add Wine
          </Button>
          <Modal
            title={'Add a Wine'}
            visible={this.state.visible}
            width="600px"
            footer={null}
            onCancel={this.handleAddWineCancel}
          >
            <Form
              onSubmit={this.handleAddWineSubmit}
              hideRequiredMark
            >
              {this.state.error &&
                <Alert message="A wine with that name already exists."
                  type="error"
                  closable
                  onClose={this.onErrorClose}
                  className={css(styles.error)}
                />
              }
              <FormItem
                label={
                  <span className={css(styles.label)}>
                    Wine Name
                  </span>
                }
                colon={false}
                className={css(styles.formItem)}
              >
                {getFieldDecorator('addWineNameField', {
                  rules: [
                    { required: true, message: "You can't leave this empty." },
                  ],
                })(<Input />)
                }
              </FormItem>
              <Row className={css(styles.buttonRow)}>
                <Button
                  id="submitWine"
                  className={css(styles.button)}
                  type="primary"
                  htmlType="submit">
                Submit
                </Button>
                <Button
                  onClick={this.handleAddWineCancel}
                  className={css(styles.button, styles.buttonCancel)}
                >
                  Cancel
                </Button>
              </Row>
            </Form>
          </Modal>
            <Button
              type="danger"
              className={css(styles.button)}
              id="deleteWineButton"
              onClick={this.handleDeleteWineClick}
            >
            Delete Wine
            </Button>
          <Button
            icon="caret-up"
            onClick={this.sortWineListAsc}
            className={css(styles.button)}
          />
          <Button
            icon="caret-down"
            onClick={this.sortWineListDesc}
            className={css(styles.button)}
          />
        </Row>
        <h1 className={css(styles.wineHeader)}>
          Wines
        </h1>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          className={css(styles.sider)}
          onClick={this.handleWineListClick}
        >
          {wineList}
        </Menu>
      </Sider>
    )
  }

    render = () => {
      console.log("PROPS ", this.props)
      console.log("STATE ", this.state)

      return (
        <div id="wineDiv">
          <Row type="flex" justify="start">
            <Col sm={24} md={12} lg={12}>
              {this.displayWineList(this.props.wines)}
            </Col>
            <Col sm={24} md={10} lg={12}>
              <div>
                <h1>Selected Wine:</h1>
                <h3 id="wineSelected">{this.state.wineSelected}</h3>
              </div>
            </Col>
          </Row>
        </div>
      )
    }
  }

Wines.propTypes = {
  wines: PropTypes.array
};

Wines.defaultProps = {
  wines: []
};

export default Form.create()(Wines);
