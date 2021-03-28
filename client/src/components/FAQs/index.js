import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const FAQ = () => {
  const { t } = useTranslation('faq');

  return (
    <>
      <Row className="page-title">
        <Col sm={12} xl={6}>
          <h4 className="mb-1 mt-0">{t('page_title')}</h4>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col>
          <Card>
            <CardBody>
              <Row className="align-items-center">
                <Col xl={2} lg={3} sm={4} className="d-none d-sm-block">
                  <img src={faqImg} className="mr-4 align-self-center img-fluid" alt="cal" />
                </Col>
                <Col xl={10} lg={9} sm={8}>
                  <div className="mt-4 mt-lg-0">
                    <h5 className="mt-0 mb-1 font-weight-bold">{t('banner.title')}</h5>
                    <p className="text-muted mb-2">{t('banner.description')}</p>

                    <Button
                      color="primary"
                      className="mt-2 mr-2"
                      href="https://github.com/DanielLarsenNZ/gameon/issues/new">
                      <i className="uil-plus-circle"></i> {t('banner.suggest_feature')}
                    </Button>
                    <Button color="white" className="mt-2" href="https://github.com/DanielLarsenNZ/gameon/projects/1">
                      <i className="uil-list-ul"></i> {t('banner.view_backlog')}
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
              <h5 className="header-title mb-3 mt-0">{t('tournament.header')}</h5>
              <p className="sub-header">{t('tournament.sub_heading')}</p>

              <div id="accordion" className="accordion custom-accordionwitharrow">
                <Question
                  question={t('tournament.how_to_create.question')}
                  answer={t('tournament.how_to_create.answer')}
                />
                <Question
                  question={t('tournament.how_to_limit_players.question')}
                  answer={t('tournament.how_to_limit_players.answer')}
                />
                <Question
                  question={t('tournament.how_to_invite_players.question')}
                  answer={t('tournament.how_to_invite_players.answer')}
                />
                <Question
                  question={t('tournament.how_to_update_details.question')}
                  answer={t('tournament.how_to_update_details.answer')}
                />
                <Question
                  question={t('tournament.how_to_transfer_ownership.question')}
                  answer={t('tournament.how_to_transfer_ownership.answer')}
                />
                <Question
                  question={t('tournament.how_to_end_tournament.question')}
                  answer={t('tournament.how_to_end_tournament.answer')}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} xl={6}>
          <Card>
            <CardBody>
              <h5 className="header-title mb-3 mt-0">{t('playing.header')}</h5>
              <p className="sub-header">{t('playing.sub_heading')}</p>

              <div id="accordion" className="accordion custom-accordionwitharrow">
                <Question
                  question={t('playing.how_is_my_rank_calculated.question')}
                  answer={t('playing.how_is_my_rank_calculated.answer')}
                />
                <Question
                  question={t('playing.how_to_submit_score.question')}
                  answer={t('playing.how_to_submit_score.answer')}
                />
                <Question
                  question={t('playing.how_to_challenge_players.question')}
                  answer={t('playing.how_to_challenge_players.answer')}
                />
                <Question
                  question={t('playing.why_only_submit_an_outcome.question')}
                  answer={t('playing.why_only_submit_an_outcome.answer')}
                />
                <Question
                  question={t('playing.how_to_play_against_external_players.question')}
                  answer={t('playing.how_to_play_against_external_players.answer')}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

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
