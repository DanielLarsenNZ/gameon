import { AvField, AvForm, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import React, { useState } from 'react';
import { Step, Steps, Wizard } from 'react-albus';
import { useTranslation } from 'react-i18next';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Progress,
  Row,
} from 'reactstrap';

const initState = {
  name: '',
  description: '',
  reward: '',
  location: '',
  timing: '',
  isDisclaimerChecked: false,
  hasStartDate: false,
};

const NewTournamentModal = ({ isOpen, toggle }) => {
  const { t } = useTranslation('common');

  const [name, setName] = useState(initState.name);
  const [description, setDescription] = useState(initState.description);
  const [rulesURL, setRulesURL] = useState('');
  const [reward, setReward] = useState(initState.reward);
  const [location, setLocation] = useState(initState.location);
  const [timing, setTiming] = useState(initState.timing);
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(initState.isDisclaimerChecked);

  const [hasReward, setHasReward] = useState(false);
  const [hasStartDate, setHasStartDate] = useState(initState.hasStartDate);
  const [hasEndDate, setHasEndDate] = useState(false);
  const [hasMaxPlayers, setHasMaxPlayers] = useState(false);

  const clearForm = () => {
    setName(initState.name);
    setDescription(initState.description);
    setReward(initState.reward);
    setLocation(initState.location);
    setTiming(initState.timing);
    setIsDisclaimerChecked(initState.isDisclaimerChecked);
  };

  const createTournament = () => {
    alert(JSON.stringify({ name, description, reward, location, timing }));
    clearForm();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>{t('tournament.create')}</ModalHeader>
      <ModalBody>
        <Wizard
          render={({ step, steps }) => (
            <React.Fragment>
              <Progress
                animated
                striped
                color="success"
                value={((steps.indexOf(step) + 1) / steps.length) * 100}
                className="mb-3 progress-sm"
              />

              <Steps>
                <Step
                  id="type"
                  render={({ next }) => (
                    <AvForm
                      onValidSubmit={(event, values) => {
                        next();
                      }}>
                      <Label for="startDate">Who can take part?</Label>
                      <FormGroup tag="fieldset">
                        <AvRadioGroup name="type" required>
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label>
                                  <MegaOption
                                    title="Anyone in my Organisation"
                                    description="Only members in my organisation can compete in this tournament."
                                    value="myorg"
                                    isRecommended
                                  />
                                </Label>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label>
                                  <MegaOption
                                    title="Anyone Globally (Limited)"
                                    description="Anyone from any organisation with an Azure AD tenant can take part."
                                    value="global"
                                    isUnavailable
                                  />
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                        </AvRadioGroup>
                      </FormGroup>

                      <Row>
                        <Col>
                          <p>
                            <strong>Which option is right for me?</strong> The majority of the time you will want to
                            select 'Anyone in my Organisation' to keep your tournaments internal to your workplace.
                            'Anyone Globally' does not current allow you to whitelist specific domains.
                          </p>
                        </Col>
                      </Row>
                      {/* </FormGroup> */}

                      <ul className="list-inline wizard mb-0">
                        <li className="next list-inline-item float-right">
                          <Button color="success">Next</Button>
                        </li>
                      </ul>
                    </AvForm>
                  )}
                />
                <Step
                  id="about"
                  render={({ next, previous }) => (
                    <AvForm
                      onValidSubmit={(event, values) => {
                        next();
                      }}>
                      <Row>
                        <Col md={6}>
                          <AvField
                            name="title"
                            label={t('tournament.name')}
                            type="text"
                            placeholder="eg. Table Tennis Championship"
                            helpMessage="This is the name of the new tournament."
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                          />
                        </Col>
                        <Col md={6} className="my-auto d-none d-sm-none d-md-block">
                          <Hint title="Hint" iconClass="uil-bolt-alt">
                            Keep the title short and concise.
                          </Hint>
                        </Col>
                      </Row>

                      <AvField
                        name="description"
                        label={t('tournament.description')}
                        helpText="test"
                        type="textarea"
                        placeholder="Tell everyone what this tournament is about..."
                        helpMessage="Tell players what this tournament is about and why they should take part."
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        rows={5}
                        maxLength={250}
                        required
                      />
                      <Row>
                        <Col>
                          <AvField
                            name="rules"
                            label="Link to Sport's Rules"
                            type="url"
                            placeholder="eg. https://www.rulesofsport.com/sports/table-tennis-ping-pong.html"
                            errorMessage="Invalid URL (must include the https://... part)"
                            helpMessage="Paste a URL to the rules for this sport. "
                            onChange={(e) => setRulesURL(e.target.value)}
                            value={rulesURL}
                          />
                        </Col>
                        <Col md={6} className="my-auto d-none d-sm-none d-md-block">
                          <Hint title="Hint" iconClass="uil-bolt-alt">
                            <a href="https://www.rulesofsport.com/" target="_blank" rel="noreferrer">
                              Click here
                            </a>{' '}
                            to find the rules for your sport, then simply copy and paste its URL here.
                          </Hint>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Label for="reward">Is there a reward at the end of the tournament?</Label>
                          <AvRadioGroup name="reward" required>
                            <AvRadio label="Yes" value="hasReward" onChange={() => setHasReward(true)} />
                            <AvRadio label="No" value="noReward" onChange={() => setHasReward(false)} />
                          </AvRadioGroup>
                        </Col>
                        <Col md={6} className="my-auto">
                          {hasReward ? (
                            <AvField
                              name="playingFor"
                              label="Describe the Reward"
                              helpMessage="Describe the reward and eligibility in a sentence."
                              type="text"
                              placeholder="eg. Chocolates for the Top 3 players + spot prizes!"
                              onChange={(e) => setReward(e.target.value)}
                              value={reward}
                              required={hasReward}
                            />
                          ) : (
                            <Hint title="Hint" iconClass="uil-bolt-alt">
                              Adding a reward is recommended to incentivise players to join and continue challenging one
                              another.
                            </Hint>
                          )}
                        </Col>
                      </Row>

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
                  id="when"
                  render={({ next, previous }) => (
                    <AvForm
                      onValidSubmit={(event, values) => {
                        next();
                      }}>
                      <Row>
                        <Col>
                          <AvField
                            name="location"
                            label={t('tournament.location')}
                            helpMessage="Name of a shared space or office."
                            placeholder="eg. The Lunch Room"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            type="text"
                            required
                          />
                        </Col>
                        <Col>
                          <AvField
                            name="timing"
                            label={t('tournament.timing')}
                            helpMessage="Leave blank for any time."
                            type="text"
                            placeholder="eg. Mondays 9-10am"
                            onChange={(e) => setTiming(e.target.value)}
                            value={timing}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Label for="startDate">Tournament Start Date</Label>
                          <AvRadioGroup name="startDate" required>
                            <AvRadio
                              label="Start Immediately (recommended)"
                              value="now"
                              onChange={() => setHasStartDate(false)}
                            />
                            <AvRadio
                              label="Schedule in the future"
                              value="future"
                              onChange={() => setHasStartDate(true)}
                            />
                          </AvRadioGroup>
                        </Col>
                        <Col className="my-auto">
                          {hasStartDate ? (
                            <AvField
                              name="startDate"
                              label="Future Start Date"
                              helpMessage="Date from which players can submit scores."
                              type="date"
                              placeholder="Start Date"
                              required={hasStartDate}
                            />
                          ) : (
                            <Hint title="Info" iconClass="uil-info-circle" color="info">
                              Selecting a future start date allows users to join now but only submit scores after this
                              date.
                            </Hint>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="endDate">Tournament End Date</Label>
                            <AvRadioGroup name="endDate" required>
                              <AvRadio
                                label="No End Date (Ongoing)"
                                value="ongoing"
                                onChange={() => setHasEndDate(false)}
                              />
                              <AvRadio
                                label="Schedule an End Date"
                                value="hasEndDate"
                                onChange={() => setHasEndDate(true)}
                              />
                            </AvRadioGroup>
                          </FormGroup>
                        </Col>
                        <Col className="my-auto">
                          {hasEndDate ? (
                            <AvField
                              name="endDate"
                              label="Future End Date"
                              helpMessage="Date after which this tournamet ends."
                              type="date"
                              placeholder="End Date"
                              required={hasEndDate}
                            />
                          ) : (
                            <Hint title="Info" iconClass="uil-info-circle" color="info">
                              While most ladder tournaments are ongoing, you can choose an end date to timebox it.
                            </Hint>
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="maxPlayers">Maximum players</Label>
                            <AvRadioGroup name="maxPlayers" required>
                              <AvRadio label="No Player Limit" value="none" onChange={() => setHasMaxPlayers(false)} />
                              <AvRadio
                                label="Set a Player Limit"
                                value="hasPlayerLimit"
                                onChange={() => setHasMaxPlayers(true)}
                              />
                            </AvRadioGroup>
                          </FormGroup>
                        </Col>
                        <Col className="my-auto">
                          {hasMaxPlayers ? (
                            <AvField
                              name="maxPlayers"
                              label="Maximum Players"
                              helpMessage="Max capacity for this tournament (min = 2)."
                              type="number"
                              placeholder="Max Players"
                              min={2}
                              max={1000}
                              value={20}
                              required={hasMaxPlayers}
                            />
                          ) : (
                            <Hint title="Info" iconClass="uil-info-circle" color="info">
                              You can restrict this tournament to a specific number of players, after which
                              registrations close.
                            </Hint>
                          )}
                        </Col>
                      </Row>

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
                              checked={isDisclaimerChecked}
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

const MegaOption = ({ title, value, description, isRecommended, isUnavailable }) => (
  <Card className="border border-info">
    <CardBody>
      <div className="media p-20">
        <div className="radio radio-info mr-3 ml-2">
          <AvRadio value={value} disabled={isUnavailable} />
          {/* <input id="typeSelector" type="radio" name="typeSelector" />
          <label htmlFor="typeSelector"></label> */}
        </div>

        <div className="media-body text-muted">
          <h6 className="mt-0">
            {title}
            {isRecommended && (
              <Badge color="info" className="float-right">
                Recommended
              </Badge>
            )}
          </h6>
          <p>{description}</p>
        </div>
      </div>
    </CardBody>
  </Card>
);

const Hint = ({ title, iconClass, color = 'success', children }) => (
  <p>
    <strong>
      <i className={`${iconClass} text-${color} mr-1`}></i>
      {title}
    </strong>
    : {children}
  </p>
);

export default NewTournamentModal;
