import { GraphQLFormattedError } from "graphql";

type Error = {
  message: string;
  statusCode: string;
};

// Custom fetch function to add authorization and set headers for JSON requests.
const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");
  // Ensure headers are in a mutable key-value format.
  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options, // Spread existing options to maintain method, body, etc.
    headers: {
      ...headers, // Include any custom headers passed in options.
      Authorization: headers?.authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json", // Set content type to JSON.
      "Apollo-Require-Preflight": "true",
    },
  });
};

// Function to extract and format errors from GraphQL responses.
const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  if (!body) {
    return { message: "Unknown Error", statusCode: "INTERNAL_SERVER_ERROR" };
  }
  if ("errors" in body) {
    const errors = body.errors;
    // Join all error messages into a single string.
    const messages = errors?.map((error) => error?.message)?.join("");
    // Attempt to extract a status code from the first error.
    const code = errors?.[0]?.extensions?.code;

    return {
      message: messages || JSON.stringify(errors), // Use joined messages or stringify errors as fallback.
      statusCode: code || "500", // Default to "500" if no specific code is found.
    };
  }

  return null; // Return null if no errors are present.
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);
  const responseClone = response.clone(); // Clone the response for safe reading.
  const body = await responseClone.json(); // Parse the response body as JSON.
  const error = getGraphQLErrors(body);

  if (error) {
    throw error;
  }

  return response;
};
