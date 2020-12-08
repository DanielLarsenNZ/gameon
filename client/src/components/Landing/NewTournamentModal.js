import { AvField, AvForm } from 'availity-reactstrap-validation';
import React, { useState } from 'react';
import { Step, Steps, Wizard } from 'react-albus';
import { useTranslation } from 'react-i18next';
import { Button, Col, CustomInput, Modal, ModalBody, ModalHeader, Progress, Row } from 'reactstrap';

const NewTournamentModal = ({ isOpen, toggle }) => {
  const { t } = useTranslation('common');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [location, setLocation] = useState('');
  const [timing, setTiming] = useState('');
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);

  const createTournament = () => alert(JSON.stringify({ name, description, reward, location, timing }));

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>{t('tournament.new_tournament')}</ModalHeader>
      <ModalBody>
        <Wizard
          render={({ step, steps }) => (
            <React.Fragment>
              <Progress
                animated
                striped
                color="info"
                value={((steps.indexOf(step) + 1) / steps.length) * 100}
                className="mb-3 progress-sm"
              />

              <Steps>
                <Step
                  id="about"
                  render={({ next }) => (
                    <AvForm
                      onValidSubmit={(event, values) => {
                        next();
                      }}>
                      <AvField
                        name="title"
                        label={t('tournament.name')}
                        type="text"
                        placeholder="eg. Table Tennis Championship"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <AvField
                        name="description"
                        label={t('tournament.description')}
                        type="textarea"
                        placeholder="Tell everyone what this tournament is about..."
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        maxLength={250}
                        required
                      />
                      <AvField
                        name="playingFor"
                        label={t('tournament.reward')}
                        type="text"
                        placeholder="eg. Chocolates"
                        onChange={(e) => setReward(e.target.value)}
                      />

                      <ul className="list-inline wizard mb-0">
                        <li className="next list-inline-item float-right">
                          <Button color="success" type="submit">
                            Next
                          </Button>
                        </li>
                      </ul>
                    </AvForm>
                  )}
                />
                <Step
                  id="when"
                  render={({ next, previous }) => (
                    <AvForm
                      onValidSubmit={(event, values) => {
                        next();
                      }}>
                      <AvField
                        name="location"
                        label={t('tournament.location')}
                        placeholder="eg. The Lunch Room"
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        required
                      />
                      <AvField
                        name="timing"
                        label={t('tournament.timing')}
                        type="text"
                        placeholder="eg. Mondays 9-10am"
                        onChange={(e) => setTiming(e.target.value)}
                      />

                      <ul className="list-inline wizard mb-0">
                        <li className="previous list-inline-item">
                          <Button onClick={previous} color="info">
                            Previous
                          </Button>
                        </li>
                        <li className="next list-inline-item float-right">
                          <Button color="success" type="submit">
                            Next
                          </Button>
                        </li>
                      </ul>
                    </AvForm>
                  )}
                />
                <Step
                  id="message"
                  render={({ previous }) => (
                    <Row>
                      <Col sm={12}>
                        <div className="text-center">
                          <h2 className="mt-0">
                            <i className="mdi mdi-check-all"></i>
                          </h2>
                          <h3 className="mt-0">Almost done!</h3>

                          <p className="w-50 mb-2 mx-auto">
                            By creating this tournament, you will become its owner and solely responsible for keeping
                            its details up-to-date.
                          </p>
                          <p className="w-50 mb-2 mx-auto">
                            As owner, you can edit, archive, or transfer this tournament.
                          </p>

                          <div className="mb-3">
                            <CustomInput
                              type="checkbox"
                              id="understandCheckbox"
                              label="I understand my responsibilities"
                              onChange={(e) => setIsDisclaimerChecked(e.target.checked)}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col sm={12}>
                        <ul className="list-inline wizard mb-0">
                          <li className="previous list-inline-item">
                            <Button onClick={previous} color="info">
                              Previous
                            </Button>
                          </li>

                          <li className="next list-inline-item float-right">
                            <Button color="success" disabled={!isDisclaimerChecked} onClick={() => createTournament()}>
                              Create
                            </Button>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  )}
                />
              </Steps>
            </React.Fragment>
          )}
        />
      </ModalBody>
      {/* <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Create Tournament
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default NewTournamentModal;
