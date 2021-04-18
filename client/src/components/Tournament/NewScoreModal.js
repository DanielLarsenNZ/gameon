/* eslint-disable no-unused-vars */
import { AvField, AvForm, AvInput, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, CustomInput, FormGroup, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const NewScoreModal = ({ players = [], isOpen, toggle }) => {
  const { t } = useTranslation('tournament');
  const [opponent, setOpponent] = useState('');
  const [didPlayerWin, setDidPlayerWin] = useState(false);
  const [didConsent, setDidConsent] = useState(false);

  const submitScore = (values) => {
    // TODO: Add submission logic
    console.log(values);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>{t('actions.submit_score')}</ModalHeader>
      <ModalBody>
        <AvForm
          onValidSubmit={(event, values) => {
            submitScore(values);
          }}>
          <Row>
            <Col>
              <AvField
                type="select"
                name="opponent"
                label="My Opponent"
                onChange={(e) => setOpponent(e.target.value)}
                required>
                <option hidden selected>
                  Select your opponent...
                </option>

                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </AvField>
            </Col>
            <Col>
              <Label for="outcome">Outcome</Label>
              <AvRadioGroup name="outcome" required>
                <AvRadio label="I won this game" value="win" />
                <AvRadio label="I lost this game" value="lose" />
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
