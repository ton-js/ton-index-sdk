
export function asArray<Type = any>(
  valueOrValues: (Type | Type[])

): Type[] {

  return (Array.isArray(valueOrValues)
    ? valueOrValues
    : [valueOrValues]
  );

}
