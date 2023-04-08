import type { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { loadTranslations } from 'ni18n';
import { locales, ni18nConfig } from '../../ni18n.config';
import Link from 'next/link';


const Tools: NextPage = () => {
    const { t } = useTranslation();

    const pages = [
        {
            title: 'Google Authenticator QR Code Generator',
            url: 'google-auth-qr-gen'
        }
    ];

    return (
        <div>
            <Head>
                <title>Tools</title>
                <meta name='description' content={t("Site description")} />
            </Head>
            <main>
                <h1>Tools</h1>
                <h2>This is a collection of tools I made to solve different tasks. Of course, if I had done them manually, I wouldn&apos;t have wasted so much time.</h2>
                <ul>
                    {pages.map(page => (
                        <Link href={`/tools/${page.url}`} key={page.url}>
                            <a>{page.title}</a>
                        </Link>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default Tools;

export const getStaticProps = async (props: { locale: locales; }) => {
    return {
        props: {
            ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
        },
    };
};