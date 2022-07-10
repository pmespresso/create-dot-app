
export const Kintsugi_Squid_Url = "https://api-kusama.interlay.io/graphql/graphql";

async function fetchGraphQL(query: any, variables: any) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(Kintsugi_Squid_Url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
