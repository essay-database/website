const Pricing = ({ paragraph, features, heading }) => (
  <div>
    <div className="uk-card uk-card-default uk-box-shadow-hover-large">
      <div className="uk-card-header">
        <div className="uk-text-center">
          <h3 className="uk-card-title" style={{ color: "#333" }}>
            {heading}
          </h3>
        </div>
      </div>
      <div className="uk-card-body">
        <p>{paragraph}</p>
        <ul className="uk-list uk-list-bullet">
          {features.split(". ").map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default () => (
  <div>
    <div
      className="uk-height-large uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
      data-src="https://images.unsplash.com/photo-1460518451285-97b6aa326961?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
      uk-img=""
    >
      <h2
        style={{
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
      >
        One-stop shop for all of your personal statement needs.
      </h2>
    </div>
    <div className="uk-section uk-section-small uk-section-muted">
      <div className="uk-container">
        <div className="uk-child-width-1-2@s uk-grid-small" uk-grid="">
          <div className="uk-grid-item-match">
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Essay Collection</h3>
              <ul className="uk-list uk-list-divider">
                <li>
                  Gain access to hundreds of admissions essays compiled from
                  around the globe
                </li>
                <li>
                  Learn the do’s and don’ts when it comes to personal statement
                  writing
                </li>
                <li>
                  Filter, sort, search personal statements by school and year
                </li>
                <li>
                  Pay one flat fee rate to access our full library of sample
                  essays
                </li>
              </ul>
              <div className="uk-flex-center uk-flex">
                <button className="uk-button uk-button-default uk-button-large">
                  browse
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Essay Proofreading</h3>
              <ul className="uk-list uk-list-divider">
                <li>
                  Choose from a range of customized editing and proofreading
                  services, including:
                  <ul className="uk-list uk-list-bullet">
                    <li className="uk-text-small">
                      Brainstorming and Content Development
                    </li>
                    <li className="uk-text-small">Multiple Revisions</li>
                    <li className="uk-text-small">
                      Word Cutting (up to 100 words)
                    </li>
                    <li className="uk-text-small">Proofreading</li>
                  </ul>
                </li>
                <li>
                  Services starting at $40
                  <ul className="uk-list uk-list-bullet">
                    <li className="uk-text-small">
                      Rates are calculated based on essay word count, requested
                      return date, and type of service requested
                    </li>
                    <li className="uk-text-small">
                      1 page = 500 words, single spaced, 12pt font)
                    </li>
                    <li className="uk-text-small">
                      Requested Return dates may range from 8 hours to 14 days
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="uk-flex-center uk-flex">
                <button className="uk-button uk-button-default uk-button-large">
                  learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="uk-section uk-section-small uk-section-primary">
      <div className="uk-container">
        <h2 className="uk-text-center uk-heading-line">
          <span>Personal Statement Services</span>
        </h2>
        <p className="uk-margin-medium">
          EssayDB offers services that support at every stage of the Personal
          Statement writing process. Whether it’s for a college admissions
          application or a scholarship application, we will help you develop a
          winning personal statement.
        </p>
        <div
          className="uk-child-width-1-3@m uk-grid-small uk-grid-match"
          uk-grid=""
        >
          <Pricing
            heading="Proofreading"
            paragraph="This option works great for those on their final draft and need an extra pair of eyes before submitting."
            features="Proofread for typos and grammatical errors. Review for sentence structure and overall tone of the essay. Help with reducing word count. Options for 24 hour turn-around is available"
          />
          <Pricing
            heading="Full Review &  Revision"
            paragraph="If you are your 1st or 2nd draft, this is the right option for you. We’ll meet your right where you are in the writing process.This option includes:"
            features="A 15-minute check-in via phone/video conference. 1 round of critiques on essay tone, structure, and clarity. 1 round of proofreading for grammatical errors and spelling errors. Up to 5 day turn around(quicker options are available)"
          />
          <Pricing
            heading="Comprehension Essay Development"
            paragraph="This is our most comprehensive service - we'll guide you from start to finish!"
            features="We’ll help you choose a topic for your essay. One 30 minute brainstorm session. Two rounds of essay critiques and revisions via phone/video conference. Up to a 14 day turn-around (quicker options are available)"
          />
        </div>
      </div>
    </div>
    <div className="uk-section uk-section-muted uk-section-xsmall">
      <div className="uk-container">
        <div className="uk-grid uk-flex-center" uk-grid="">
          <div>
            <button className="uk-button uk-button-primary uk-button-large">
              Buy now
            </button>
          </div>
          <div>
            <a
              className="uk-button uk-button-default uk-button-large"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfc3Ay0rbJ921u5b-yQTmcU97nHiQnogd1Ip_iHR_U8S8hJCw/viewform?usp=sf_link"
              target="_blank"
            >
              fill survey
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
