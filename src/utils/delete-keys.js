function deleteKeys(obj, keysToDelete) {
  keysToDelete.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  });
}

module.exports = deleteKeys;
