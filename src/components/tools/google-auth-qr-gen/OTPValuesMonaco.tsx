import { loadTranslations } from 'ni18n';
import { locales, ni18nConfig } from 'ni18n.config';
import { z } from 'zod';

import Editor, { EditorProps } from '@monaco-editor/react';
import { useTheme } from '@mui/material';

const hotpDataSchema = z.object({
  type: z.union([z.literal('hotp'), z.literal('HOTP')]),
  counter: z.number(),
});

const totpDataSchema = z.object({
  type: z.union([z.literal('totp'), z.literal('TOTP')]),
  period: z.number().optional()
});

const baseOTPDataSchema = z.object({
  label: z.string(),
  secret: z.string(),
  issuer: z.string().optional(),
  algorithm: z.union([z.literal('SHA1'), z.literal('SHA256'), z.literal('SHA512')]).optional(),
  digits: z.union([z.literal(6), z.literal(8)]).optional(),
});

const otpDataSchema = z.union([
  baseOTPDataSchema.merge(hotpDataSchema),
  baseOTPDataSchema.merge(totpDataSchema)
]);

export type OTPData = z.infer<typeof otpDataSchema>;

type OTPValuesMonacoProps = {
  onSubmit: (values: OTPData[]) => void;
};

const OTPValuesMonaco = ({ onSubmit }: OTPValuesMonacoProps) => {
  const theme = useTheme();

  const handleOnChange: EditorProps['onChange'] = (value) => {
    let otpData = [] as OTPData[];
    if (value) {
      const parsed = otpDataSchema.safeParse(JSON.parse(value));
      if (parsed.success) {
        otpData = [parsed.data];
      } else {
        const parsed = z.array(otpDataSchema).safeParse(JSON.parse(value));
        if (parsed.success) {
          otpData = parsed.data;
        }
      }
    }
    onSubmit(otpData);
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