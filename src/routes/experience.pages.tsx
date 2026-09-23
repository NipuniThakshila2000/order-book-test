import { createFileRoute } from "@tanstack/react-router";
import { RouteRedirect } from "@/components/route-redirect";

export const Route = createFileRoute("/experience/pages")({
  component: () => <RouteRedirect to="/record" />,
});
