import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { themeAction } from '../../Store/theme-slice';
import { CSVLink } from 'react-csv';
const PremiumModal = (props) => {
  console.log(props.show);
  const showTheme = useSelector((state) => state.theme.theme);
  console.log('show theme', showTheme);
  const dispatch = useDispatch();
  const changeThemeHandler = () => {
    dispatch(themeAction.changeTheme());
  };

  const headers = [
    {
      label: 'Amount',
      key: 'amount',
    },
    {
      label: 'Description',
      key: 'description',
    },
    {
      label: 'Category',
      key: 'category',
    },
  ];

  const expenses = useSelector((state) => state.expense.value);
  const csvLink = {
    filename: 'file.csv',
    headers: headers,
    data: expenses,
  };

  return (
    <div>
      <Modal
        show={props.onShow}
        className='bg-transparent '
        onHide={props.onClose}>
        <Modal.Header
          closeButton
          onClick={props.onClose}>
          <Modal.Title>Congrats!!! You are a premium user now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          click the buttons below to enjoy the premium features
        </Modal.Body>
        <Modal.Footer>
          {showTheme ? (
            <Button
              variant='info'
              className='me-auto'
              onClick={changeThemeHandler}>
              Previous Theme
            </Button>
          ) : (
            <Button
              variant='info'
              className='me-auto'
              onClick={changeThemeHandler}>
              Change Theme
            </Button>
          )}
          <Button
            variant='dark'
            className='ms-auto color-dark'>
            <CSVLink {...csvLink}>Download Your Expenses</CSVLink>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PremiumModal;
