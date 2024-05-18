import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env.local") });

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_ENDPOINT,
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/index.tsx": {
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
