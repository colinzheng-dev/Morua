import { useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";

import classes from "./Team.module.scss";
import Logos from "../../assets/images/about_3_combined.png";

function Team() {
  const { language } = useParams();

  return (
    <Layout title={language === "en" ? "Team" : "EQUIPE"}>
      <div className={classes.container}>
        <p className={classes["section-title"]}>Co-PI:</p>
        <p>Nabil Ahmed (INTERPRT/NTNU), Geoffrey Livolsi (Disclose), Sébastien Philippe (SGS)</p>

        <p className={classes["section-title"]}>
          {language === "en" ? "Interprt" : "INTERPRT"}:
        </p>
        <p>
          {language === "en"
            ? "Nabil Ahmed (Co-PI), Olga Lucko (lead architectural researcher and web design), Svitlana Lavrenchuk (architectural researcher, 3D design and animation), Filip Wesołowski (animation production), Martinus Suijkerbuijk (document OCR)"
            : "Nabil Ahmed (Co-PI), Svitlana Lavrenchuk (Chercheuse en architecture, modélisation 3D), Olga Lucko (chercheuse en architecture et web design) Martinus Suijkerbuijk (OCR), Filip Wesolowski (animation)"}
        </p>

        <p className={classes["section-title"]}>Platform development:</p>
        <p>Code Chorus (James Dose and Jacob Liu)</p>

        <p className={classes["section-title"]}>
          {language === "en" ? "Disclose" : "DISCLOSE"}:
        </p>
        <p>
          {language === "en"
            ? "Mathias Destal (editor-in-chief), Geoffrey Livolsi (Co-PI), Tomas Statius (investigative journalist), Mathieu Asselin (photographer)"
            : "Mathieu Asselin (photographe), Mathias Destal (rédacteur en chef), Geoffrey Livolsi (Co-PI), Tomas Statius (journaliste enquêteur)"}
        </p>

        <p className={classes["section-title"]}>
          {language === "en"
            ? "Program on Science and Global Security - Princeton University"
            : "SCIENCES & GLOBAL SECURITY de l’université de Princeton"}
          :
        </p>
        <p>
          {language === "en"
            ? "Sébastien Philippe (Co-PI, research and scientific modelisation)"
            : "Sébastien Philippe (Co-PI, recherche et modélisation scientifique)"}
        </p>

        <p className={classes["section-title"]}>
          {language === "en" ? "Thanks to" : "Remerciements"}:
        </p>
        <p>
          {language === "en"
            ? "Bruno Barillot, Association 193, Moruroa e Tatou, AVEN, Observatoire des Armements, TBA21–Academy, Ute Meta Bauer, Stefanie Hessler, Hervé Raimana Lallemant-Moe, Sonya Schoenberg, Zia Mian, Cécile Labrunie, Anaïs Maurer, Tiago Patatas, Trondheim Academy of Fine Art, Norwegian University of Science and Technology (NTNU)"
            : "Bruno Barillot - Association 193 - Association des vétérans des essais nucléaires - Sonya Schoenberg - Observatoire des armements - TBA21-Academy - Ute Meta Bauer – Stefanie Hessler - Hervé Raimana Lallemant-Moe - Zia Mian - Cécile Labrunie - Anaïs Maurer"}
        </p>

        <p className={classes.standalone}>
          {language === "en" ? (
            <>
              <a
                href="http://interprt.org/"
                target="_blank"
                rel="noreferrer"
                className={classes["important-word"]}
              >
                INTERPRT
              </a>{" "}
              is a research and design studio run by a group of researchers,
              architects, film-makers, and spatial designers dedicated to
              environmental justice. The group works in collaboration and
              cooperation with international criminal lawyers, scientists,
              journalists and civil society organizations worldwide and is part
              of the global movement for stopping ecocide. INTERPRT is
              commissioned by TBA21–Academy to undertake a series of long-form
              investigations on under-reported environmental violations in the
              Pacific.
            </>
          ) : (
            <>
              <a
                href="http://interprt.org/"
                target="_blank"
                rel="noreferrer"
                className={classes["hyperlink"]}
              >
                INTERPRT
              </a>{" "}
              est un collectif de chercheurs, de designers, d’architectes et de
              cinéastes spécialisés sur les crimes environnementaux. Le groupe
              travaille en collaboration et en coopération avec des
              criminalistes internationaux, des scientifiques, des journalistes
              et des organisations de la société civile du monde entier pour
              mettre fin aux écocides. INTERPRT est chargé par TBA21 – Academy
              de réaliser une série d'enquêtes sur les violations
              environnementales dans le Pacifique.
            </>
          )}
        </p>

        <p className={classes.standalone}>
          {language === "en" ? (
            <>
              <a
                href="https://disclose.ngo/en/"
                target="_blank"
                rel="noreferrer"
                className={classes["important-word"]}
              >
                DISCLOSE
              </a>{" "}
              is a french not-for-profit newsroom of investigative journalism to
              hold power to account. Our team of reporters conducts
              investigations on topics of public interest, we tackle big
              subjects through deep reporting that uncovers the truth. Through
              fact-based, unbiased reporting, we expose systemic wrongs, counter
              misinformation and spark change. DISCLOSE is mainly financed by
              individual donations and contributions from foundations.
            </>
          ) : (
            <>
              <a
                href="https://disclose.ngo/en/"
                target="_blank"
                rel="noreferrer"
                className={classes["important-word"]}
              >
                DISCLOSE
              </a>{" "}
              est un média d’investigation français à but non lucratif et en
              accès libre qui mène des enquêtes au long cours sur des sujets
              d’intérêt public. DISCLOSE est financé par les dons individuels et
              le soutien de fondations philanthropiques.
            </>
          )}
        </p>

        <p className={classes.standalone}>
          {language === "en" ? (
            <>
              <a
                href="https://sgs.princeton.edu/"
                target="_blank"
                rel="noreferrer"
                className={classes["important-word"]}
              >
                Princeton University’s Program on Science and Global Security
                (SGS),
              </a>{" "}
              based in the School of Public and International Affairs, conducts
              scientific, technical and policy research, analysis and outreach
              to advance national and international policies for a safer and
              more peaceful world. SGS research is funded by foundations and
              supported by Princeton's School of Public and International
              Affairs.
            </>
          ) : (
            <>
              <a
                href="https://sgs.princeton.edu/"
                target="_blank"
                rel="noreferrer"
                className={classes["important-word"]}
              >
                Le programme Science and Global Security (SGS) de l’Université
                de Princeton
              </a>{" "}
              conduit des travaux académiques scientifiques et techniques pour
              faire progresser les politiques nationales et internationales vers
              un monde plus sûr. Ce programme est financé par des fondations et
              soutenu par l'École des affaires publiques et internationales de
              Princeton.
            </>
          )}
        </p>
      </div>

      {/* <div className={classes.divider} /> */}

      <img className={classes.logo} src={Logos} alt="logos" />
    </Layout>
  );
}

export default Team;
