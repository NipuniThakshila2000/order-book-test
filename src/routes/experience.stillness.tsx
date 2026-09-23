import { createFileRoute } from "@tanstack/react-router";
import { RouteRedirect } from "@/components/route-redirect";

export const Route = createFileRoute("/experience/stillness")({
  component: () => <RouteRedirect to="/stillness" />,
});
