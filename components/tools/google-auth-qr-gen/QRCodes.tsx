import useDebounce from 'hooks/use-debounce';
import QRCode, { QRCodeRenderersOptions } from 'qrcode';
import React, { useCallback, useEffect, useRef } from 'react';

import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { OTPData } from './OTPValuesMonaco';

type QRCodesProps = {
  values: OTPData[];
};

const CANVAS_SIZE = 256;
const QR_CODE_OPTIONS: QRCodeRenderersOptions = {
  errorCorrectionLevel: 'H',
  width: CANVAS_SIZE,
  margin: 2,
};

const QRCodes = ({ values }: QRCodesProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const debouncedValues = useDebounce(values, 1000) as OTPData[];
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const title = debouncedValues.length === 0 ? '' : debouncedValues.length === 1 ? t("Your code") : t("Your codes");

  /**
   * Builds an otpauth URI in the [KEY URI Format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) from Google Authenticator
   */
  const buildURI = useCallback((code: OTPData): string => {
    const URL_ = new URL(`otpauth://${code.type.toLowerCase()}/${code.label}`);
    URL_.searchParams.append('secret', encodeURIComponent(code.secret));
    // if (code.issuer) {
    // URL_.searchParams.set('issuer', code.issuer);
    // };
    if (code.algorithm) {
      URL_.searchParams.append('algorithm', code.algorithm);
    }
    if (code.digits) {
      URL_.searchParams.append('digits', String(code.digits));
    }
    if ((code.type === 'totp' || code.type === 'TOTP') && code.period) {
      URL_.searchParams.append('period', String(code.period));
    }
    if ((code.type === 'hotp' || code.type === 'HOTP')) {
      URL_.searchParams.append('counter', String(code.counter));
    }

    return (URL_.toString() + `&issuer=${code.issuer}`);
  }, []);

  const generateQRCode = useCallback((code: OTPData) => {
    try {
      const uri = buildURI(code);
      QRCode.toCanvas(uri, QR_CODE_OPTIONS, (error, canvas) => {
        if (error) throw error;

        const canvasContainer = canvasContainerRef.current;
        if (canvasContainer) {
          canvas.style.width = '100%';
          canvas.style.height = '';
          canvas.style.maxWidth = `${CANVAS_SIZE}px`;
          canvas.style.maxHeight = `${CANVAS_SIZE}px`;
          canvas.style.border = `${theme.spacing(1)}px solid ${theme.palette.background.paper}`;

          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.flexDirection = 'column';
          container.style.gap = '4px';
          const canvasTitle = document.createElement('p');
          canvasTitle.textContent = code.issuer ? `${code.issuer} (${code.label})` : code.label;
          canvasTitle.style.textAlign = 'center';
          canvasTitle.style.margin = '0px';
          canvasTitle.style.maxWidth = `${CANVAS_SIZE}px`;
          canvasTitle.style.lineHeight = '1.25';
          container.appendChild(canvas);
          container.appendChild(canvasTitle);
          canvasContainer.appendChild(container);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'The amount of data is too big to be stored in a QR Code') {
          console.error('Error: Se excedió la capacidad máxima del código QR');
        } else if (error.message === 'No input text') {
          console.error('Error: El QR no tiene contenido');
        }
      } else {
        console.error(error);
      }
    };
  }, [buildURI, theme]);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;
    container.textContent = '';

    debouncedValues.forEach((value) => {
      try {
        generateQRCode(value);
      } catch (error) {
        console.error(error);
      }
    });
  }, [debouncedValues, buildURI, generateQRCode]);

  return (
    <Grid display='flex' justifyContent='center' sx={{ mt: 2, mb: 2 }}>
      <Grid
        sx={debouncedValues.length === 0 ? null : {
          padding: '8px 16px',
          gap: 1,
          border: 'solid 1px #bdbdbd',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {title ? <Typography sx={{ textAlign: 'center', mb: 2 }}>{title}:</Typography> : null}
        <Grid
          ref={canvasContainerRef}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QRCodes;