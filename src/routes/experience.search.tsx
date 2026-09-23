import { createFileRoute } from "@tanstack/react-router";
import { RouteRedirect } from "@/components/route-redirect";

export const Route = createFileRoute("/experience/search")({
  component: () => <RouteRedirect to="/find" />,
});
