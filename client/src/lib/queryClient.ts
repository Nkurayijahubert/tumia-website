import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    console.log(`API Request: ${method} ${url}`);
    
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    console.log(`API Response: ${res.status} ${res.statusText}`);
    
    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error(`API Error for ${method} ${url}:`, error);
    
    // Safely enhance the error without causing issues on error serializing
    let errorMessage = "Unknown error";
    try {
      errorMessage = error.message || "Unknown error";
    } catch (e) {
      // Ignore errors getting the message
    }
    
    const enhancedError = new Error(
      `${errorMessage} (URL: ${url})`
    );
    
    throw enhancedError;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      console.log(`Query Fetch: GET ${queryKey[0]}`);
      
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });

      console.log(`Query Response: ${res.status} ${res.statusText}`);

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      console.error(`Query Error for ${queryKey[0]}:`, error);
      
      // Safely enhance the error
      let errorMessage = "Unknown error";
      try {
        errorMessage = error.message || "Unknown error";
      } catch (e) {
        // Ignore errors getting the message
      }
      
      const enhancedError = new Error(
        `${errorMessage} (QueryKey: ${queryKey[0]})`
      );
      
      throw enhancedError;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
