import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { ComingSoon } from '../../../routes/Error';
import DangerArea from './DangerArea';
import Details from './Details';

const EditTournament = () => {
  const { t } = useTranslation('tournament');

  const DEFAULT_ACTIVE_TAB = 'details';

  const { active_tab } = useParams();
  const history = useHistory();

  const tabs = {
    details: {
      title: t('manage.tabs.details'),
      content: <Details />,
    },
    players: {
      title: t('manage.tabs.players'),
      isLocked: true,
      content: <ComingSoon isHorizonal />,
    },
    scores: {
      title: t('manage.tabs.scores'),
      isLocked: true,
      content: <ComingSoon isHorizonal />,
    },
    notifications: {
      title: t('manage.tabs.notifications'),
      isLocked: true,
      content: <ComingSoon isHorizonal />,
    },
    danger: {
      title: t('manage.tabs.danger'),
      content: <DangerArea />,
    },
  };

  useEffect(() => {
    if (!active_tab) {
      history.push(`manage/${DEFAULT_ACTIVE_TAB}`);
    }
  }, [active_tab, history]);

  const toggle = (tab) => {
    if (active_tab !== tab) {
      history.push(`${tab}`);
    }
  };

  return (
    <>
      <Row className="page-title">
        <Col md={12}>
          <h4 className="mb-1 mt-0">{t('manage.title')}</h4>
        </Col>
      </Row>

      <Row>
        <Col lg={3}>
          <Card>
            <CardBody>Tournament Information</CardBody>
          </Card>
        </Col>

        <Col lg={9}>
          <Card>
            <CardBody>
              <Nav className="nav nav-pills navtab-bg nav-justified">
                {Object.entries(tabs).map((tab) => (
                  <NavItem key={tab[0]}>
                    <NavLink
                      className={active_tab === tab[0] ? 'active' : ''}
                      onClick={() => {
                        toggle(tab[0]);
                      }}
                      role="button">
                      {tab[1].isLocked && <i className="uil uil-lock mr-1"></i>}
                      {tab[1].title}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
              <TabContent activeTab={active_tab}>
                {Object.entries(tabs).map((tab) => (
                  <TabPane key={tab[0]} tabId={tab[0]}>
                    {tab[1].content}
                  </TabPane>
                ))}
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditTournament;
