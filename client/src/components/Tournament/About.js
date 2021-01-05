import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody } from 'reactstrap';

const About = ({
  description,
  reward,
  rulesURL,
  startDate,
  endDate,
  location,
  timeOfPlay,
  maxPlayers,
  playerCount,
}) => {
  const { t } = useTranslation('common');
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Card>
      <CardBody>
        <h6 className="mt-0 header-title">{t('tournament.about_this_tournament')}</h6>

        <div className="text-muted mt-3">
          <Section title="Description">{description}</Section>
          <Section title={t('tournament.rules')}>
            <a href={rulesURL} target="_blank" rel="noreferrer">
              {rulesURL}
            </a>
          </Section>
          <Section title="Reward">{reward}</Section>
          {maxPlayers && (
            <Section title="Maximum Players">
              This tournament is limited to {maxPlayers} players. There are {maxPlayers - playerCount} spots left.
              Please contact the tournament owner for more information.
            </Section>
          )}

          {/* Key Details */}
          <div className="row">
            <Detail title="Start Date" iconClass="uil-calender">
              {/* TODO: Start Date should default to date of tournament creation unless defined in the future. */}
              {startDate ? startDate.toLocaleDateString(undefined, dateOptions) : 'A while ago...'}
            </Detail>
            <Detail title="End Date" iconClass="uil-calendar-slash">
              {endDate ? endDate.toLocaleDateString(undefined, dateOptions) : 'Ongoing'}
            </Detail>
            <Detail title="When" iconClass="uil-clock">
              {timeOfPlay}
            </Detail>
            <Detail title="Location" iconClass="uil-location-pin-alt">
              {location}
            </Detail>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const Section = ({ title, children }) => (
  <>
    <h6 className="mt-0 header-subtitle">{title}</h6>
    <p>{children}</p>
  </>
);

const Detail = ({ title, iconClass, children }) => (
  <div className="col-lg-3 col-md-6">
    <div className="mt-4">
      <p className="mb-2">
        <i className={`${iconClass} text-danger`}></i> {title}
      </p>
      <h5 className="font-size-16">{children}</h5>
    </div>
  </div>
);

export default About;
