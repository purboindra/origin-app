export const fetcher = (...args) =>
  fetch(...args).then(async (res) => {
    if (!res.ok) {
      return await res.json();
    }

    const json = await res.json();

    return json.data;
  });
