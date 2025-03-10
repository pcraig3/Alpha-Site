import { Layout } from "../../components/organisms/Layout";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { CallToAction } from "../../components/molecules/CallToAction";
import { useEffect, useState } from "react";
import aemServiceInstance from "../../services/aemServiceInstance";

export default function LifeJourneys(props) {
  const { t } = useTranslation("common", "lj");
  const [pageData] = useState(props.pageData.item);

  useEffect(() => {
    if (props.adobeAnalyticsUrl) {
      window.adobeDataLayer = window.adobeDataLayer || [];
      window.adobeDataLayer.push({ event: "pageLoad" });
    }
  }, []);

  return (
    <>
      <Layout
        locale={props.locale}
        langUrl={
          props.locale === "en" ? pageData.scPageNameFr : pageData.scPageNameEn
        }
        breadcrumbItems={[
          {
            text:
              props.locale === "en"
                ? pageData.scBreadcrumbParentPages[0].scTitleEn
                : pageData.scBreadcrumbParentPages[0].scTitleFr,
            link:
              props.locale === "en"
                ? pageData.scBreadcrumbParentPages[0].scPageNameEn
                : pageData.scBreadcrumbParentPages[0].scPageNameFr,
          },
          {
            text:
              props.locale === "en"
                ? pageData.scBreadcrumbParentPages[1].scTitleEn
                : pageData.scBreadcrumbParentPages[1].scTitleFr,
            link:
              props.locale === "en"
                ? pageData.scBreadcrumbParentPages[1].scPageNameEn
                : pageData.scBreadcrumbParentPages[1].scPageNameFr,
          },
        ]}
      >
        <Head>
          {props.adobeAnalyticsUrl ? (
            <script src={props.adobeAnalyticsUrl} />
          ) : (
            ""
          )}

          {/* Primary HTML Meta Tags */}
          <title>{`${
            props.locale === "en" ? pageData.scTitleEn : pageData.scTitleFr
          } — ${t("siteTitle")}`}</title>
          <meta
            name="description"
            content={`${t("lj:lifeJourneysContent2")} ${t(
              "lj:lifeJourneysContent3"
            )}`}
          />
          <meta name="author" content="Service Canada" />
          <link rel="icon" href="/favicon.ico" />

          {/* DCMI Meta Tags */}
          <meta
            name="dcterms.title"
            content={`${t("lj:lifeJourneysTitle")} — ${t("siteTitle")}`}
          />
          <meta
            name="dcterms.language"
            content={props.locale === "en" ? "eng" : "fra"}
          />
          <meta name="dcterms.creator" content={t("creator")} />
          <meta name="dcterms.accessRights" content="2" />
          <meta
            name="dcterms.service"
            content="ESDC-EDSC_SCLabs-LaboratoireSC"
          />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:locale" content={props.locale} />
          <meta
            property="og:url"
            content={
              "https://alpha.service.canada.ca/" +
              `${props.locale}` +
              `${t("projectRedirect")}` +
              "/life-journeys"
            }
          />
          <meta
            property="og:title"
            content={`${t("lj:lifeJourneysTitle")} — ${t("siteTitle")}`}
          />
          <meta
            property="og:description"
            content={`${t("lj:lifeJourneysContent2")} ${t(
              "lj:lifeJourneysContent3"
            )}`}
          />
          <meta property="og:image" content={`${t("metaImage")}`} />
          <meta property="og:image:alt" content={`${t("siteTitle")}`} />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content={
              "https://alpha.service.canada.ca/" +
              `${props.locale}` +
              `${t("projectRedirect")}` +
              "/life-journeys"
            }
          />
          <meta
            property="twitter:title"
            content={`${t("lj:lifeJourneysTitle")} — ${t("siteTitle")}`}
          />
          <meta name="twitter:creator" content={t("creator")} />
          <meta
            property="twitter:description"
            content={`${t("lj:lifeJourneysContent2")} ${t(
              "lj:lifeJourneysContent3"
            )}`}
          />
          <meta property="twitter:image" content={`${t("metaImage")}`} />
          <meta property="twitter:image:alt" content={`${t("siteTitle")}`} />
        </Head>
        <section className="layout-container relative mb-10">
          <h1
            id="pageMainTitle"
            className="mb-8 text-h1l flex-wrap"
            tabIndex="-1"
          >
            {props.locale === "en" ? pageData.scTitleEn : pageData.scTitleFr}
          </h1>
          <h2 className="mb-6 leading-10">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[1].content[0].value
              : pageData.scFragments[0].scContentFr.json[1].content[0].value}
          </h2>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[2].content[0].value
              : pageData.scFragments[0].scContentFr.json[2].content[0].value}
          </p>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[3].content[0].value
              : pageData.scFragments[0].scContentFr.json[3].content[0].value}
          </p>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[4].content[0].value
              : pageData.scFragments[0].scContentFr.json[4].content[0].value}
          </p>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[5].content[0].value
              : pageData.scFragments[0].scContentFr.json[5].content[0].value}
          </p>
          <h2 className="mb-6 leading-10">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[6].content[0].value
              : pageData.scFragments[0].scContentFr.json[6].content[0].value}
          </h2>
          <figure className="mb-6 lg:w-2/3 border shadow-experiment-shadow">
            <img
              src={`https://www.canada.ca${
                props.locale === "en"
                  ? pageData.scFragments[1].scImageEn._path
                  : pageData.scFragments[1].scImageFr._path
              }`}
              alt={
                props.locale === "en"
                  ? pageData.scFragments[1].scImageAltTextEn
                  : pageData.scFragments[1].scImageAltTextFr
              }
            />
            <figcaption className="p-6 text-sm font-display border-t">
              {props.locale === "en"
                ? pageData.scFragments[1].scImageCaptionEn.json[0].content[0]
                    .value
                : pageData.scFragments[1].scImageCaptionFr.json[0].content[0]
                    .value}
            </figcaption>
          </figure>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[7].content[0].value
              : pageData.scFragments[0].scContentFr.json[7].content[0].value}
          </p>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[8].content[0].value
              : pageData.scFragments[0].scContentFr.json[8].content[0].value}
          </p>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[9].content[0].value
              : pageData.scFragments[0].scContentFr.json[9].content[0].value}
          </p>
          <p>
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[10].content[0].value
              : pageData.scFragments[0].scContentFr.json[10].content[0].value}
          </p>
          <ol className="ml-8 text-lg">
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[11].content[0]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[11].content[0]
                    .content[0].value}
            </li>
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[11].content[1]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[11].content[1]
                    .content[0].value}
            </li>
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[11].content[2]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[11].content[2]
                    .content[0].value}
            </li>
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[11].content[3]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[11].content[3]
                    .content[0].value}
            </li>
          </ol>
          <h2 className="mb-6 leading-10">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[12].content[0].value
              : pageData.scFragments[0].scContentFr.json[12].content[0].value}
          </h2>
          <figure className="mb-6 lg:w-2/3 border shadow-experiment-shadow">
            <img
              src={`https://www.canada.ca${
                props.locale === "en"
                  ? pageData.scFragments[2].scImageEn._path
                  : pageData.scFragments[2].scImageFr._path
              }`}
              alt={
                props.locale === "en"
                  ? pageData.scFragments[2].scImageAltTextEn
                  : pageData.scFragments[2].scImageAltTextFr
              }
            />
            <figcaption className="p-6 text-sm font-display border-t">
              {props.locale === "en"
                ? pageData.scFragments[2].scImageCaptionEn.json[0].content[0]
                    .value
                : pageData.scFragments[2].scImageCaptionFr.json[0].content[0]
                    .value}
            </figcaption>
          </figure>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[13].content[0].value
              : pageData.scFragments[0].scContentFr.json[13].content[0].value}
          </p>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[14].content[0].value
              : pageData.scFragments[0].scContentFr.json[14].content[0].value}
          </p>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[15].content[0].value
              : pageData.scFragments[0].scContentFr.json[15].content[0].value}
          </p>
          <p>
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[16].content[0].value
              : pageData.scFragments[0].scContentFr.json[16].content[0].value}
          </p>
          <ol className="ml-8 text-lg">
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[17].content[0]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[17].content[0]
                    .content[0].value}
            </li>
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[17].content[1]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[17].content[1]
                    .content[0].value}
            </li>
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[17].content[2]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[17].content[2]
                    .content[0].value}
            </li>
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[17].content[3]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[17].content[3]
                    .content[0].value}
            </li>
            <li>
              {props.locale === "en"
                ? pageData.scFragments[0].scContentEn.json[17].content[4]
                    .content[0].value
                : pageData.scFragments[0].scContentFr.json[17].content[4]
                    .content[0].value}
            </li>
          </ol>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[18].content[0].value
              : pageData.scFragments[0].scContentFr.json[18].content[0].value}
          </p>
          <h2 className="mb-6 leading-10">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[19].content[0].value
              : pageData.scFragments[0].scContentFr.json[19].content[0].value}
          </h2>
          <p className="mb-6">
            {props.locale === "en"
              ? pageData.scFragments[0].scContentEn.json[20].content[0].value
              : pageData.scFragments[0].scContentFr.json[20].content[0].value}
          </p>
          <p className="my-6">
            <strong>
              {props.locale === "en"
                ? pageData.scFragments[3].scContentEn.json[0].content[0].value
                : pageData.scFragments[3].scContentFr.json[0].content[0].value}
            </strong>
          </p>
        </section>
        <CallToAction
          title={
            props.locale === "en"
              ? pageData.scFragments[4].scTitleEn
              : pageData.scFragments[4].scTitleFr
          }
          description={
            props.locale === "en"
              ? pageData.scFragments[4].scContentEn.json[0].content[0].value
              : pageData.scFragments[4].scContentFr.json[0].content[0].value
          }
          disclaimer={
            props.locale === "en"
              ? pageData.scFragments[4].scContentEn.json[1].content[0].value
              : pageData.scFragments[4].scContentFr.json[1].content[0].value
          }
          lang={props.locale}
          href={
            props.locale === "en"
              ? pageData.scFragments[4].scLabsButton[0].scDestinationURLEn
              : pageData.scFragments[4].scLabsButton[0].scDestinationURLFr
          }
          hrefText={
            props.locale === "en"
              ? pageData.scFragments[4].scLabsButton[0].scTitleEn
              : pageData.scFragments[4].scLabsButton[0].scTitleFr
          }
        />
      </Layout>
      {props.adobeAnalyticsUrl ? (
        <script type="text/javascript">_satellite.pageBottom()</script>
      ) : (
        ""
      )}
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  const { data } = await aemServiceInstance.getFragment("havingAChildQuery");
  return {
    props: {
      locale: locale,
      pageData: data.scLabsPagev1ByPath,
      adobeAnalyticsUrl: process.env.ADOBE_ANALYTICS_URL,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
