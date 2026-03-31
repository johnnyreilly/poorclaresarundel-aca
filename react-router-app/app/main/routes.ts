import {
  type RouteConfig,
  route,
  // index,
  layout,
  //   prefix,
} from "@react-router/dev/routes";
import { prayerRequestsApiPath, prayerRequestsPath } from "./routePaths";

export default [
  layout("./main/Layout.tsx", [
    // index("./main/Us.tsx"),

    route("/us", "./main/Us.tsx"),

    route("/our-life/our-prayer", "./main/our-life/OurPrayer.tsx"),
    route("/our-life/our-work", "./main/our-life/OurWork.tsx"),
    route("/our-life/our-shop", "./main/our-life/OurShop.tsx"),

    route("/community/sister-ann", "./main/community/SisterAnn.tsx"),
    route(
      "/community/sister-clare-agnes",
      "./main/community/SisterClareAgnes.tsx"
    ),
    route(
      "/community/sister-clare-ruva",
      "./main/community/SisterClareRuva.tsx"
    ),
    // route("/community/sister-gabriel", "./main/community/SisterGabriel.tsx"),
    route("/community/sister-graca", "./main/community/SisterGraca.tsx"),
    route("/community/sister-joseph", "./main/community/SisterJoseph.tsx"),
    // route("/community/sister-maria", "./main/community/SisterMaria.tsx"),
    route("/community/vocation", "./main/community/Vocation.tsx"),
    route("/community/interviews", "./main/community/Interviews.tsx"),
    route("/community/arundel", "./main/community/Arundel.tsx"),
    route("/community/kenya", "./main/community/Kenya.tsx"),

    route("/beginnings/clares-story", "./main/beginnings/ClaresStory.tsx"),
    route(
      "/beginnings/clares-thoughts",
      "./main/beginnings/ClaresThoughts.tsx"
    ),
    route("/beginnings/clares-prayers", "./main/beginnings/ClaresPrayers.tsx"),
    route("/beginnings/francis-life", "./main/beginnings/FrancisLife.tsx"),
    route(
      "/beginnings/francis-thoughts",
      "./main/beginnings/FrancisThoughts.tsx"
    ),
    route(
      "/beginnings/francis-prayers",
      "./main/beginnings/FrancisPrayers.tsx"
    ),

    route("/events", "./main/Events.tsx"),

    route("/misc/faqs", "./main/misc/FAQs.tsx"),
    route("/misc/links", "./main/misc/Links.tsx"),
    route("/misc/glossary", "./main/misc/Glossary.tsx"),
    route("/misc/addresses", "./main/misc/Addresses.tsx"),

    route("/donate", "./main/Donate.tsx"),
    route(prayerRequestsPath, "./main/PrayerRequests.tsx"),
    route(prayerRequestsApiPath, "./main/prayerRequestsApi.ts"),

    route("/light-for-the-world", "./main/LightForTheWorld.tsx"),

    route("/christmas", "./main/Christmas.tsx"),

    route("/my-peace-i-give-you", "./main/MyPeaceIGiveYou.tsx"),
  ]),
] satisfies RouteConfig;
