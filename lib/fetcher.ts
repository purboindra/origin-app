export const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    if (!res.ok) {
      return await res.json();
    }

    const json = await res.json();

    return json.data;
  });
