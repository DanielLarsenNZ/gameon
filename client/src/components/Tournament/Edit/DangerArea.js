import React from 'react';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { useAPI } from '../../../helpers/useApi';

const DangerArea = () => {
  let { id } = useParams();
  const { data: players } = useAPI(`/tournaments/${id}/players`);

  const handleTransferOwnership = () => {
    console.log('Owner wants to transfer ownership');
  };
  const handleEndTournament = () => {
    console.log('Owner wants to end this tournament');
  };

  return (
    <>
      <h4 className="header-title mt-2">Transfer Ownership</h4>

      <Form>
        <Row className="mt-4">
          <Col md={6}>
            <FormGroup>
              <Label for="transfer">Transfer Ownership</Label>
              <Row>
                <Col md={8}>
                  <Select
                    id="transfer"
                    name="transfer"
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder="Select new owner..."
                    options={players.map((p) => ({ value: p.id, label: p.name }))}
                  />
                </Col>
                <Col md={4}>
                  <Button color="danger" className="btn-block" onClick={() => handleTransferOwnership()}>
                    <i className="uil uil-user-check mr-1"></i>
                    Transfer
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p>What happens when I transfer ownership?</p>
            <ul>
              <li>You will no longer be able to manage this tournament.</li>
              <li>You will still be registered as a player but can opt-out.</li>
              <li>The new owner will have full tournament management rights.</li>
            </ul>
          </Col>
        </Row>

        <div className="border-top mt-4 mb-4" />
        <h4 className="header-title mt-2">End Tournament</h4>

        <Row>
          <Col md={6}>
            <FormGroup>
              <p className="text-muted">
                Please end this tournament once the competition has ended. Competitions must have ended before players
                receive participation credit.
              </p>
              <Button color="danger" onClick={() => handleEndTournament()}>
                <i className="uil uil-times mr-1"></i>
                End Tournament
              </Button>
            </FormGroup>
          </Col>

          <Col md={6}>
            <p>What happens when I end this tournament?</p>
            <ul>
              <li>
                Players can no longer submit scores (please ensure everyone has entered their final results prior to
                ending this tournament).
              </li>
              <li>The leaderboard freezes to reflect its final state.</li>
              <li>Players receive participation credit.</li>
              <li className="text-uppercase">This tournament cannot be re-opened!</li>
            </ul>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default DangerArea;
