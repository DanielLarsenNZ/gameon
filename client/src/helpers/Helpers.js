/**
 * Removes content in () from name fields like: Jane Doe (they/them) -> Jane Doe
 * @param {String} first Player's first name
 * @param {Strong} last Player's last name
 */
export const sanitiseName = (first, last) => {
  const removeParens = new RegExp(/\s*\(.*?\)\s*/g);
  return `${first.replace(removeParens, '')} ${last.replace(removeParens, '')}`;
};

/**
 * Creates an avatar URL with the players's initials
 * @param {String} first Player's first name
 * @param {String} last Player's last name
 */
export const initialsAvatarURL = (first, last) =>
  `https://ui-avatars.com/api/?background=ddd&color=999&name=${sanitiseName(first, last)}&format=svg`;
