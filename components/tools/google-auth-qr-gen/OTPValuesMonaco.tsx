import { useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { EditorProps } from '@monaco-editor/react';
import { QRCodeContent } from 'pages/tools/google-auth-qr-gen';
import { loadTranslations } from 'ni18n';
import { locales, ni18nConfig } from 'ni18n.config';

const Editor = dynamic<EditorProps>(
    () => import('@monaco-editor/react'),
    { ssr: false },
);

type OTPValuesMonacoProps = {
    onSubmit: (values: QRCodeContent[]) => void;
};

const OTPValuesMonaco = ({ onSubmit }: OTPValuesMonacoProps) => {
    const theme = useTheme();

    const validateEntry = (entry: any) => {
        if (typeof entry !== 'object' || entry === null) return false;
        if (typeof entry.type !== 'string' || !['hotp', 'totp'].includes(entry.type)) return false;
        if (typeof entry.label !== 'string' || entry.label.length === 0) return false;
        if (typeof entry.secret !== 'string' || entry.secret.length === 0) return false;
        if (typeof entry.issuer !== 'string' || entry.issuer.length === 0) return false;

        //  'SHA1' | 'SHA256' | 'SHA512' | undefined
        if (entry.algorithm !== undefined) {
            if (typeof entry.algorithm !== 'string' || !['SHA1', 'SHA256', 'SHA512'].includes(entry.algorithm)) {
                return false;
            }
        }
        //  6 | 8 | undefined
        if (entry.digits !== undefined) {
            if (typeof entry.digits !== 'number' || ![6, 8].includes(entry.digits)) {
                return false;
            }
        }


        if (entry.type === 'hotp' && typeof entry.counter !== 'number') return false;
        if (typeof entry.period !== 'number') return false;

        return true;
    };

    const handleOnChange: EditorProps['onChange'] = (value) => {
        try {
            if (!value) return;
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed)) return;
            const values = parsed as unknown[];
            const valid = values.filter(validateEntry) as QRCodeContent[];
            onSubmit(valid);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Editor
            height='25vh'
            language='json'
            theme={theme.palette.mode === 'dark' ? 'vs-dark' : 'light'}
            onChange={handleOnChange}
        />
    );
};

export default OTPValuesMonaco;

export const getStaticProps = async (props: { locale: locales; }) => {
    return {
        props: {
            ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
        },
    };
};