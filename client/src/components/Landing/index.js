import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import Loader from '../Loader';

const Landing = ({ loading }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="">
        {/* Loader */}
        {loading && <Loader />}

        <Row className="page-title">
          <Col md={3} xl={6}>
            <h4 className="mb-1 mt-0">{t('landing.title')}</h4>
          </Col>
          <Col md={9} xl={6} className="text-md-right">
            <div className="mt-4 mt-md-0">
              <button type="button" className="btn btn-danger mr-4 mb-3  mb-sm-0">
                <i className="uil-plus mr-1"></i> {t('landing.new_tournament')}
              </button>
              <div className="btn-group mb-3 mb-sm-0">
                <button type="button" className="btn btn-primary">
                  {t('landing.filter_all')}
                </button>
              </div>
              <div className="btn-group ml-1">
                <button type="button" className="btn btn-white">
                  {t('landing.filter_ongoing')}
                </button>
                <button type="button" className="btn btn-white">
                  {t('landing.filter_finished')}
                </button>
              </div>
              <div className="btn-group ml-2 d-none d-sm-inline-block">
                <button type="button" className="btn btn-primary btn-sm">
                  <i className="uil uil-apps"></i>
                </button>
              </div>
              <div className="btn-group d-none d-sm-inline-block ml-1">
                <button type="button" className="btn btn-white btn-sm">
                  <i className="uil uil-align-left-justify"></i>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Landing;
