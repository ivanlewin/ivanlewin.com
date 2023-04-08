/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '/styles/Resume.module.css';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const Resume: NextPage = () => {

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`Iván Lewin • ${t("Resume")}`}</title>
      </Head>
      <div className={styles.root}>
        <header className={styles.header}>
          <Image className={styles.picture} src='/pictures/work.jpg' alt='Photo of me' width={72} height={72} />
          <div>
            <Typography variant='h1' >Iván Lewin</Typography>
            <Typography variant='h2'>{t("Job title")}</Typography>
          </div>
        </header>
        <main className={styles.columns}>
          <div className={styles.column}>
            <section className={styles.personalInformation}>
              <Typography variant='body1' >{t("Personal information")}</Typography>
              <Typography>{t("Location")} Buenos Aires, Argentina</Typography>
            </section>
            <section id='languages'>
              <Typography variant='body1' >{t("Languages")}</Typography>
              <ul>
                <li><Typography>{t("Spanish")} <span>{t("Native")}</span></Typography></li>
                <li><Typography>{t("English")} <span>{t("Highly proficient")}</span></Typography></li>
                <li><Typography>{t("Portuguese")} <span>{t("Basic")}</span></Typography></li>
              </ul>
            </section>
            <section id='techStack'>
              <Typography variant='body1' >{t("Tech stack")}</Typography>
              <ul>
                <li><Typography>React</Typography></li>
                <li><Typography>TypeScript</Typography></li>
                <li><Typography>Next.js</Typography></li>
                <li><Typography>Node.js</Typography></li>
                <li><Typography>Docker</Typography></li>
                <li><Typography>Django REST Framework</Typography></li>
              </ul>
            </section>
          </div>
          <div className={styles.column}>
            <section id='experience'>
              <Typography variant='body1' >{t("Experience")}</Typography>
              <ul>
                <li>
                  <div>
                    <Typography >{`${t("jobExperience.smartSafety.position")} ${t("jobExperience.at")} Smart Safety`}</Typography>
                    <Typography >{t("jobExperience.smartSafety.time period")}</Typography>
                    <ul>
                      <li>{t("jobExperience.smartSafety.bullet 1")}</li>
                      <li>{t("jobExperience.smartSafety.bullet 2")}</li>
                      <li>{t("jobExperience.smartSafety.bullet 3")}</li>
                    </ul>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <div>
                    <Typography >{`${t("jobExperience.menta.position")} ${t("jobExperience.at")} Menta Comunicación`}</Typography>
                    <Typography >{t("jobExperience.menta.time period")}</Typography>
                    <ul>
                      <li><Typography>{t("jobExperience.menta.bullet 1")}</Typography></li>
                      <li><Typography>{t("jobExperience.menta.bullet 2")}</Typography></li>
                      <li><Typography>{t("jobExperience.menta.bullet 3")}</Typography></li>
                      <li><Typography>{t("jobExperience.menta.bullet 4")}</Typography></li>
                      <li><Typography>{t("jobExperience.menta.bullet 5")}</Typography></li>
                      <li><Typography>{t("jobExperience.menta.bullet 6")}</Typography></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </section>
            <section id='education'>
              <Typography variant='body1' >{t("Education")}</Typography>
              <ul>
                <li>
                  <div>
                    <Typography >{`${t("education.highschool.institution")} ${t("education.highschool.degree")}`}</Typography>
                    <Typography >2013 — 2017</Typography>
                  </div>
                </li>

                <li>
                  <div>
                    <Typography >{`${t("education.college.institution")} ${t("education.college.degree")}`}</Typography>
                    <Typography >2023 — </Typography>
                  </div>
                </li>
              </ul>
            </section>
            <section id='courses'>
              <Typography variant='body1' >{t("resume.courses.title")}</Typography>
              <ul>
                <li>
                  <div>
                    <Typography >Epic React<span>Kent C. Dodds</span></Typography>
                    <Typography >2021</Typography>
                  </div>
                </li>
                <li>
                  <div>
                    <Typography >Just Javascript <span>Dan Abramov</span></Typography>
                    <Typography >2021</Typography>
                  </div>
                </li>
                <li>
                  <div>
                    <Typography >The Frontend Developer Career Path<span>Scrimba</span></Typography>
                    <Typography >2021</Typography>
                  </div>
                </li>
                <li>
                  <div>
                    <Typography >CS50's Introduction to Computer Science<span>HarvardX</span></Typography>
                    <Typography >2020</Typography>
                  </div>
                </li>
              </ul>
            </section>
            <section id='otherSkills'>
              <Typography variant='body1' >{t("resume.otherSkills.title")}</Typography>
              <ul>
                <li>{t("resume.otherSkills.Scripting")}</li>
                <li>{t("resume.otherSkills.PC Repair")}</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Resume;
