const Collections = {

  createComparator(fieldName) {
    return (a, b) => {
      let leftValue = a[fieldName];
      let rightValue = b[fieldName];

      if (typeof leftValue === 'string') {
        return leftValue.localeCompare(rightValue);
      } else if (typeof leftValue === 'number') {
        return leftValue - rightValue;
      } else {
        throw new Error("Unsupported types of object's values");
      }
    }
  }

};

export default Collections;
