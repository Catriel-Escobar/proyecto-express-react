type ObjectEntrie = { [key: string]: string };

export function cleanObject(objectEntrie: ObjectEntrie) {
  const arrayTransform = Object.entries(objectEntrie);

  return arrayTransform.reduce((acc, [key, value]) => {
    value !== "" ? (acc[key] = value) : acc;
    return acc;
  }, {} as ObjectEntrie);
}
