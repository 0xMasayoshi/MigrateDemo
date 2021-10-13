import { parseUnits } from "@ethersproject/units";

export const parseBalance = (value: string, decimals = 18) => {
  return parseUnits(value || "0", decimals);
};

// try to parse a user entered amount
export function tryParseAmount(
  value?: string,
  decimals?: number
): string | undefined {
  if (!value || !decimals) {
    return undefined;
  }
  try {
    const typedValueParsed = parseUnits(value, decimals).toString();
    if (typedValueParsed !== "0") {
      return typedValueParsed;
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return undefined;
}
