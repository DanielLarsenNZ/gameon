import { AppConfigurationClient } from '@azure/app-configuration';
import { useMemo, useState } from 'react';

const client = new AppConfigurationClient(process.env.APP_CONFIG_CONNECTION_STRING);

/**
 * Retrieves the specified feature flag from Azure App Configuration.
 * @param {string} flagKey App Config Feature Flag key
 * @returns the feature flag for the specified key
 */
const useFeatureFlag = (flagKey = '') => {
  const [enabled, setEnabled] = useState(false);

  useMemo(async () => {
    if (!flagKey || !flagKey.toString().trim().length) {
      console.error('A feature flag key must be supplied.');
    } else {
      try {
        const result = await client.getConfigurationSetting({
          key: `.appconfig.featureflag/${flagKey.toString().trim()}`,
        });
        if (result && typeof result === 'object') {
          console.info(result);
          console.debug('Feature: ' + JSON.parse(result.value).id, JSON.parse(result.value).enabled);
          setEnabled(JSON.parse(result.value).enabled);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [flagKey]);

  return { enabled };
};

/**
 * Retrieves the specified configuration from Azure App Configuration.
 * @param {string} configKey App Config Key
 * @returns the configuration for the specified key
 */
const useConfiguration = (configKey = '') => {
  const [config, setConfig] = useState('');

  useMemo(async () => {
    if (!configKey || !configKey.toString().trim().length) {
      console.error('A config key must be supplied.');
    } else {
      try {
        const result = await client.getConfigurationSetting({ key: configKey.toString().trim() });
        if (result) {
          console.debug('Config: ' + result.key, result.value);
          setConfig(result.value);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [configKey]);

  return { config };
};

export { useFeatureFlag, useConfiguration };
