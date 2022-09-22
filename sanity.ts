import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const { PROJECT_ID } = process.env;

const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

export default client;
