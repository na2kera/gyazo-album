import { Handlers, PageProps } from "$fresh/server.ts";
import { load } from "https://deno.land/std@0.203.0/dotenv/mod.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    await load({ export: true });
    const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN");
    const resp = await fetch(
      `https://api.gyazo.com/api/images`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    );
    const data = await resp.json();
    return ctx.render(data);
  },
};

export default function Home(props: PageProps<any>) {
  const data = props.data;
  console.log(data);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto">
        <h1 class="text-2xl font-bold mb-4">Gyazo Images</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((image: any) => (
            <div key={image.image_id} class="border rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.metadata?.title || "Gyazo Image"}
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <p class="text-sm text-gray-600">
                  {new Date(image.created_at).toLocaleDateString()}
                </p>
                {image.metadata?.title && (
                  <p class="font-medium mt-1">{image.metadata.title}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
