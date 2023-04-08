
import { loadTranslations } from 'ni18n';
import { locales, ni18nConfig } from 'ni18n.config';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField
} from '@mui/material';
import { OTPData } from './OTPValuesMonaco';

type OTPValuesFormProps = {
  onSubmit: (values: OTPData[]) => void;
};

const OTPValuesForm = ({ onSubmit }: OTPValuesFormProps) => {
  const { t } = useTranslation();

  const [type, setType] = useState<'totp' | 'hotp'>('totp');
  const [label, setLabel] = useState('');
  const [secret, setSecret] = useState('');
  const [issuer, setIssuer] = useState('');
  const [algorithm, setAlgorithm] = useState<OTPData['algorithm']>('SHA1');
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
  } as OTPData), [type, label, secret, issuer, algorithm, digits, counter, period]);

  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit([content]); }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            type='text'
            variant='outlined'
            color='primary'
            label={t("Secret")}
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            type='text'
            variant='outlined'
            color='primary'
            label={t("Label")}
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type='text'
            variant='outlined'
            color='primary'
            label={t("Issuer")}
            value={issuer}
            onChange={(event) => setIssuer(event.target.value)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type='number'
            variant='outlined'
            color='primary'
            label={t("Digits")}
            value={digits}
            onChange={(event) => setDigits(Number(event.target.value))}
            sx={{ width: '100%' }}
          />
        </Grid>
        {type === 'hotp' ? (
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              required
              type='number'
              variant='outlined'
              color='primary'
              label={t("Counter")}
              value={counter}
              onChange={(event) => setCounter(Number(event.target.value))}
              sx={{ width: '100%' }}
            />
          </Grid>
        ) : null}
        {type === 'totp' ? (
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type='number'
              variant='outlined'
              color='primary'
              label={t("Period")}
              value={period}
              onChange={(event) => setPeriod(Number(event.target.value))}
              sx={{ width: '100%' }}
            />
          </Grid>
        ) : null}
        <Grid item xs={12} sm={6} md={4}>
          <FormGroup sx={{ width: '100%' }}>
            <FormLabel>{t("Type")}</FormLabel>
            <RadioGroup row value={type} onChange={(event) => setType(event.target.value as 'totp' | 'hotp')}>
              <FormControlLabel value='totp' label='TOTP' control={<Radio />} />
              <FormControlLabel value='hotp' label='HOTP' control={<Radio />} />
            </RadioGroup>
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormGroup sx={{ width: '100%' }}>
            <FormLabel>{t("Algorithm")}</FormLabel>
            <RadioGroup row value={algorithm} onChange={(e) => setAlgorithm(e.target.value as OTPData['algorithm'])}>
              <FormControlLabel value='SHA1' label='SHA1' control={<Radio />} />
              <FormControlLabel value='SHA256' label='SHA256' control={<Radio />} />
              <FormControlLabel value='SHA512' label='SHA512' control={<Radio />} />
            </RadioGroup>
          </FormGroup>
        </Grid>
        <Grid item>
          <Button
            type='submit'
            variant='outlined'
            color='primary'
          // onClick={(event) => { event.preventDefault(); onSubmit([content]); }}
          >
            {t("Generate")}
          </Button>
        </Grid>
      </Grid>
    </form>
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