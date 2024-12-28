import * as React from "react";
import { Card, CardImg } from "reactstrap";
import hodieChristusSmall from "../images/hodie-christus-small.jpg";
import silentNightSmall from "../images/silent-night-small.jpg";

export const christmasPath = "/christmas";

export const Christmas: React.FC<React.PropsWithChildren<unknown>> = (
  _props
) => (
  <>
    <Card className="float-end">
      <CardImg top src={silentNightSmall} />
    </Card>

    <h3 className="text-3xl font-bold dark:text-white">Silent Night</h3>

    <p>
      <a href="https://poorclares.lnk.to/SilentNight">
        Listen to our &quot;Silent Night&quot; here.
      </a>
    </p>

    <iframe
      title="Silent Night"
      width={560}
      height={315}
      src="https://www.youtube-nocookie.com/embed/2uxdxZNI2JA"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>

    <hr />

    <Card className="float-end">
      <CardImg top src={hodieChristusSmall} />
    </Card>

    <h3 className="text-3xl font-bold dark:text-white">
      Hodie Christus Natus Est
    </h3>

    <p>
      <a href="https://poorclares.lnk.to/HodieChristus">
        Listen to our &quot;Hodie Christus Natus Est&quot; here.
      </a>
    </p>

    <iframe
      title="Hodie Christus Natus Est"
      width={560}
      height={315}
      src="https://www.youtube-nocookie.com/embed/eBHKhY5Jm4I"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </>
);
