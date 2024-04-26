import React from "react";
import {
  Column,
  Html,
  Row,
  Tailwind,
  Link,
  Img,
} from "@react-email/components";
import { render } from "@react-email/render";

interface EmailProps {
  items: {
    title: string;
    permalink: string;
    thumb: string;
  }[];
}

function Email(props: EmailProps) {
  return (
    <Html lang="en">
      <Tailwind>
        <Column>
          {props.items.map((item, i) => (
            <Row key={item.permalink} className="flex flex-row space-x-2">
              <Link href={item.permalink}>
                {i + 1}. {item.title}
              </Link>
              <Img src={item.thumb} alt={item.title} height={300} width={300} />
            </Row>
          ))}
        </Column>
      </Tailwind>
    </Html>
  );
}

export const makeNewAnimalsEmail = (props: EmailProps) => {
  return render(<Email {...props} />);
};
