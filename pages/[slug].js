import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../components/organisms/Layout";
import { TextButtonField } from "../components/molecules/TextButtonField";
import { Quote } from "../components/molecules/Quote";
import { List } from "../components/molecules/List";

export default function DynamicPage(props) {
  const locale = props.locale;
  const pageData = props.pageData;

  // Function for returning a string based on locale
  const getLocaleString = (locale, frenchString, engString) => {
    return locale === "fr" ? frenchString : engString;
  };

  // Function that checks for specific component types and returns
  // that component and container with appropriate CSS
  const format = (component, columnSpan) => {
    return component.hydratedComponent.type.name === "Quote" ? (
      <div className={`lg:col-span-${columnSpan} lg:pt-32`}>
        {component.hydratedComponent}
      </div>
    ) : (
      <div className={`lg:col-span-${columnSpan}`}>
        {component.hydratedComponent}
      </div>
    );
  };

  // Function used to create button ids and data-cy ids
  const createButtonIdString = (string) => {
    return `${string.replace(/\s/g, "")}-button`;
  };

  // Function used to create an array of strings to be used in a List component
  const createListItems = (locale, itemObjects) => {
    let listItems = itemObjects.map((itemObject) => {
      return getLocaleString(
        locale,
        itemObject.ItemName_FR,
        itemObject.ItemName_EN
      );
    });
    return listItems;
  };

  // Function that creates html sections based on each component's size and type.
  // Makes assumptions by checking the next component in the index and checking to see if it is a matching size
  // and if so, continues through the array to check for more of the same size unti a "full" section is created.
  // If the component following the current index is not the same size, create it's own section.
  const createSections = (componentObjects) => {
    let i = 0;
    let sections = [];
    while (i < componentObjects.length) {
      // If component is a full section, give it it's own section
      if (componentObjects[i].size === "full") {
        sections.push(
          <section className="layout-container mt-12 mb-2">
            {componentObjects[i].hydratedComponent}
          </section>
        );
        i++;
        // If component is "three-quarters" size
      } else if (componentObjects[i].size === "three-quarters") {
        // First check if the next component is a quarter (to make a full section) and if not, give this component it's own section
        if (componentObjects[i + 1].size !== "quarter") {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-9">
                  {componentObjects[i].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i++;
          // If the component next in the index creates a full section, combine it with the current index component
          // into one section
        } else {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-9">
                  {componentObjects[i].hydratedComponent}
                </div>
                <div className="lg:col-span-3">
                  {componentObjects[i + 1].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i = i + 2;
        }
      } else if (componentObjects[i].size === "two-thirds") {
        if (componentObjects[i + 1].size !== "third") {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-8">
                  {componentObjects[i].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i++;
        } else {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-8">
                  {componentObjects[i].hydratedComponent}
                </div>
                <div className="lg:col-span-4">
                  {componentObjects[i + 1].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i = i + 2;
        }
      } else if (componentObjects[i].size === "half") {
        if (componentObjects[i + 1].size !== "half") {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-24">
                {format(componentObjects[i], 1)}
              </div>
            </section>
          );
          i++;
        } else {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-24">
                {format(componentObjects[i], 1)}
                {format(componentObjects[i + 1], 1)}
              </div>
            </section>
          );
          i = i + 2;
        }
      } else if (componentObjects[i].size === "third") {
        if (componentObjects[i + 1].size !== "third") {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-4">
                  {componentObjects[i].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i++;
        } else if (
          componentObjects[i + 1].size === "third" &&
          componentObjects[i + 2].size !== "third"
        ) {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-4">
                  {componentObjects[i].hydratedComponent}
                </div>
                <div className="lg:col-span-4">
                  {componentObjects[i + 1].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i = i + 2;
        } else {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-4">
                  {componentObjects[i].hydratedComponent}
                </div>
                <div className="lg:col-span-4">
                  {componentObjects[i + 1].hydratedComponent}
                </div>
                <div className="lg:col-span-4">
                  {componentObjects[i + 2].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i = i + 3;
        }
      } else if (componentObjects[i].size === "quarter") {
        if (componentObjects[i + 1].size !== "quarter") {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-3">
                  {componentObjects[i].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i++;
        } else if (
          componentObjects[i + 1].size === "quarter" &&
          componentObjects[i + 2].size !== "quarter"
        ) {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-3">
                  {componentObjects[i].hydratedComponent}
                </div>
                <div className="lg:col-span-3">
                  {componentObjects[i + 1].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i = i + 2;
        } else if (
          componentObjects[i + 1].size === "quarter" &&
          componentObjects[i + 3].size !== "quarter"
        ) {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-4">
                  {componentObjects[i].hydratedComponent}
                </div>
                <div className="lg:col-span-4">
                  {componentObjects[i + 1].hydratedComponent}
                </div>
                <div className="lg:col-span-4">
                  {componentObjects[i + 2].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i = i + 3;
        } else {
          sections.push(
            <section className="layout-container mt-12 mb-2">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
                <div className="lg:col-span-4">
                  {componentObjects[i].hydratedComponent}
                </div>
                <div className="lg:col-span-4">
                  {componentObjects[i + 1].hydratedComponent}
                </div>
                <div className="lg:col-span-4">
                  {componentObjects[i + 2].hydratedComponent}
                </div>
                \
                <div className="lg:col-span-4">
                  {componentObjects[i + 3].hydratedComponent}
                </div>
              </div>
            </section>
          );
          i = i + 4;
        }
      }
    }
    return sections;
  };

  const setupComponents = (locale, componentsData) => {
    let hydratedComponentsWithSize = [];
    componentsData.forEach((componentData) => {
      hydratedComponentsWithSize.push(
        getComponentSizeAndHydrate(locale, componentData)
      );
    });
    let componentsWithSections = createSections(hydratedComponentsWithSize);
    return componentsWithSections;
  };

  const getComponentSizeAndHydrate = (locale, componentData) => {
    let componentWithSize = {};
    switch (componentData.__component) {
      case "page-elements.text-call-to-action":
        componentWithSize.hydratedComponent = (
          <TextButtonField
            href={getLocaleString(
              locale,
              `/${componentData.Link_FR}`,
              `/${componentData.Link_EN}`
            )}
            buttonText={getLocaleString(
              locale,
              componentData.ButtonString_FR,
              componentData.ButtonString_EN
            )}
            idButton={createButtonIdString(componentData.ButtonText_EN)}
            dataCyButton={createButtonIdString(componentData.ButtonText_EN)}
          >
            <h1>
              {getLocaleString(
                locale,
                componentData.Title_FR,
                componentData.Title_EN
              )}
            </h1>
            <p style={{ whiteSpace: "pre-line" }}>
              {getLocaleString(
                locale,
                componentData.Text_FR,
                componentData.Text_EN
              )}
            </p>
          </TextButtonField>
        );
        componentWithSize.size = componentData.Size;

        return componentWithSize;

      case "page-elements.quote":
        componentWithSize.hydratedComponent = (
          <Quote
            text={getLocaleString(
              locale,
              componentData.Quote_FR,
              componentData.Quote_EN
            )}
            author={componentData.Author}
          />
        );
        componentWithSize.size = componentData.Size;

        return componentWithSize;

      case "page-elements.list":
        componentWithSize.hydratedComponent = (
          <List items={createListItems(locale, componentData.ListItems)} />
        );
        componentWithSize.size = componentData.Size;

        return componentWithSize;

      default:
        break;
    }
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
      // English and french arguments are reversed here
      // as the english page will want the french path and vice versa
      langUrl={getLocaleString(
        locale,
        `/${pageData.PagePath_EN}`,
        `/${pageData.PagePath_FR}`
      )}
    >
      <Head>
        <title>
          {getLocaleString(locale, pageData.Title_FR, pageData.Title_EN)}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {setupComponents(locale, pageData.Components)}
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  // Get all pages data
  const res = await fetch(`${process.env.STRAPI_API_BACKEND_URL}/pages`);
  const pages = await res.json();

  // Create paths for english and french pages
  const paths = pages.flatMap((page) => [
    { params: { slug: page.PagePath_EN }, locale: "en" },
    { params: { slug: page.PagePath_FR }, locale: "fr" },
  ]);

  return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
  // Get all pages data
  const res = await fetch(`${process.env.STRAPI_API_BACKEND_URL}/pages`);
  const pagesData = await res.json();

  // Filter for pages matching the paths received from getStaticPaths
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
