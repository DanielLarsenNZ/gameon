import { AvField, AvForm, AvInput, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import React, { useState } from 'react';
import { Button, Col, CustomInput, FormGroup, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const NewScoreModal = ({ isOpen, toggle }) => {
  const [opponent, setOpponent] = useState('');
  const [didPlayerWin, setDidPlayerWin] = useState(false);
  const [didConsent, setDidConsent] = useState(false);

  const submitScore = (values) => {
    // TODO: Add submission logic
    console.log(values);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>New Score</ModalHeader>
      <ModalBody>
        <AvForm
          onValidSubmit={(event, values) => {
            submitScore(values);
          }}>
          <Row>
            <Col>
              <AvField type="select" name="opponent" label="My Opponent" required>
                <option>Thomas Tester</option>
                <option>Erik Employee</option>
                <option>Emma Employee</option>
                <option>Jane Doe</option>
                <option>Emily Example</option>
              </AvField>
            </Col>
            <Col>
              <Label for="outcome">Outcome</Label>
              <AvRadioGroup name="outcome" required>
                <AvRadio label="I won this game" value="win" />
                <AvRadio label="Thomas won this game" value="lose" />
              </AvRadioGroup>
            </Col>
          </Row>

          <AvField
            name="comment"
            maxLength={75}
            label="Optional: Comment"
            type="text"
            placeholder="eg. Dan beat Gavin 2 games to 1"
          />

          <FormGroup>
            <AvInput
              tag={CustomInput}
              type="checkbox"
              name="consentValid"
              label="I acknowledge that these details are true and understand that my inputs directly affect the ratings of all players."
              onChange={() => setDidConsent(!didConsent)}
              required
            />
          </FormGroup>
          <Button color="secondary" type="submit" disabled={!didConsent}>
            Submit Score
          </Button>
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

export default NewScoreModal;
