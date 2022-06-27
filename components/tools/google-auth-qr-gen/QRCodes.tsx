import { useDebounce } from 'hooks/use-debounce';
import { QRCodeContent } from 'pages/tools/google-auth-qr-gen';
import QRCode, { QRCodeRenderersOptions } from 'qrcode';
import { useCallback, useEffect, useRef } from 'react';

import { Grid, useTheme } from '@mui/material';

type QRCodesProps = {
    values: QRCodeContent[];
};

const CANVAS_SIZE = 256;
const QR_CODE_OPTIONS: QRCodeRenderersOptions = {
    errorCorrectionLevel: 'H',
    width: CANVAS_SIZE,
    margin: 2,
};

const QRCodes = ({ values }: QRCodesProps) => {
    const debouncedValues = useDebounce(values, 1000) as QRCodeContent[];
    const theme = useTheme();
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    const generateQRCode = useCallback((content: string) => {
        try {
            QRCode.toCanvas(content, QR_CODE_OPTIONS, (error, canvas) => {
                if (error) throw error;

                const canvasContainer = canvasContainerRef.current;
                if (canvasContainer) {
                    canvas.style.width = '100%';
                    canvas.style.height = '';
                    canvas.style.maxWidth = `${CANVAS_SIZE}px`;
                    canvas.style.maxHeight = `${CANVAS_SIZE}px`;
                    canvas.style.border = `${theme.spacing(1)}px solid ${theme.palette.background.paper}`;
                    canvasContainer.appendChild(canvas);
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
    }, [canvasContainerRef, theme]);

    const buildURI = useCallback((code: QRCodeContent): string => {
        if (!code.secret) throw new Error('Secret is required');
        if (code.type === 'hotp' && code.counter === undefined) throw new Error('Counter is required for type HOTP');

        const label = code.issuer && code.label ? `${encodeURIComponent(code.issuer)}:${encodeURIComponent(code.label)}` : '';

        const URL_ = new URL(`otpauth://${code.type}/${label}`);
        URL_.searchParams.append('secret', encodeURIComponent(code.secret));
        URL_.searchParams.append('issuer', encodeURIComponent(code.issuer));
        URL_.searchParams.append('algorithm', code.algorithm);
        URL_.searchParams.append('digits', String(code.digits));
        if (code.type === 'hotp') URL_.searchParams.append('counter', String(code.counter));
        URL_.searchParams.append('period', String(code.period));

        return URL_.toString();
    }, []);

    useEffect(() => {
        const container = canvasContainerRef.current;
        if (!container) return;
        container.textContent = '';

        debouncedValues.forEach((value) => {
            try {
                const uri = buildURI(value);
                generateQRCode(uri);
            } catch (error) {
                console.error(error);
            }
        });
    }, [debouncedValues, buildURI, generateQRCode]);

    return (
        <Grid ref={canvasContainerRef}></Grid>
    );
};

export default QRCodes;