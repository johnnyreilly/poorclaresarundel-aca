import * as React from "react";

export const interviewsPath = "/community-interviews";

export const Interviews: React.FC<React.PropsWithChildren<unknown>> = (
  _props
) => (
  <>
    <h3 className="text-3xl font-bold dark:text-white">
      Interviews with Sisters
    </h3>

    <p>Here a number of interviews with some of the sisters:</p>

    <h4>Sister Pat</h4>

    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src="https://www.youtube.com/embed/Z13ZVI5ZARw"
        allowFullScreen
        title="Sister Pat interview"
      />
    </div>

    <h4>Sister Gabriel</h4>

    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src="https://www.youtube.com/embed/4wwaRR4jnuc"
        allowFullScreen
        title="Sister Gabriel interview"
      />
      <iframe
        className="embed-responsive-item"
        src="https://www.youtube.com/embed/y_d-T74WEO0"
        allowFullScreen
        title="Sister Gabriel interview on LADbible"
      />
    </div>

    <h4>Sister Angela</h4>

    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src="https://www.youtube.com/embed/RCWEawlX4Tc"
        allowFullScreen
        title="Sister Angela interview"
      />
    </div>

    <h4>Sister Aelred</h4>

    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src="https://www.youtube.com/embed/qpXROehsm48"
        allowFullScreen
        title="Sister Aelred interview"
      />
    </div>
  </>
);
