export const fetcher = async (url) => {
  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = json;
    error.status = res.status;
    throw error;
  }

  return json;
};
