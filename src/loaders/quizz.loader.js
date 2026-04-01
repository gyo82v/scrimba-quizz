export const quizzLoader = async () => {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
  )

  if (!res.ok) {
    throw new Response("Error fetching quiz data", { status: res.status })
  }

  const data = await res.json()
  return data.results
}