import TabPanel from 'components/Tabs/TabPanel';
import OTPValuesForm from 'components/tools/google-auth-qr-gen/OTPValuesForm';
import OTPValuesMonaco, { OTPData } from 'components/tools/google-auth-qr-gen/OTPValuesMonaco';
import QRCodes from 'components/tools/google-auth-qr-gen/QRCodes';
import Head from 'next/head';
import { loadTranslations } from 'ni18n';
import { locales, ni18nConfig } from 'ni18n.config';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Tab, Tabs, TabsProps } from '@mui/material';

import type { NextPage } from 'next';
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const OTPQRs: NextPage = () => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange: TabsProps['onChange'] = (_, newValue) => {
    setSelectedTab(newValue);
  };
  const [OTPValues, setOTPValues] = useState<OTPData[]>([]);

  return (
    <Grid
      component='main'
      sx={{ p: 2 }}
    >
      <Head>
        <title>OTP QR code Generator</title>
        <meta name='description' content={t("Site description")} />
      </Head>
      <h1>OTP QR code Generator</h1>
      <p>
        Most OTP authenticator apps generally have two methods for adding OTP codes: entering the details manually or by scanning a QR code. I found myself needing to migrate from one authenticator app to another that didn&apos;t have support for importing OTP codes, so I needed need to re-configure all my codes one by one. I could have spent the time to enter details manually (or maybe even with some automation, like AutoHotkey), but I had the idea to re-generate QR codes for all my OTP secrets. I couldn&apos;t find a tool that did just that, so I built this one.
      </p>
      <p>
        This form generates QR codes that contain a URI with an OTP key, ready to be scanned in most authenticator apps. The URIs follow the <a href='https://github.com/google/google-authenticator/wiki/Key-Uri-Format'>Google Authenticator Key URI Format</a> and should work with any app, as they are somewhat standard.
        You can input the details of your codes one by one into the form or you can paste a JSON file with the schema defined below (recommended if you are generating more than a few codes).
        A QR code will appear, ready to be scanned using your favorite authenticator app.
      </p>
      <Grid sx={{ width: '100%' }}>
        <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label='basic tabs example'>
            <Tab label='Form' {...a11yProps(0)} />
            <Tab label='JSON' {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <TabPanel value={selectedTab} index={0}>
          <OTPValuesForm onSubmit={(values) => setOTPValues(values)} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <OTPValuesMonaco onSubmit={(values) => setOTPValues(values)} />
        </TabPanel>
      </Grid>
      <QRCodes values={OTPValues} />
    </Grid >
  );
};

export default OTPQRs;

export const getStaticProps = async (props: { locale: locales; }) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
    },
  };
};