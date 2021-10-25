import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

/**
 * Displays the PhaseBanner on the page
 */

export const PhaseBanner = ({ phase, children, clicked, feedbackActive }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="bg-circle-color">
        <div className="items-center block lg:flex py-4 layout-container">
          <div className="flex justify-between lg:block lg:w-max">
            <span
              className="font-body text-xs text-white border block w-max px-4 py-1 my-auto leading-6"
              role="alert"
            >
              {phase}
            </span>
          </div>
          <div className="lg:ml-4 xl:ml-8 xxl:ml-12">
            <p className="font-body text-xs lg:text-sm mt-5 lg:mt-auto text-white lg:ml-4 pt-1 my-auto lg:mb-0 lg:pb-1">
              {children}
            </p>
          </div>
        </div>
        {feedbackActive ? (
          <div className="py-4 w-full outline-none bg-custom-blue-blue font-body text-xs lg:text-sm text-white flex justify-center items-center text-left lg:my-0">
            <button
              className="flex focus:outline-white-solid items-center"
              id="feedbackButton"
              data-testid="feedbackButton"
              onClick={clicked}
            >
              <strong className="lg:mt-0 ml-2 underline">
                {t("giveFeedback")}
                {/* <span className="sr-only"> {toggle.current}</span> */}
              </strong>
              <img
                className="px-2 flex items-center"
                src="/feedback-icon-white.svg"
                alt=""
              />
            </button>
          </div>
        ) : undefined}
      </div>
    </>
  );
};

PhaseBanner.propTypes = {
  /**
   * Phase stage in the PhaseBanner
   */
  phase: PropTypes.string.isRequired,
  /**
   * Phase stage in the PhaseBanner
   */
  children: PropTypes.string.isRequired,
  /**
   * This is for showing the feedback component
   */
  feedbackActive: PropTypes.bool,
};

export default PhaseBanner;
