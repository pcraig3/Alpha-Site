import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Layout } from "../components/organisms/Layout";
import { ActionButton } from "../components/atoms/ActionButton";
import { TextButtonField } from "../components/molecules/TextButtonField";
import { Quote } from "../components/molecules/Quote";
import { List } from "../components/molecules/List";
import { useRouter } from "next/router";

export default function DynamicPage(props) {
  const { t } = useTranslation("common");

  const locale = props.locale;
  const pageData = props.pageData;

  const getLocaleString = (locale, frenchString, engString) => {
    return locale === "fr" ? frenchString : engString;
  };

  return (
    <Layout
      bannerTitle={getLocaleString(
        locale,
        pageData.BannerTitle_FR,
        pageData.BannerTitle_EN
      )}
      bannerText={getLocaleString(
        locale,
        pageData.BannerText_FR,
        pageData.BannerText_EN
      )}
      locale={props.locale}
      langUrl={getLocaleString(
        locale,
        pageData.PagePath_EN,
        pageData.PagePath_FR
      )}
    >
      <Head>
        <title>
          {getLocaleString(locale, pageData.Title_FR, pageData.Title_EN)}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="layout-container mb-2 mt-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-24">
          <TextButtonField
            href="/experiments"
            buttonText={t("experimentsBtnTxt")}
            idButton="ExperimentsButton"
            dataCyButton="ExperimentsButton"
          >
            <h1>{t("experimentsAndExplorationTitle")}</h1>
            <p>{t("experimentsAndExploration-1/3")}</p>
            <p>{t("experimentsAndExploration-2/3")}</p>
            <p>{t("experimentsAndExploration-3/3")}</p>
          </TextButtonField>
          <div className="lg:pt-32">
            <Quote text={t("experimentsComment")} author="Kim Lee Kho" />
          </div>
        </div>
      </section>

      <section className="bg-footer-background-color  ">
        <div className="flex flex-col-reverse pt-8  layout-container   xl:grid xl:grid-cols-2 xl:gap-8">
          <List
            items={[
              t("circleTxt1/4"),
              t("circleTxt2/4"),
              t("circleTxt3/4"),
              t("circleTxt4/4"),
            ]}
          />
          <div>
            <h2 className="text-h1 mb-4">{t("aboutTitle")}</h2>
            <p className="text-sm md:text-p leading-normal text-left font-body font-normal py-4">
              {t("AboutThisSite1/3")}
            </p>
            <p className="text-sm md:text-p leading-normal text-left font-body font-normal py-4">
              {t("AboutThisSite2/3")}
            </p>
            <p className="text-sm md:text-p leading-normal text-left font-body font-normal py-4">
              {t("AboutThisSite3/3")}
            </p>
            <div className="invisible xl:visible">
              <ActionButton
                id="LearnMoreButton"
                text={t("learnMoreBtn")}
                className={"text-xs md:text-base"}
                secondary
                dataCyButton={"learn-more"}
              />
            </div>
          </div>
        </div>
        <div className="xl:bg-footer-background-color  bg-white ">
          <div className="xl:invisible layout-container pt-6 xl:pt-0 xl:pb-0 pb-10 ">
            <ActionButton
              id="LearnMoreButtonSmScreen"
              text={t("learnMoreBtn")}
              className={"text-xs md:text-base"}
              secondary
              dataCyButton={"learn-more"}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const res = await fetch(`${process.env.STRAPI_API_BACKEND_URL}/pages`);
  const pages = await res.json();

  const paths = pages.flatMap((page) => [
    { params: { slug: page.PagePath_EN }, locale: "en" },
    { params: { slug: page.PagePath_FR }, locale: "fr" },
  ]);

  return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
  const res = await fetch(`${process.env.STRAPI_API_BACKEND_URL}/pages`);
  const pagesData = await res.json();

  const page = pagesData.filter((page) => {
    return page.PagePath_EN || page.PagePath_FR === context.params.slug;
  })[0];

  return {
    props: {
      pageData: page,
      locale: context.locale,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};
