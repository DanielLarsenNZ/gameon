import React from 'react';
import { ArrowLeft, ChevronDown, Edit, XOctagon } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Badge, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from 'reactstrap';
import { useAPI } from '../../helpers/useApi';
import useCopyToClipboard from '../../helpers/useCopyToClipboard';
import { useProfile } from '../App/Profile';
import Loader from '../Loader';
import About from './About';
import AdminStats from './AdminStats';
import Leaderboard from './Leaderboard';

const Tournament = () => {
  const { id } = useParams();
  const { t } = useTranslation('tournament');
  const { handleCopy } = useCopyToClipboard();

  const { data: tournament, status, error } = useAPI(`/tournaments/${id}`);

  // FIXME: Fix fragile statement
  const { me } = useProfile();
  const hasUserJoined = tournament?.players?.some((player) => player.id === me?.id);
  const userIsOwner = tournament?.owner?.id !== undefined && tournament?.owner?.id === me?.id; // TODO: Without 'undefined' check it be true for a brief second as both are fetching so: null === null
  const isFull = tournament.maxPlayers ? tournament.maxPlayers <= tournament.players.length : false;

  return (
    <>
      {status === 'fetching' && <Loader />}
      {error && (
        <>
          There was an error: <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
      {tournament && (
        <>
          <Row className="page-title">
            <Col sm={8} xl={6}>
              {/* <span */}
              <h4 className="mb-1 mt-0">
                <span className="mr-4 text-muted d-none d-sm-inline-block">
                  <Link to="/" className="text-dark">
                    <ArrowLeft />
                  </Link>
                </span>
                {tournament.name}{' '}
                {isFull && (
                  <Badge color="soft-primary" className="ml-2">
                    <i className="uil uil-lock-alt mr-1"></i>
                    {t('about.isFull')}
                  </Badge>
                )}
              </h4>
            </Col>
            <Col sm={4} xl={6} className="text-md-right">
              {/* Players can quit, owner can't */}
              {hasUserJoined && !userIsOwner && (
                <div className="btn-group ml-1 d-none d-sm-inline-block">
                  <button type="button" className="btn btn-soft-danger btn-sm">
                    <i className="uil uil-exit mr-1"></i>
                    {t('tournament.exit_tournament')}
                  </button>
                </div>
              )}

              {/* New users can join */}
              {!hasUserJoined && !isFull && (
                <button type="button" className="btn btn-danger mb-3 mb-sm-0">
                  <i className="uil-user-plus mr-1"></i> {t('actions.join')}
                </button>
              )}

              <button
                type="button"
                className={`btn btn-info ml-2 mb-3 mb-sm-0 ${userIsOwner ? 'btn-sm' : null}`}
                onClick={() => handleCopy(window.location.href.split('#')[0].split('?')[0])}>
                <i className="uil-share-alt mr-1"></i> {t('actions.share')}
              </button>

              {/* Owner Actions */}
              {userIsOwner && (
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="soft-danger" className="dropdown-toggle ml-2 btn-sm">
                    <i className="uil uil-cog mr-1"></i>
                    {t('actions.admin.button')}
                    <i className="icon ml-1">
                      <ChevronDown />
                    </i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to={`${id}/manage`} className="text-dark">
                      <DropdownItem>
                        <Edit className="icon-dual icon-xs mr-2"></Edit>
                        <span>{t('actions.admin.edit')}</span>
                      </DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link to={`${id}/manage/end`} className="text-dark">
                      <DropdownItem className="text-danger">
                        <XOctagon className="icon-xs mr-2"></XOctagon>
                        <span>{t('actions.admin.end')}</span>
                      </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              )}
            </Col>
          </Row>
          <AdminStats players={tournament?.playerCount} games={89} last7={14} last30={53} />
          <Row>
            <Col xl={4}>
              {/* <ChallengeWidget name="Erik Employee" endDate="02 February" /> */}
              <Leaderboard players={tournament?.players} canSubmitScore={hasUserJoined} />
            </Col>
            <Col xl={8}>
              <About
                description={tournament.description}
                reward={tournament.playingFor}
                rulesURL={tournament.rulesURL}
                startDate={tournament.startDate && new Date(tournament.startDate)}
                endDate={tournament.endDate && new Date(tournament.endDate)}
                location={tournament.location}
                timeOfPlay={tournament.timeOfPlayDescription}
                maxPlayers={tournament.maxPlayers}
                playerCount={tournament.playerCount}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Tournament;
