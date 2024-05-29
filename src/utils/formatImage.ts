import { minidenticon } from "minidenticons";

const generateImage = (seed: string) => encodeURIComponent(minidenticon(seed));

export const formatImage = (options?: { base64?: string; hash?: string }) => {
  if (options) {
    if (options.base64) return `data:image/png;base64,${options.base64}`;
    else if (options.hash)
      return `data:image/svg+xml;utf8,${generateImage(options.hash)}`;
  } else return `data:image/svg+xml;utf8,${generateImage(crypto.randomUUID())}`;
};
