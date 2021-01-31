/**
 * Method for capitalizing a string
 *
 * @param  {string} string string to be capitalized
 * @return {string} capitalized string
 */
export const capitalize = string => (`${string[0].toUpperCase()}${string.substring(1, string.length).toLowerCase()}`);

// /**
//  * Method for converting string from camel to title case
//  *
//  * @param  {string} string string to be converted
//  * @return {string} converted string
//  */
// export const camelToTitleCase = string => string
//   .replace(/([A-Z])/g, match => ` ${match}`)
//   .replace(/^./, match => match.toUpperCase())
//   .trim();
