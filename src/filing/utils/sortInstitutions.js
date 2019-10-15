const sortInstitutions = (institutionA, institutionB) => {
  const idA = institutionA.toUpperCase()
  const idB = institutionB.toUpperCase()

  if (idA < idB) {
    return -1
  }
  if (idA > idB) {
    return 1
  }

  return 0
}

export default sortInstitutions
