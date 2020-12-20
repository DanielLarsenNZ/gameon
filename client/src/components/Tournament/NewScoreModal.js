import { AvField, AvForm } from 'availity-reactstrap-validation';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const NewScoreModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Submit New Result</ModalHeader>
      <ModalBody>
        <p>Keep your eyes peeled! You can soon submit scores :)</p>
        <AvForm
          onValidSubmit={(event, values) => {
            // TODO: SOMETHING
          }}>
          <AvField
            name="comment"
            maxLength={75}
            label="Comment"
            type="text"
            placeholder="eg. Dan beat Gavin 2 games to 1"
          />
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

export default NewScoreModal;
