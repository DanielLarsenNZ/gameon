import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody } from 'reactstrap';

const About = ({
  description,
  reward,
  rulesURL,
  startDate = new Date(),
  endDate,
  location,
  timeOfPlay,
  maxPlayers,
  playerCount,
}) => {
  const { t } = useTranslation('tournament');
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <Card>
      <CardBody>
        <h6 className="mt-0 header-title">{t('about.title')}</h6>

        <div className="text-muted mt-3">
          {/* Description */}
          <Section title={t('about.description.title')}>{description || t('about.description.default_msg')}</Section>

          {/* Rules */}
          <Section title={t('about.rules.title')}>
            <a href={rulesURL} target="_blank" rel="noreferrer">
              {rulesURL || t('about.rules.default_msg')}
            </a>
          </Section>

          {/* Reward */}
          {reward && <Section title={t('about.reward')}>{reward}</Section>}

          {/* Maximum Players */}
          {maxPlayers && (
            <Section title={t('about.max_players.title')}>
              {t('about.max_players.limit_info', {
                count: maxPlayers - playerCount,
                spotsLeft: maxPlayers - playerCount,
                maxPlayers,
              })}
            </Section>
          )}

          {/* Key Details */}
          <div className="row">
            <Detail title={t('about.start_date')} iconClass="uil-calender">
              {/* TODO: Start Date should default to date of tournament creation unless defined in the future. */}
              {startDate ? startDate.toLocaleDateString(startDate, dateOptions) : 'Recently'}
            </Detail>
            <Detail title={t('about.end_date')} iconClass="uil-calendar-slash">
              {endDate ? endDate.toLocaleDateString(endDate, dateOptions) : 'Ongoing'}
            </Detail>
            <Detail title={t('about.timing')} iconClass="uil-clock">
              {timeOfPlay || 'Anytime'}
            </Detail>
            <Detail title={t('about.location')} iconClass="uil-location-pin-alt">
              {location || 'Anywhere'}
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
