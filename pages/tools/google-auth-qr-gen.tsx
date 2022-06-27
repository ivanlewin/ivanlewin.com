import TabPanel from 'components/Tabs/TabPanel';
import OTPValuesForm from 'components/tools/google-auth-qr-gen/OTPValuesForm';
import OTPValuesMonaco from 'components/tools/google-auth-qr-gen/OTPValuesMonaco';
import QRCodes from 'components/tools/google-auth-qr-gen/QRCodes';
import Head from 'next/head';
import { loadTranslations } from 'ni18n';
import { locales, ni18nConfig } from 'ni18n.config';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Tab, Tabs, TabsProps } from '@mui/material';

import type { NextPage } from 'next';
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export type QRCodeContent = {
    type: 'hotp' | 'totp',
    label: string,
    secret: string,
    issuer: string,
    algorithm: 'SHA1' | 'SHA256' | 'SHA512',
    digits: number,
    counter: number,
    period: number,
};

const TOTPQRs: NextPage = () => {
    const { t } = useTranslation();

    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange: TabsProps['onChange'] = (_, newValue) => {
        setSelectedTab(newValue);
    };
    const [OTPValues, setOTPValues] = useState<QRCodeContent[]>([]);

    return (
        <Box component='main'>
            <Head>
                <title>Google Authenticator QR Code Generator</title>
                <meta name='description' content={t('Site description')} />
            </Head>
            <h1>Google Authenticator QR Code Generator</h1>
            <p>The <a href='https://support.google.com/accounts/answer/1066447?ref_topic=2954345'>Google Authenticator app</a> has two methods for adding OTP codes:
                entering the details manually and scanning a QR Code. The first option can become tedious when you need to import a large number of codes into the app,
                so I made this tool.</p>
            <p> You can input the details of your codes via a form or by pasting a JSON array of objects and it will generate QR Codes
                that can be scanned using Google&apos;s app for a faster import process.</p>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={selectedTab} onChange={handleTabChange} aria-label='basic tabs example'>
                        <Tab label='Form' {...a11yProps(0)} />
                        <Tab label='JSON' {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={selectedTab} index={0}>
                    <OTPValuesForm onSubmit={(values) => setOTPValues(values)} />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <OTPValuesMonaco onSubmit={(values) => setOTPValues(values)} />
                </TabPanel>
            </Box>
            <QRCodes values={OTPValues} />
        </Box>
    );
};

export default TOTPQRs;

export const getStaticProps = async (props: { locale: locales; }) => {
    return {
        props: {
            ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
        },
    };
};