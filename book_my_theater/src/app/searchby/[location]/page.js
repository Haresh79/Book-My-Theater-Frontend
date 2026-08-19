

import Client from "./client"

export default async function Page({ params }) {
  const resolvedParams = await params
  const location = decodeURIComponent(resolvedParams.location)
  return <Client location={location} />
}
