import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  // パス名のワイルドカードは`props.params.name`で受け取ることができる。
  return <div>Hello {props.params.name}</div>;
}
