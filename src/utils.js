export function convertStringToJson(inputString) {
  try {
    const result = {};
    if (!inputString || inputString === "") return {};

    // Extracting all vectors
    const allVectorsRegex =
      /Vec\d+: x0=(-?\d+) y0=(-?\d+), x1=(-?\d+) y1=(-?\d+)/g;
    const allVectors = [];
    let match;
    while ((match = allVectorsRegex.exec(inputString)) !== null) {
      allVectors.push({
        x0: parseFloat(match[1]),
        y0: parseFloat(match[2]),
        x1: parseFloat(match[3]),
        y1: parseFloat(match[4]),
      });
    }

    const allTransformedVectorsRegex =
      /Transformed vec\d+: x0=(-?\d+\.\d+) y0=(-?\d+\.\d+), x1=(-?\d+\.\d+) y1=(-?\d+\.\d+)/g;
    const allTransformedVectors = [];
    match = null;
    while ((match = allTransformedVectorsRegex.exec(inputString)) !== null) {
      allTransformedVectors.push({
        x0: parseFloat(match[1]),
        y0: parseFloat(match[2]),
        x1: parseFloat(match[3]),
        y1: parseFloat(match[4]),
      });
    }

    const allIgnoredVectorsRegex = /Vec\d+ was ignored/g;
    match = null;
    while ((match = allIgnoredVectorsRegex.exec(inputString)) !== null) {
      const index = parseFloat(
        match[0].replace("Vec", "").replace(" was ignored", "")
      );
      allVectors[index].ignored = true;
      allTransformedVectors[index].ignored = true;
    }

    // Extracting main vector
    const mainVectorRegex =
      /Main vec: x0=(-?\d+\.\d+) y0=(-?\d+\.\d+), x1=(-?\d+\.\d+) y1=(-?\d+\.\d+)/;
    const mainVector = inputString.match(mainVectorRegex);

    // Extracting pente
    const penteRegex = /Pente of the main vector=(-?\d+\.\d+)/;
    const pente = inputString.match(penteRegex);

    result.allVectors = allVectors;
    result.allTransformedVectors = allTransformedVectors;
    result.mainVector = {
      x0: parseFloat(mainVector[1]),
      y0: parseFloat(mainVector[2]),
      x1: parseFloat(mainVector[3]),
      y1: parseFloat(mainVector[4]),
    };
    result.pente = parseFloat(pente[1]);

    return result;
  } catch (error) {
    console.log("Error: ", error);
    return {};
  }
}
