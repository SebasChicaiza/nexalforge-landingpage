"use client";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

type JsonLdProps = {
  schema: JsonObject | JsonObject[];
  id?: string;
};

function serializeSchema(schema: JsonLdProps["schema"]): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function JsonLd({ schema, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
    />
  );
}
