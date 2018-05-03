export function parseServerErrors(errorMessages) {
  return errorMessages.errors
    .map(({ constraints, property }) => ({
      [property]: Object.values(constraints),
    }))
    .reduce(
      (acc, current) => ({
        ...acc,
        ...current,
      }),
      {}
    )
}
