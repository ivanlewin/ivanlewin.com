
import { loadTranslations } from 'ni18n';
import { locales, ni18nConfig } from 'ni18n.config';
import { QRCodeContent } from 'pages/tools/google-auth-qr-gen';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Box, Button, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField,
} from '@mui/material';

type OTPValuesFormProps = {
    onSubmit: (values: QRCodeContent[]) => void;
};

const OTPValuesForm = ({ onSubmit }: OTPValuesFormProps) => {
    const { t } = useTranslation();

    const [type, setType] = useState<QRCodeContent['type']>('totp');
    const [label, setLabel] = useState('');
    const [secret, setSecret] = useState('');
    const [issuer, setIssuer] = useState('');
    const [algorithm, setAlgorithm] = useState<QRCodeContent['algorithm']>('SHA1');
    const [digits, setDigits] = useState(6);
    const [counter, setCounter] = useState(0);
    const [period, setPeriod] = useState(30);

    const content = useMemo(() => ({
        type,
        label,
        secret,
        issuer,
        algorithm,
        digits,
        counter,
        period,
    }), [type, label, secret, issuer, algorithm, digits, counter, period]);

    return (
        <Grid>
            <Grid>
                <form>
                    <Box>
                        <TextField
                            type='text'
                            variant='outlined'
                            color='primary'
                            label={t('Label')}
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                        <TextField
                            type='text'
                            variant='outlined'
                            color='primary'
                            label={t('Issuer')}
                            value={issuer}
                            onChange={(e) => setIssuer(e.target.value)}
                        />
                        <TextField
                            required
                            type='text'
                            variant='outlined'
                            color='primary'
                            label={t('Secret')}
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                        />
                        <TextField
                            type='number'
                            variant='outlined'
                            color='primary'
                            label={t('Digits')}
                            value={digits}
                            onChange={(e) => setDigits(Number(e.target.value))}
                        />
                        <TextField
                            required={type === 'hotp'}
                            type='number'
                            variant='outlined'
                            color='primary'
                            label={t('Counter')}
                            value={counter}
                            onChange={(e) => setCounter(Number(e.target.value))}
                        />
                        <TextField
                            type='number'
                            variant='outlined'
                            color='primary'
                            label={t('Period')}
                            value={period}
                            onChange={(e) => setPeriod(Number(e.target.value))}
                        />
                        <FormGroup>
                            <FormLabel>{t('Type')}</FormLabel>
                            <RadioGroup row value={type} onChange={(e) => setType(e.target.value as QRCodeContent['type'])}>
                                <FormControlLabel value='totp' label='TOTP' control={<Radio />} />
                                <FormControlLabel value='hotp' label='HOTP' control={<Radio />} />
                            </RadioGroup>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>{t('Algorithm')}</FormLabel>
                            <RadioGroup row value={algorithm} onChange={(e) => setAlgorithm(e.target.value as QRCodeContent['algorithm'])}>
                                <FormControlLabel value='SHA1' label='SHA1' control={<Radio />} />
                                <FormControlLabel value='SHA256' label='SHA256' control={<Radio />} />
                                <FormControlLabel value='SHA512' label='SHA512' control={<Radio />} />
                            </RadioGroup>
                        </FormGroup>
                        <Button
                            type='submit'
                            variant='outlined'
                            color='primary'
                            onClick={(event) => { event.preventDefault(); onSubmit([content]); }}
                        >
                            {t('Generate')}
                        </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

export default OTPValuesForm;

export const getStaticProps = async (props: { locale: locales; }) => {
    return {
        props: {
            ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
        },
    };
};