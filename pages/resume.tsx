/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '/styles/Resume.module.css';
import { useTranslation } from "react-i18next";

const Resume: NextPage = () => {

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Iván Lewin • ${t('Resume')}`}</title>
      </Head>

      <h1>Iván Lewin</h1>
      <h2>{t('Job title')}</h2>

      <section>
        <h3>{t('resume.personalInformation.title')}</h3>
        <p>{t('resume.personalInformation.location.title')} Buenos Aires, Argentina</p>
      </section>

      <section>
        <h3>{t('Experience')}</h3>
        <ul>
          <li>
            <div>
              <h4>{`${t('jobExperience.smartSafety.position')} ${t('jobExperience.at')} Smart Safety`}</h4>
              <h5>{t('jobExperience.smartSafety.time period')}</h5>
              <ul>
                <li>{t('jobExperience.smartSafety.bullet 1')}</li>
                <li>{t('jobExperience.smartSafety.bullet 2')}</li>
                <li>{t('jobExperience.smartSafety.bullet 3')}</li>
              </ul>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div>
              <h4>{`${t('jobExperience.menta.position')} ${t('jobExperience.at')} Menta Comunicación`}</h4>
              <h5>{t('jobExperience.menta.time period')}</h5>
              <ul>
                <li>{t('jobExperience.menta.bullet 1')}</li>
                <li>{t('jobExperience.menta.bullet 2')}</li>
                <li>{t('jobExperience.menta.bullet 3')}</li>
                <li>{t('jobExperience.menta.bullet 4')}</li>
                <li>{t('jobExperience.menta.bullet 5')}</li>
                <li>{t('jobExperience.menta.bullet 6')}</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <section>
        <h3>{t('Education')}</h3>
        <ul>
          <li>
            <div>
              <h4>{`${t('education.highschool.institution')} ${t('education.highschool.degree')}`}</h4>
              <h5>2013 — 2017</h5>
            </div>
          </li>

          <li>
            <div>
              <h4>{`${t('education.college.institution')} ${t('education.college.degree')}`}</h4>
              <h5>2023 — </h5>
            </div>
          </li>
        </ul>
      </section>

      <section>
        <h3>{t('resume.courses.title')}</h3>
        <ul>
          <li>
            <div>
              <h4>Epic React<span>Kent C. Dodds</span></h4>
              <h5>2021</h5>
            </div>
          </li>
          <li>
            <div>
              <h4>Just Javascript <span>Dan Abramov</span></h4>
              <h5>2021</h5>
            </div>
          </li>
          <li>
            <div>
              <h4>The Frontend Developer Career Path<span>Scrimba</span></h4>
              <h5>2021</h5>
            </div>
          </li>
          <li>
            <div>
              <h4>CS50's Introduction to Computer Science<span>HarvardX</span></h4>
              <h5>2020</h5>
            </div>
          </li>
        </ul>
      </section>

      <section>
        <h3>{t('resume.otherSkills.title')}</h3>
        <ul>
          <li>{t('resume.otherSkills.Scripting')}</li>
          <li>{t('resume.otherSkills.PC Repair')}</li>
        </ul>
      </section>

      <section>
        <h3>{t('Languages')}</h3>
        <ul>
          <li>{t('languages.Spanish')} <span>{t('languages.level.Native')}</span></li>
          <li>{t('languages.English')} <span>{t('languages.level.Highly proficient')}</span></li>
          <li>{t('languages.Portuguese')} <span>{t('languages.level.Basic')}</span></li>
        </ul>
      </section>

      <section>
        <h3>{t('resume.techStack.title')}</h3>
        <ul>
          <li>React</li>
          <li>TypeScript</li>
          <li>Next.js</li>
          <li>Node.js</li>
          <li>Docker</li>
          <li>Django REST Framework</li>
        </ul>
      </section>
    </div>
  );
};

export default Resume;
