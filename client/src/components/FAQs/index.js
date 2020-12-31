import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Collapse, NavLink, Row } from 'reactstrap';
import faqImg from '../../assets/images/faq.png';

const Question = ({ question, answer }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Card className="mb-1 shadow-none border">
      <NavLink
        className="text-dark"
        id="group1"
        href="#"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}>
        <CardHeader className="p-1">
          <h5 className="m-0 font-size-16">
            {question}
            {isCollapsed && <i className="uil uil-angle-down float-right accordion-arrow"></i>}
            {!isCollapsed && <i className="uil uil-angle-up float-right accordion-arrow"></i>}
          </h5>
        </CardHeader>
      </NavLink>

      <Collapse isOpen={isCollapsed}>
        <CardBody>{answer}</CardBody>
      </Collapse>
    </Card>
  );
};

const FAQ = () => (
  <>
    <Row className="page-title">
      <Col sm={12} xl={6}>
        <h4 className="mb-1 mt-0">Frequently Asked Questions</h4>
      </Col>
    </Row>
    <Row className="align-items-center">
      <Col>
        <Card>
          <CardBody>
            <Row className="align-items-center">
              <Col xl={2} lg={3}>
                <img src={faqImg} className="mr-4 align-self-center img-fluid" alt="cal" />
              </Col>
              <Col xl={10} lg={9}>
                <div className="mt-4 mt-lg-0">
                  <h5 className="mt-0 mb-1 font-weight-bold">Don't find what you're looking for?</h5>
                  <p className="text-muted mb-2">
                    Our aim is to provide you with answers to the most common questions. If you see something that isn't
                    covered here and would like to suggest a feature, or review our backlog, you are most welcome to do
                    so below.
                  </p>

                  <Button
                    color="primary"
                    className="mt-2 mr-2"
                    href="https://github.com/DanielLarsenNZ/gameon/issues/new">
                    <i className="uil-plus-circle"></i> Suggest Feature
                  </Button>
                  <Button color="white" className="mt-2" href="https://github.com/DanielLarsenNZ/gameon/projects/1">
                    <i className="uil-list-ul"></i> View Backlog
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col sm={12} xl={6}>
        <Card>
          <CardBody>
            <h5 className="header-title mb-3 mt-0">Tournament Administration</h5>
            <p className="sub-header">Related to: Creating, facilitating, and closing tournaments.</p>

            <div id="accordion" className="accordion custom-accordionwitharrow">
              <Question
                question="How do I create a new tournament?"
                answer="It's as simple as selecting the 'Create Tournament' option on the home page. Then just follow the wizard and enter your tournament information."
              />
              <Question
                question="How do I limit the number of players?"
                answer="At this time that is not possible, however you will be able to set a maximum player count during tournament creation very soon."
              />
              <Question
                question="How do I invite others to my tournament?"
                answer="We'd like to make this experience as simple as possible, for now though, you'll need to make sure that these people are inside your organisation. If they are, simply share the link to the given tournament page as it appears in the browser's search bar."
              />
              <Question
                question="How do I update the details of my tournament?"
                answer="For now, you are unable to update details of a tournament after it has been created. We will be shipping this in the next iteration of the app."
              />
              <Question
                question="How can I transfer ownership of a tournament to someone else?"
                answer="Right now this is not possible, however we are working on it!"
              />
              <Question
                question="How do I end a tournament I created?"
                answer="For now, you are unable to end a tournament you have created. Stay tuned for updates soon!"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm={12} xl={6}>
        <Card>
          <CardBody>
            <h5 className="header-title mb-3 mt-0">Playing &amp; Scoring Matches</h5>
            <p className="sub-header">Related to: Scoring games and challenging opponents.</p>

            <div id="accordion" className="accordion custom-accordionwitharrow">
              <Question
                question="How is my ranking calculated?"
                answer="That's a little difficult... we use the ELO Ranking Algorithm to determine your ranking. This ensures any player cannot continually play someone of a lower rank to climb up over time."
              />{' '}
              <Question
                question="How do I submit my score after a match?"
                answer="It's simple! Navigate to the tournament under which you would like to submit scores, then click the 'New Score' button on the leaderboard. Your submission is made in good faith, so no cheating!"
              />
              <Question
                question="Can I challenge another player to a match?"
                answer="No. At this time it is not possible, however, we are working on shipping this feature very soon!"
              />
              <Question
                question="Why can I only enter who won the match (and not my score)?"
                answer="The ranking algorithm does not take scores into consideration, instead it is based on the old ranking of you and your opponent. Therefore, exact scores aren't required but you are most welcome to include them in the optional comment when submitting your results."
              />
              <Question
                question="Can I play against someone from another organisation?"
                answer="No. At this time it is not possible, however, we are working on shipping multi-tenancy in a future iteration of Game On!"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </>
);

/* <div className="row">
        <div className="col-lg-12">
          <div className="header-faq">
            <h5 className="mb-0">{'Quick Questions are answered'}</h5>
          </div>
          <div className="row default-according style-1 faq-accordion" id="accordionoc">
            <div className="col-xl-8 xl-60 col-lg-6 col-md-7">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed pl-0"
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      data-toggle="collapse"
                      data-target="#collapseicon"
                      aria-expanded={isCollapsed}
                      aria-controls="collapseicon">
                      <HelpCircle />
                      {'Integrating WordPress with Your Website?'}
                    </button>
                  </h5>
                </div>
                <Collapse isOpen={isCollapsed}>
                  <div className="card-body">
                    {
                      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
                    }
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */

export default FAQ;
