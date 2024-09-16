/**
 * @typedef {Object} Links
 * @prop {string} github Your github repository
 */

/**
 * @typedef {Object} MetaConfig
 * @prop {string} title Your website title
 * @prop {string} description Your website description
 * @prop {string} author Maybe your name
 * @prop {string} siteUrl Your website URL
 * @prop {string} lang Your website Language
 * @prop {string} utterances Github repository to store comments
 * @prop {Links} links
 * @prop {string} favicon Favicon Path
 */

/** @type {MetaConfig} */
const metaConfig = {
  title: "simsorry",
  description: `simsorry blog`,
  author: "simjaesung",
  siteUrl: "https://simjaesung.github.io/",
  lang: "en",
  utterances: "simjaesung/simjaesung.github.io",
  links: {
    github: "https://github.com/simjaesung",
  },
  favicon: "src/images/mac-icon.webp",
}

// eslint-disable-next-line no-undef
module.exports = metaConfig
