import { InteractionStatus } from '@azure/msal-browser';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import useCopyToClipboard from '../../helpers/useCopyToClipboard';

const { REACT_APP_AAD_CLIENT_ID } = process.env;

const DevToken = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [data, setData] = useState(null);

  const { handleCopy } = useCopyToClipboard();

  const formatResponse = (response) => {
    return {
      access_token: response.accessToken,
      expires_on: response.expiresOn,
      name: response.account.name,
      tenantId: response.account.tenantId,
      username: response.account.username,
      scopes: response.scopes,
    };
  };

  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: [`${REACT_APP_AAD_CLIENT_ID}/Users`],
          account: account,
        })
        .then((response) => {
          if (response) {
            setData(formatResponse(response));
          }
        })
        .catch(function (error) {
          // TODO: Acquire token silent failure, and send an interactive request
          console.log(error);
          if (error.errorMessage.indexOf('interaction_required') !== -1) {
            instance.acquireTokenRedirect({
              scopes: ['api://GameOn.Api/Users'],
              account: account,
            });
          }
        });
    }
  }, [account, instance]);

  return (
    <>
      <Row className="page-title">
        <Col md={3} xl={6}>
          <h4 className="mb-1 mt-0">Developer Access Token</h4>
        </Col>
      </Row>

      <AuthenticatedTemplate>
        <Row>
          <Col>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Col>
        </Row>
        {data && <Button onClick={() => handleCopy(data.access_token)}>Copy Access Token</Button>}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Row>
          <Col md={3} xl={6}>
            <p className="mb-1 mt-0">Please sign in to view access token</p>
          </Col>
        </Row>
        <Button onClick={() => instance.loginRedirect()} disabled={inProgress === InteractionStatus.Login}>
          Sign In
        </Button>
      </UnauthenticatedTemplate>
    </>
  );
};

export default DevToken;
