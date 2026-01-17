import type { Route } from "./+types/prayerRequestsApi";

// export function loader(_: Route.LoaderArgs) {
//   return Response.json({ message: "I handle GET" });
// }

export async function action(actionArgs: Route.ActionArgs) {
  const json = await actionArgs.request.json();
  return Response.json({
    ok: true,
    message: JSON.stringify(json),
  });
}
