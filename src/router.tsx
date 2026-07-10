import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ErrorFallback, NotFoundFallback } from "./components/error-fallback";
import { reportLovableError } from "./lib/lovable-error-reporting";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: unknown) => {
          const status = (error as { status?: number })?.status;
          if (status && status >= 400 && status < 500) return false;
          return failureCount < 2;
        },
        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        refetchOnWindowFocus: false,

      },
      mutations: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error("[query.error]", query.queryKey, error);
        reportLovableError(error, { boundary: "react_query", queryKey: query.queryKey });
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _vars, _ctx, mutation) => {
        console.error("[mutation.error]", mutation.options.mutationKey, error);
        reportLovableError(error, {
          boundary: "react_query_mutation",
          mutationKey: mutation.options.mutationKey,
        });
      },
    }),
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 30_000,
    defaultPreloadDelay: 50,
    defaultErrorComponent: ErrorFallback,
    defaultNotFoundComponent: () => <NotFoundFallback />,
  });

  return router;
};
