const CHARACTER_API = "https://rickandmortyapi.com/graphql";

export const fetchCharacters = async () => {
  const res = await fetch(CHARACTER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        characters(page: 1) {
          results {
            id
            name
            image
          }
        }
      }`,
    }),
  });
  const data = await res.json();
  return data.data.characters.results;
};
